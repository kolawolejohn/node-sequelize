const { UserModel } = require("../database/db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);
  let user = await UserModel.findByPk(id);
  if (!user) {
    res.status(404).send("User not found");
  }
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const userData = req.body;
  const salt = await bcrypt.genSalt(12);
  userData.password = await bcrypt.hash(req.body.password, salt);
  const user = await UserModel.create(userData);
  const jsonData = user.toJSON();
  delete jsonData.password;
  res.status(201).json(jsonData);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  let user = await UserModel.findByPk(id);
  if (!user) {
    res.status(404).send("User not found");
  }
  user.email = req.body.email;
  user.password = req.body.password;
  user.save();
  res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  let user = await UserModel.findByPk(id);
  if (!user) {
    res.status(404).send("User not found");
  }
  await user.destroy();
  res.status(204).send("User Deleted successfully");
};

const uploadPicture = async (req, res) => {
  if (req.hasError) {
    res.status(400).json(req.errors);
    return;
  }

  const user = req.user;
  user.picture_url = `/public/users/${req.file.filename}`;
  await user.save();
  res.send("ok");
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadPicture,
};
