const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const tags = await prisma.tag.findMany({
    take: 20,
  });
});

router.post("/", async (req, res) => {});

module.exports = router;
