const User = require("../models").user;

exports.cekUser = async (req, res) => {
  try {
    const data = await User.findOne({
      where: { id: req.user.userId },
      attributes: ["user"]
    });
    res.send({
      data
    });
  } catch (error) {
    res.status(401).send({
      data: error.message
    });
  }
};
