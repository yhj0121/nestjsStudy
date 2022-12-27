const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");
async function inputPost() {
  let i = 0;
  while (i <= 10000) {
    const author_id =
      Math.round(Math.random() * 10014) >= 13
        ? Math.round(Math.random() * 10014)
        : 13;
    console.log(author_id);
    const user = await prisma.user.findUnique({
      where: {
        user_id: author_id,
      },
      select: {
        user_id: true,
      },
    });
    console.log(user);

    //찾는 값이 없으면 null 값 나옴
    const newPost = await prisma.post.create({
      data: {
        content: faker.lorem.paragraph().slice(0, 150),
        thumbnail: faker.image.imageUrl(),
        author_id,
      },
    });
  }
}

inputPost();
