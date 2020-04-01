//instantiate express module
const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");
const app = express();
const cors = require("cors");

const port = 5000;
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

const { authenticated } = require("./controllers/auth/midleware");
const user = require("./controllers/auth/auth");
const cek = require("./controllers/user");

app.use(express.static("images"));
app.group("/api/v1", router => {
  // router.post("/auth", login.auth);
  router.post("/login", user.signin);
  router.post("/register", user.signup);
  router.get("/cekuser", authenticated, cek.cekUser);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
