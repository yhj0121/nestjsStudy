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

router.post("/", async (req, res) => {});

module.exports = router;
