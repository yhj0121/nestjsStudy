const express = require("express");
const api = express.Router();
const database = require("../../../apollo/database.js");

api.get("/", (req, res) => {
  let result = database.teams;
  Object.keys(req.query).forEach((key) => {
    result = result.filter((data) => {
      return data[key] && data[key].toString() === req.query[key].toString();
    });
  });
  res.send(result);
});

api.get("/:id", (req, res) => {
  res.send(
    database.teams.filter((data) => {
      return data.id && data.id.toString() === req.params.id.toString();
    })[0]
  );
});

api.get("/:id/people", (req, res) => {
  let result = database.people.filter((data) => {
    return data.team && data.team.toString() === req.params.id.toString();
  });
  Object.keys(req.query).forEach((key) => {
    result = result.filter((data) => {
      return data[key] && data[key].toString() === req.query[key].toString();
    });
  });
  res.send(result);
});

api.post("/", (req, res) => {
  const data = {
    id: database.teams.length + 1,
  };
  Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key];
  });
  database.teams = [...database.teams, data];
  res.send(data);
});

api.put("/:id", (req, res) => {
  let result = null;
  database.teams
    .filter((data) => {
      return data.id && data.id.toString() === req.params.id.toString();
    })
    .map((data) => {
      Object.keys(data).forEach((key) => {
        delete data[key];
      });
      Object.assign(data, req.body);
      data.id = req.params.id;
      result = data;
    });
  res.send(result);
});

api.delete("/:id", (req, res) => {
  const result = database.teams.filter((data) => {
    return data.id && data.id.toString() === req.params.id.toString();
  });
  database.teams = database.teams.filter((data) => {
    return !data.id || data.id.toString() !== req.params.id.toString();
  });
  res.send(result);
});

module.exports = api;
