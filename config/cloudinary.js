
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "dtlwhwc8x",
  api_key: "927473677757994",
  api_secret: "5zDBmkCZlfZA-QMaJZLUJWyDKug"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'user_avatars', // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png","gif"],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;