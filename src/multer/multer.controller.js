const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const config = require("../config/config");
const resformat = require("../utils/resformat");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

exports.uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Upload error", error: err.message });
    }
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const randomUID = uuidv4();
    const fileExtension = path.extname(req.file.originalname);
    const filename = `${randomUID}${fileExtension}`;
      const outputPath = path.join(__dirname, "..", "..", "uploads", filename);
      console.log(outputPath)

    try {
      const fileUrl = `${config.DOMAIN}/uploads/${filename}`;
      resformat(res,200,'file uploaded successfully',fileUrl)
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error processing image", error: err});
    }
  });
};

exports.deleteImage = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "..", "uploads", imageName);
  try {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("error deleting the image");
      }
      res.status(200).json({ message: "image deleted successfully" });
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};