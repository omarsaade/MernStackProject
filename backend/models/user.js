const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", { getters: true });
module.exports = mongoose.model("User", userSchema);

/*
The unique Option is Not a Validator

A common gotcha for beginners is that the unique option for
schemas is not a validator. It's a convenient helper for building
 MongoDB unique indexes. See the FAQ for more information.'

*/
