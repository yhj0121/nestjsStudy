const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tags = await prisma.tag.findMany({
      take: 20,
      orderBy: {
        tag_id: "desc",
      },
    });
    return res.status(200).json({ tags });
  } catch (Err) {
    return res.status(500).json({ Err });
  }
});

//distinit는 데이터 중복 제거
router.get("/dis", async (req, res) => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      tag_id: "desc",
    },
    distinit: ["posts", "content"],
  });
});

//집계함수
router.get("/arg", async (req, res) => {
  const arg = await prisma.tag.aggregate({
    _count: true,
    _avg: {
      posts: true,
    },
    _sum: {
      posts: true,
    },
    _min: {
      post: true,
    },
    _max: {
      posts: true,
    },
  });
  return res.status(200).json({ arg });
});

//그룹을 만듬
//여러 함수 쓸수 있음 distinct랑 다름
router.get("/", async (req, res) => {
  try {
    const tags = await prisma.tag.groupBy({
      by: ["content"], //뭘로 그룹할건지
      _count: {
        _all: true, //aggregate 랑 비슷
      },
      _sum: {
        posts: true, //집계 함수 다 쓸수 있다
      },
      having: {
        //집계함수의 조건문임
        posts: {
          _avg: {
            gt: 45, //이상 함수
          },
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

//자식 컬럼에서 post할떄 사용
router.post("/", async (req, res) => {
  const newPost = await prisma.post.create({
    data: {
      content: faker.lorem.paragraph().slice(0, 255),
      thumbnail: faker.image.imageUrl(),
      author: {
        //가상 컬럼
        connect: {
          //connect는 유니크한 값으로만
          nickname: req.body.nickname,
        },
      },
    },
  });
});

module.exports = router;
