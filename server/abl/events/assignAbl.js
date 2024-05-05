const Ajv = require("ajv");
const ajv = new Ajv();
const eventDao = require("../../dao/event-dao.js");

const schema = {
  type: "object",
  properties: {
    eventId: { type: "string" },
    userId: { type: "string" },
  },
  required: ["eventId", "userId"],
  additionalProperties: false,
};

async function AssignAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    eventDao.assign(reqParams.eventId, reqParams.userId);
    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = AssignAbl;