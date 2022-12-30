const express = require("express");
const { PrismaClient } = require("@prisma/client");
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

router.get("/", async (req, res) => {
  try {
    const tags = await prisma.tag.groupby({
      by: ["content"],
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
router.post("/", async (req, res) => {});

module.exports = router;
