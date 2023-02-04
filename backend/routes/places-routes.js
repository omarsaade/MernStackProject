const express = require("express");

// const {Router} = require("express"); instead of .Router()
// const router = Router();

const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);
//                       middleware function
router.get("/user/:uid", placesControllers.getPlacesByUserId);

//protects
/*
We then make sure that we also validate and verify this token so that we can protect certain routes
with a middleware here against Unauthenticated Access, we check whether we do have a token and if it's
a valid token, and then we can extract data from the token and attach this to our requests.
*/
router.use(checkAuth);

// Protect these three routes by // router.use(checkAuth);
router.post(
  "/",
  fileUpload.single("image"),
  // multiple middleware fn inside the array
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

// like update
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
