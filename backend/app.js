const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// Handling Errors for Unsupported Routes
// iza ma zabat shi men el routes li fo2 btfut 3a hayde w btebt3at baada hye la error
app.use((req, res, next) => {
  const error = new HttpError("could not find this routes", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error); // ma bi kamell la tahet..
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

app.listen(5000);
