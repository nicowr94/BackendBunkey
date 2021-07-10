import User from "../models/User";
import Role from "../models/Role";

//Esta opcion se puede desbloquear para que cualquier persona se registre al sistema si es necesario, actualmente solo un admin puede usar este EndPoint
export const createUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password: await User.encryptPassword(password),
    });

    //Validar si el role ingresado es correcto
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const foundRoles = await Role.findOne({ name: "user" });
      newUser.roles = [foundRoles._id];
    }

    const userSaved = await newUser.save();
    res.status(200).json({ message: "creating user " + userSaved.name });
  } catch (error) {
    return res.status(401).json({ message: "Incomplete data" });
  }
};

//Obtener usuarios, endpoint solo para admin
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(201).json(users);
};
