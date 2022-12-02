const { application } = require("express");
const express = require("express");

const app = express();

const data = {
  id: 1,
  password: 2222,
};
app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.listen(3000);
