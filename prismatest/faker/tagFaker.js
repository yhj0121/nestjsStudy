const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
const { v4 } = require("uuid");

const contents = ["ootd", "맛집", "뷰", "한강", "해쉬 태그"];

async function inputTags() {
  try {
    let i = 0;
    while (i < 10000) {
      const newTag = await prisma.tag.create({
        data: {
          content: contents[i % 5],
        },
      });
      console.log(newTag);
      i++;
    }
  } catch (err) {
    console.log(err);
  }
}

inputTags();
