const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");
const resformat = require("../utils/resformat");

exports.register = async (req, res, next) => {
  try {
    const {
      image,
      first_name,
      last_name,
      email,
      contact,
      gender,
      address,
      password,
      role
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      image,
      first_name,
      last_name,
      email,
      contact,
      gender,
      address,
      role,
      password: hashedPassword,
    });

    resformat(res, 201, "User registered successfully");
  } catch (err) {
    
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    const payload = {
      id: user._id,
      image:user.image,
      name: user.first_name + " " + user.last_name,
      email: user.email,
      contact: user.contact,
      address: user.address,
      role: user.role
    }
    resformat(res, 200, "user login successfull", { payload, token });
  } catch (err) {
    next(err);
  }
};

