import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Recipe,
          as: "recipes",
        },
      ],
      order: [["id", "ASC"]],
    });

    if (!users.length) {
      return res.status(404).json("Users not found");
    }

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

export const updateUserByID = async (req, res) => {
  const { firstName, email, password } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    firstName && (user.firstName = firstName);
    email && (user.email = email);
    password && (user.password = password);

    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};