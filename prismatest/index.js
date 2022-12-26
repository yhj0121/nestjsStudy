const express = require("express");
const app = express();
const { userRouter } = require("./router/userRouter");
const { postRouter } = require("./router/postRouter");
const { tagRouter } = require("./router/tag");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
app.use("/post", postRouter);
app.use("/tag", tagRouter);
app.listen(3005, () => {
  console.log("포트출력");
});
