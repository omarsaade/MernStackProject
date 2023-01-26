const express = require("express");

// const {Router} = require("express"); instead of .Router()

const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.post(
  "/",
  // multiple middleware fn inside the array
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

// like update
router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
