const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

//프리즈마는 include select 둘중 하나 밖에 못 쓴다
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      post_id: "desc",
    },
    take: 12,
    skip: 12 * (Number(req.query.page) - 1),
    // include: {
    //   author: {
    //     select: {
    //       user_id: true,
    //       email: true,
    //       nickname: true,
    //       name: true,
    //     },
    //   },
    // },
    select: {
      post: true,
      content: true,
      thumbnail: true,
      created_at: true,
      author: {
        select: {
          user_id: true,
          nickname: true,
        },
      },
    },
  });
  return res.status(200).json({ posts });
});
router.post("/", async (req, res) => {
  const posts = await prisma.post.create({
    data: {
      ...req.body,
    },
  });
});

router.post("/like", async (req, res) => {
  try {
    const newLike = await prisma.like.create({
      data: {
        author_id: Number(req.body.user_id),
        post_id: Number(req.body.post_id),
      },
      select: {
        author_id: true,
      },
    });
    return res.status(200).json({ newLike });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
//author 필드 추가
router.get("/like:id", async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      where: {
        author_id: Number(req.params.id),
      },

      select: {
        post: {
          include: {
            author: true,
          },
        },
        author: {
          select: {
            nickname: true,
            name: true,
          },
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

module.exports = router;
