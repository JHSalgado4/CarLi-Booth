const cloudinary = require("../cloudinary");

async function uploadImage(file) {
  const b64 = file.buffer.toString("base64");

  const dataUri = `data:${file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "carli-booth",
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    createdAt: result.created_at,
  };
}

async function getAllImages() {
  const result = await cloudinary.search
    .expression("folder:carli-booth")
    .sort_by("created_at", "desc")
    .max_results(100)
    .execute();

  return result.resources.map((photo) => ({
    url: photo.secure_url,
    publicId: photo.public_id,
    createdAt: photo.created_at,
  }));
}

module.exports = {
  uploadImage,
  getAllImages,
  deleteImage,
};