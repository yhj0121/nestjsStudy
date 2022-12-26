const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
});

router.get("/user", async (req, res) => {
  try {
    const page = req.query.page;
    const [users, userCount] = await Promise.all([
      prisma.user.findMany({
        take: 12, //페이지 개수
        skip: 12 * (page - 1), //페이지 위치
        orderBy: {
          user_id: "desc", //내림차순
        },
        select: {
          nickname: true,
          email: true,
          user_id: true,
        },
      }),
      prisma.user.count(), //총 유저 갯수
    ]);
    return res.status(200).json({ users, maxCount: Math.ceil(userCount / 12) });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  //유니크 값만 보내기
  const user = await prisma.user.findUnique({
    where: {
      user_id: Number(userId),
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      nickname: true,
    },
  });
  // delete user.password; //객체 안에 있는 속성 삭제

  return res.status(200).json({ user });
});

router.post("/", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        provider: req.body.provider,
        agree: false,
      },
    });
    return res.status(200).json({ newUser });
  } catch (err) {
    return res.status(500).json({ err });
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        user_id: Number(req.body.user_id),
      },
    });
    return res.status(200).json({ deleteUser });
  } catch (err) {
    return res.status(500).json({ messgae: "data error" });
  }
});

//select 문 못씀
//바뀐 개수(count)나옴
router.patch("/", async (req, res) => {
  try {
    const updateMany = prisma.user.updateMany({
      where: {
        provider: "NAVER",
      },
      data: {
        provider: "LOCAL",
      },
    });
    return res.status(200).json({ updateMany });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
//select 사용 가능
router.patch("/id", async (req, res) => {
  const update = await prisma.user.update({
    where: {
      user_id: Number(req.params.id),
    },
    data: {
      ...req.body,
    },
    select: {
      name: true,
      nickname: true,
      provider: true,
    },
  });
});

router.patch("/upsert:id", async (req, res) => {
  try {
    const upsertData = await prisma.upsert({
      where: {
        user_id: Number(req.params.id),
      },
      create: {
        ...req.body,
      },
      select: {
        nickname: true,
        name: true,
        provider: true,
        email: true,
      },
    });
    return res.status(200).json({ upsertData });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = { router };
