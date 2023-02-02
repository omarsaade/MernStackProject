const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    // check("email").normalizeEmail().isEmail(), cz it remove the "."
    check("email").normalizeEmail({ gmail_remove_dots: false }).isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  // normalizeEmail() Test@test.com => test@test.com
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;

// Read more here: github.com/validatorjs/validator.js#sanitizers
