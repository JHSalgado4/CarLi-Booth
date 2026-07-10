
const {
  uploadImage,
  getAllImages,
} = require("../services/cloudinaryService");
// controllers/photoController.js

exports.getPhotos = async (req, res) => {
  try {

    const photos = await getAllImages();

    res.json({
      success: true,
      photos,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch photos.",
    });

  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No photo uploaded.",
      });
    }

    const photo = await uploadImage(req.file);

    res.status(201).json({
      success: true,
      message: "Photo uploaded successfully!",
      photo,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });

  }
};
