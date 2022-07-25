const fs = require("fs");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();
const User = require("../database/users");

router.post("/fetchUserImage/", async (req, res) => {
  const user = await User.findOne({ uid: req.body.uid }).catch((err) => {
    console.log("error in user model", err);
    res.json({ message: "user not found", ok: false }).status(404);
  });

  if (user)
    res
      .json({ imageUrl: user.imageUrl, image: user.image, ok: true })
      .status(200);
  else res.json({ message: "user not found", ok: false }).status(404);
});

module.exports = router;
