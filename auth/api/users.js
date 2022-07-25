const fs = require("fs");
const bcrypt = require("bcrypt");
const express = require("express");
const uuidv4 = require("uuid");

const router = express.Router();
const User = require("../database/users");
const Image = require("../database/image");
const upload = require("../middlewares/image");
const { uploadImageTos3 } = require("../logicModels/uploadImageToS3");

router.post("/signup/", upload.single("userImage"), async (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const encryptedUserPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedUserPassword,
    imageUrl: url + "/users/user-images/" + req.file.filename,
    image: {
      data: fs.readFileSync("user-images/" + req.file.filename),
      contentType: req.file.mimetype,
    },
  });
  user
    .save()
    .then((result) => {
      res.json({ message: "user saved", ok: true }).status(201);
    })
    .catch((err) => {
      console.log("error ", err);
      res.json({ message: "user not saved", ok: false }).status(400);
    });
});

router.post("/login/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).catch((err) => {
    console.log("error in user model", err);
    res
      .json({ message: "server loading..., try again", ok: false })
      .status(400);
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res
      .json({ message: "user authorised", uid: user._id, ok: true })
      .status(200);
  } else {
    res.json({ message: "wrong password" }).status(403);
  }
});

router.get("/user-images/:image", async (req, res) => {
  const imagePath = `user-images/${req.params.image}`;
  // const image = User.find({ image: imagePath });

  const buffer = fs.createReadStream(imagePath);
  // console.log(req.params.timestamp);
  // res.send(buffer);
  res.json({ buffer });
});

router.get("/signup/", (req, res) => {
  res.send("hi");
});

module.exports = router;
