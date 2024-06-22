const universityRegister = require("../models/UniversityRegister");
const resformat = require("../utils/resformat");

exports.university_register = async (req, res, next) => {
  try {
    const {  email} = req.body;
    const existingUser = await universityRegister.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registerd" });
    }

    await universityRegister.create(req.body);
    resformat(
      res,
      201,
      "University registration successfully . The admin will soon send you the login details in your registerd email"
    );
  } catch (error) {
    next(error);
  }
};

exports.get_all_register_request = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10
  try {
    const totalRegistered = await universityRegister.countDocuments();
    const totalPages = Math.ceil(totalRegistered / limit);

    const users = await universityRegister.find().skip((page - 1) * limit).limit(limit);
    resformat(res, 200, "OK", users, null, {
      limit,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error)
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await universityRegister.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.status = status;
    await user.save();
    resformat(res, 200, "user status updated", user, null, null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete_register_university = async (req, res, next) => {
  try {
      const id = req.params.id;
      const deleted = await universityRegister.findByIdAndDelete(id);
      
      if (deleted) {
          resformat(res, 200, 'University deleted successfully');
      } else {
          resformat(res, 404, 'University not found');
      }
  } catch (error) {
      if (error.name === 'CastError') {
          return resformat(res, 400, 'Invalid university ID format');
      }
      next(error);
  }
}