const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
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

app.listen(3005, () => {
  console.log("포트출력");
});
