const jwt = require("jsonwebtoken");
const { security } = require("./midleware");
const User = require("../../models").user;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signup = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const cek = await User.findOne({ where: { user } });
    if (cek) res.send({ msg: "username sudah digunakan" });
    else {
      const dataRegister = {
        user,
        pass: bcrypt.hashSync(pass, saltRounds)
      };

      const data = await User.create(dataRegister);
      const token = jwt.sign({ userId: data.id }, security);
      res.send({
        token: token
      });
    }
  } catch (error) {
    res.status(401).send({
      message: error.message
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { user, pass } = req.body;
    const data = await User.findOne({ where: { user } });
    if (data) {
      const cek = bcrypt.compareSync(pass, data.pass);
      const token = jwt.sign({ userId: data.id }, security);
      if (cek)
        res.send({
          user: data.user,
          token
        });
      else
        res.send({
          passErr: "Password Salah !!"
        });
    } else
      res.send({
        userErr: "Username Tidak Ada !!"
      });
  } catch (error) {
    res.status(401).send({
      message: error.message
    });
  }
};
