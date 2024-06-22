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

exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    console.log(req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    resformat(res, 200, "user role updated", user, null, null);
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
