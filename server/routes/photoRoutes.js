const express = require("express");
const router = express.Router();

const {
  getPhotos,
  uploadPhoto,
} = require("../controllers/photoController");

const upload = require("../middleware/upload");

// GET /api/photos
router.get("/", getPhotos);

// POST /api/photos
router.post("/", upload.single("photo"), uploadPhoto);

module.exports = router;