const express = require("express");
const { uploadFile, deleteImage } = require("./multer.controller");
const multer_router = express.Router();


multer_router.post("/", uploadFile);
multer_router.delete("/remove/:imageName", deleteImage);

module.exports = multer_router;