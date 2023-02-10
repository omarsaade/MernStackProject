const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
// const corsNode = require("@omarsaade/cors-node");

const app = express();

app.use(bodyParser.json());
// console.log(path.join("uploads", "images")); //uploads\images
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// app.use(corsNode);

app.use((req, res, next) => {
  /* so here we can use the npm cors module library instead of these code below
  Max just wants to provide a view under the hood in such cases, so that
   you know what happens in the background
   if you use such a package (which you might do in practice).
  */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

// Handling Errors for Unsupported Routes
// iza ma zabat shi men el routes li fo2 btfut 3a hayde w btebt3at baada hye la error
app.use((req, res, next) => {
  const error = new HttpError("could not find this routes", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headersSent) {
    return next(error); // ma bi kamell la tahet..
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zktrumw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
