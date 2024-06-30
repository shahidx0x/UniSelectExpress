const express = require("express");
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middleware/auth_middleware");

const router = express.Router();

router.get("/", authMiddleware, userController.getUsers);
router.get("/:id", authMiddleware, userController.getSingleUser);
router.patch("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
