import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "Email already exists" });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const doc = new User({
            name: name,
            email: email,
            password: hashedPassword,
            tc: tc,
          });
          await doc.save();
        } catch (error) {
          res.send({ status: "failed", message: "unable to register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "password and password_confirmation do not match",
        });
      }
    } else {
      res.send({ status: "failed", message: "Please fill all the fields" });
    }
  }
};
