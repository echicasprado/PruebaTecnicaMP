const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sequelize } = require("../config/db");

const register = async (req, res) => {
  try {
    const { email, password, nombre, rol_id } = req.body;

    if (!(email && password && nombre)) {
      return res
        .status(400)
        .send("All input is required (email, password, nombre)");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const [result] = await sequelize.query(
      "EXEC usp_CreateUsuario @nombre = :nombre, @email = :email, @password_hash = :password_hash, @rol_id = :rol_id",
      {
        replacements: {
          nombre: nombre,
          email: email,
          password_hash: encryptedPassword,
          rol_id: rol_id || 2,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    const newUser = await User.findOne({ where: { email } });

    if (!newUser) {
      return res
        .status(500)
        .send("Error creating user: Could not retrieve new user data.");
    }

    const token = jwt.sign(
      { user_id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "PruebaMP",
      {
        expiresIn: "1h",
      }
    );

    res
      .status(201)
      .json({
        user: {
          id: newUser.id,
          email: newUser.email,
          nombre: newUser.nombre,
          token,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
};


const getUsuarios = async (req, res) => {
  try {
    const [results] = await sequelize.query("EXEC usp_GetUsuarios");
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await sequelize.query("EXEC usp_GetUsuarioById @auth/authMiddleware.js = :id", {
      replacements: { id },
    });
    if (results.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user");
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, rol_id } = req.body;

    await sequelize.query(
      "EXEC usp_UpdateUsuario @auth/authMiddleware.js = :id, @nombre = :nombre, @email = :email, @rol_id = :rol_id",
      {
        replacements: { id, nombre, email, rol_id },
      }
    );

    res.status(200).send("User updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await sequelize.query("EXEC usp_DeleteUsuario @auth/authMiddleware.js = :id", {
      replacements: { id },
    });
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  register,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
};
