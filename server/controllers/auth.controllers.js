import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const register = (req, res) => {
  const userData = req.body;
  if (Object.keys(userData).length === 0)
    return res.status(400).json({ message: "Bad Request" });
  userData.password = bcrypt.hashSync(userData.password, 8);
  const user = new User(userData);

  user.save((error, user) => {
    if (error) return res.status(500).json({ message: error.message });
    else {
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 86400,
        }
      );

      return res.status(200).json({
        accessToken,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        message: "User Registered successfully",
      });
    }
  });
};

export const login = (req, res) => {
  const userData = req.body;
  if (Object.keys(userData).length === 0)
    return res.status(400).json({ message: "Bad Request" });
  User.findOne({ email: userData.email }).exec((error, user) => {
    if (error) return res.status(500).json({ message: error.message });
    if (!user) return res.status(404).json({ message: "User not found" });
    const passwordIsValid = bcrypt.compareSync(
      userData.password,
      user.password
    );
    if (!passwordIsValid)
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid password" });
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400,
      }
    );

    return res.status(200).json({
      accessToken: token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Login successfully",
    });
  });
};
