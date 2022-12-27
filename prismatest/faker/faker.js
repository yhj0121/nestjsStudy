const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { v4 } = require("uuid");

async function inputUser() {
  for (let i = 0; i < 10000; i++) {
    const provider =
      Math.round(Math.random() * 3) > 2
        ? "LOCAL"
        : Math.round(Math.random() * 3) > 1
        ? "KAKAO"
        : "NAVER";
    const newUser = await prisma.user.create({
      data: {
        nickname: v4().slice(0, 12),
        email: faker.internet.email().slice(0, 30),
        provider: provider,
        agree: false,
        name: faker.name.fullName().slice(0, 15),
      },
    });
  }
  console.log("끝");
}

inputUser();
