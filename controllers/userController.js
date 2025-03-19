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
          const saved_user = await User.findOne({ email: email });
          //Generate JWT token
          const token = jwt.sign(
            { userID: saved_user._id },
            process.env.JWT_SECERT_KEY,
            { expiresIn: "5d" }
          );
          res.status(201).send({
            status: "success",
            message: "User registered successfully",
            token: token,
          });
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

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user !== null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          //Generate JWT token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECERT_KEY,
            { expiresIn: "5d" }
          );
          res.send({
            status: "success",
            message: "Login Successful",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            message: "Email or password is incorrect",
          });
        }
      } else {
        res.send({ status: "failed", message: "you are not registered user" });
      }
    } else {
      res.send({ status: "failed", message: "Please fill all the fields" });
    }
  } catch (error) {
    res.send({ status: "failed", message: "unable to login" });
  }
};
