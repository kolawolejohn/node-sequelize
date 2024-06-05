const router = require("express").Router();
const authorization = require("../middlewares/authorization.middleware");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  uploadPicture,
} = require("../controllers/user.controller");
const updateUserMiddleware = require("../middlewares/updateUser.middleware");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "public", "users"));
  },
  filename: (req, file, callback) => {
    const MIME_MAP = {
      "image/png": "png",
      "image/gif": "gif",
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
    };
    callback(null, `user_profile_${req.user.id}.${MIME_MAP[file.mimetype]}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!mimeTypes.includes(file.mimetype)) {
      callback(null, false);
      req.hasError = true;
      req.errors = { picture: ["invalid file type"] };
      return;
    }

    callback(null, true);
  },
});

router.get("/", authorization, getAllUsers);

router.get("/:id", authorization, getUserById);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post(
  "/:id/picture",
  authorization,
  updateUserMiddleware,
  upload.single("picture"),
  uploadPicture
);

module.exports = router;
