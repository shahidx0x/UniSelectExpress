const express = require("express");
const authMiddleware = require("../middleware/auth_middleware");
const {
  university_register,
  get_all_register_request,
  delete_register_university,
  updateStatus,
} = require("../controllers/university_register_controller");

const router = express.Router();

router.post("/", university_register);
router.get("/", authMiddleware, get_all_register_request);
router.patch("/:id", authMiddleware, updateStatus);
router.delete("/:id", authMiddleware, delete_register_university);

module.exports = router;
