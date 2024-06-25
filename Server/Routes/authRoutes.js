var express = require("express");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const loginSchema = require("../Models/loginSchema");
const registerSchema = require("../Models/registerSchema");
const jwt = require("jsonwebtoken");

var authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const login = {
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    };
    const saved = await loginSchema(login).save();

    const reg = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      place: req.body.place,
      loginId: saved._id,
    };
    const saves = await registerSchema(reg).save();

    if (saved && saves) {
      return res.status(201).json({
        success: true,
        error: false,
        message: "register successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "something went wrong",
      errorMessage: error.message,
    });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }
    const checkEmail = await loginSchema.findOne({ email: req.body.email });
    if (!checkEmail) {
      res.status(400).json({
        success: false,
        error: true,
        message: "email doesn't exist,register first",
      });
    }

    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      checkEmail.password
    );
    if (passwordCorrect) {
      const token = jwt.sign(
        {
          userId: checkEmail._id,
          email: checkEmail.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        success: true,
        error: false,
        message: "login success",
        token: token,
        name: checkEmail.name,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: "incorrect password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "something went wrong",
      errorMessage: error.message,
    });
  }
});

module.exports = authRoutes;
