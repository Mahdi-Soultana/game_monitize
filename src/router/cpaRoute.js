const express = require("express");
const CpaModel = require("../model/cpa");
const multer = require("multer");
const sharp = require("sharp");
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
  const requireFiled = [
    "link",
    "isPublic",
    "byClicking",
    "timePushAds",
    "showPopUp"
  ];
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
        { ...cpaParams }
      );
      const cpa = await CpaModel.findOne({ active: true });
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
////Account delete
router.delete(
  "/cpa_monitize/:id",
  async (req, res) => {
    try {
      const id = req.params.id;

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

/////////////////
// ImageAds
const avatar = multer({
  limits: {
    fileSize: 100_000_000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error("Please Upload Image JPG or png or jpeg !"));
    }
    cb(undefined, true);
  }
});
router.post(
  "/cpa_monitize/img_ads",
  avatar.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).toBuffer();
    const cpa = await CpaModel.findOne({ active: true });
    cpa.imgAds = buffer;
    await cpa.save();
    res.send("file uploaded");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
// router.delete("/user/me/avatar", async (req, res) => {
//   req.user.avatar = undefined;
//   await req.user.save();

//   res.send("Avatar Deleted");
// });
router.get("/cpa_monitize/img_ads", async (req, res) => {
  try {
    const cpa = await CpaModel.findOne({ active: true });
    if (!cpa || !cpa.imgAds) {
      throw new Error("Avatar not Found !");
    }
    res.set("Content-Type", "image/png");
    res.send(cpa.imgAds);
  } catch (e) {
    res.status(404).send({ error: e.message });
  }
});
router.delete("/cpa_monitize_drop/deleteallCpa", async (req, res) => {
  await CpaModel.deleteMany({ active: true });
  res.send("all colletion for cpa deleted !");
});

module.exports = router;
