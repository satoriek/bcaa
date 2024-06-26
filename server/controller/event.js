const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/events/getAbl");
const ListAbl = require("../abl/events/listAbl");
const CreateAbl = require("../abl/events/createAbl");
const UpdateAbl = require("../abl/events/updateAbl");
const DeleteAbl = require("../abl/events/deleteAbl");
const AssignAbl = require("../abl/events/assignAbl");
const UnassignAbl = require("../abl/events/unassignAbl");

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.post("/assign", (req, res) => {
  AssignAbl(req, res);
});

router.post("/unassign", (req, res) => {
  UnassignAbl(req, res);
});

module.exports = router;
