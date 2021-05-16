const mongoose = require("mongoose");

const cpaSchema = new mongoose.Schema({
  link: String,
  isPublic: Boolean,
  active: Boolean
});

cpaSchema.methods.GenerateToken = async function () {};

cpaSchema.statics.findCridential = async function (email, password) {};
cpaSchema.pre("save", async function (next) {
  // if (this.isModified("password")) {
  //   this.password = await bcrypt.hash(this.password, 8);
  // }
  next();
});

const CpaModel = mongoose.models.cpa || mongoose.model("cpa", cpaSchema);

module.exports = CpaModel;
