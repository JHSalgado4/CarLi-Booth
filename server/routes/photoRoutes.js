const express = require("express");
const router = express.Router();

const {
  getPhotos,
  uploadPhoto,
  deletePhoto,
} = require("../controllers/photoController");

const upload = require("../middleware/upload");

// GET /api/photos
router.get("/", getPhotos);

// POST /api/photos
router.post("/", upload.single("photo"), uploadPhoto);

// DELETE /api/photos/:publicId
router.delete("/:publicId", deletePhoto);

module.exports = router;