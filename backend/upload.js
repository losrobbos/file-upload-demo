import multer from 'multer'

// export const upload = multer({ 
//   dest: "./files" 
// })

// custom names on upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });