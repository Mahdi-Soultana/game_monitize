const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
async function connect() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}
connect();
