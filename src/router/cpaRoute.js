const express = require("express");
const CpaModel = require("../model/cpa");

const router = express.Router();

router.get("/cpa_monitize/", async (req, res) => {
  try {
    const cpa = await CpaModel.findOne({ active: true });
    if (!cpa) {
      throw new Error(
        "Setting Doesn't Exist Please Ask  Your Devlopper to create Your Setting"
      );
    }
    res.send(cpa);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.get("/", (req, res) => {
  res.send("if you se this message then your backend is fire correctly !");
});

function RequireFiled(req, res, next) {
  const requireFiled = ["link", "isPublic", "byClicking", "timePushAds"];
  const bodyArr = Object.keys(req.body);
  if (!bodyArr.every(item => requireFiled.includes(item))) {
    throw new Error("Field not Match");
  }
  next();
}
function loopError(e) {
  const errors = {};
  for (const key in e.errors) {
    const err = e.errors[key].properties.message;
    const path = e.errors[key].properties.path;
    errors[path] = err;
  }
  return errors;
}
//Create User
router.post(
  "/cpa_monitize/add",
  RequireFiled,
  async (req, res) => {
    const userParams = req.body;
    try {
      const cpa = await new CpaModel({ ...userParams, active: true }).save();

      res.send(cpa);
    } catch (e) {
      let errors = loopError(e);
      res.status(404).send(errors);
    }
  },
  (err, req, res, next) => {
    res.status(404).send({ error: err.message });
  }
);
///////////Edit//////

router.put(
  "/cpa_monitize/edit",
  RequireFiled,
  async (req, res) => {
    try {
      const cpaParams = req.body;

      const cpaUpdated = await CpaModel.findOneAndUpdate(
        { active: true },
        cpaParams
      );
      res.send(cpaUpdated);
    } catch (e) {
      let errors = loopError(e);
      res.status(404).send(errors);
    }
  },
  (err, req, res, next) => {
    res.status(404).send({ error: err.message });
  }
);
////Account delete
router.delete(
  "/cpa_monitize/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const cpaDeleted = await CpaModel.findOneAndDelete({ _id: id });
      console.log(cpaDeleted);
      res.send("cpa setting deleted please create One !");
    } catch (e) {
      res.status(404).send(e.message);
    }
  },
  (err, req, res, next) => {
    res.status(404).send({ error: err.message });
  }
);

module.exports = router;
