const multer = require('multer')
//CONFIGURATION OF MULTER
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/products");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `products-${file.fieldname}-${Date.now()}.${ext}`);
    },
  });
  
  //MULTER FILTER
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "jpg" || "jpeg" || "png" || "webp") {
      cb(null, true);
    } else {
      cb(new Error("File format not supported"), false);
    }
  };
  
  //CALLING THE MULTER FUNCTION
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  exports.uploadProductImages = upload.array("images", 4);