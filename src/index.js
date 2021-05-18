const express = require("express");
require("./db/mongodB");
const PORT = process.env.PORT;
const bodyParser= require('body-parser')
const app = express();
const cpaRouter = require("./router/cpaRoute");
 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(cpaRouter);

app.listen(PORT, () => {
  console.log(`App Listen in PORT ${PORT}`);
});
// const bcrypt = require("bcryptjs");
// async function bcryptJS() {
//   const hashd = await bcrypt.hash("mahdiSolultana", 8);
//   const comp = await bcrypt.compare(
//     "noxmalix",
//     "$2a$08$F9/ELAd3NW6x1J0TrchmJOcu2bEgCSIrl.Gk8FtReA1WtaYwIjds."
//   );
//   console.log(hashd);
//   console.log(comp);
// }
// bcryptJS();
