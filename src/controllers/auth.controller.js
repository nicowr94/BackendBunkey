import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signup = async (req, res) => {
  const { name, email, password, roles } = req.body;

  //const userFound = User.find({email})

  const newUser = new User({
    name,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const foundRoles = await Role.findOne({ name: "user" });
    newUser.roles = [foundRoles._id];
  }

  const saveUser = await newUser.save();
  console.log("saveUser");
  const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });

  res.status(200).json(token);
};

export const signin = async (req, res) => {
  console.log("comenzamos el singin");
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  console.log(userFound);
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400, //24 horas
  });
  res.status(200).json({ token: token });
};
