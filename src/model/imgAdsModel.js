const mongoose = require("mongoose");

const cpaImgSchema = new mongoose.Schema({
  imgAds: [{ type: Buffer }]
});

const imgModel = mongoose.models.img || mongoose.model("img", cpaImgSchema);

module.exports = imgModel;
