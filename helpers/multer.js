import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace()}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage }).single("profileImage");
