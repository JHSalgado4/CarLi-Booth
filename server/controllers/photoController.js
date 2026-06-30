// controllers/photoController.js

exports.getPhotos = (req, res) => {
  res.json({
    success: true,
    message: "Hello from the Photo Controller! 📸",
  });
};

exports.uploadPhoto = (req, res) => {

  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded."
    });
  }

  res.json({
    success: true,
    message: "Image received successfully! 🎉",
    filename: req.file.originalname,
    size: req.file.size
  });

};