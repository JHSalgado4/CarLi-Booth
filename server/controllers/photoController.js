
const {
  uploadImage,
  getAllImages,
  deleteImage,
} = require("../services/cloudinaryService");

const { success, error } = require("../utils/apiResponse");
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

    success(
    res,
    { photo },
    "Photo uploaded successfully!",
    201
);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });

  }
};

exports.deletePhoto = async (req, res) => {
  try {

    const publicId = decodeURIComponent(req.params.publicId);

    const result = await deleteImage(publicId);

    if (result.result !== "ok") {
      return error(res, "Photo not found.", 404);
    }

    res.json({
      success: true,
      message: "Photo deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete photo.",
    });

  }
};
