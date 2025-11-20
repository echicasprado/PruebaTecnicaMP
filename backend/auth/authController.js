const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sequelize } = require("../config/db");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = jwt.sign(
        { user_id: user.id, email: user.email },
        process.env.JWT_SECRET || "PruebaMP",
        {
          expiresIn: "1h",
        }
      );

      return res
        .status(200)
        .json({
          user: { id: user.id, email: user.email, nombre: user.nombre, token },
        });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

module.exports = {
  login,
};