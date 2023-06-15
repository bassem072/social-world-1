import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[0]);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET,
      function (err, decode) {
        if (err) {
          return res.status(403).send({
            message: "Invalid JWT token",
          });
        }
        User.findOne({ _id: decode.id }).exec((err, user) => {
          if (err) return res.status(500).json({ message: err.message });
          else {
            req.user = user;
            next();
          }
        });
      }
    );
  } else {
    return res.status(403).send({
      message: "Invalid JWT token 1",
    });
  }
};
