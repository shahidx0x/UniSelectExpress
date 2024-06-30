const User = require("../models/User");
const resformat = require("../utils/resformat");

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    resformat(res, 200, "OK", users, null, {
      limit,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user) {
      resformat(res, 200, "OK", user, null, {});
    } else {
      resformat(res, 404, "User not found with this id");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const {
      image,
      first_name,
      last_name,
      email,
      contact,
      gender,
      address,
      role,
    } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role) user.role = role;
    if (image) user.image = image;
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (gender) user.gender = gender;
    if (address) user.address = address;

    await user.save();
    resformat(res, 200, "User updated", user, null, null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
