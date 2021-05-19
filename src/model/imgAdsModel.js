const mongoose = require("mongoose");

const cpaImgSchema = new mongoose.Schema({
  img: { type: Buffer }
});

const imgModel =
  mongoose.models.imgAds || mongoose.model("imgAds", cpaImgSchema);

module.exports = imgModel;
