const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
/*
 // toObject bt7awel le json la javascript object la ysir est3mela ashal lama nreda
  // getters: true , tell mongoose to add an ID Property to the created object
  res.json({ place: place.toObject({ getters: true }) });

Instead of needing to map transform ObjectId to string, in each res.json
 
Add this line to your model file before exports to receive id as string as a default.
 
placeSchema.set('toJSON', { getters: true });
 
Now you can just respond to your api requests with res.json({ places }) and get the same response as res.json({ place: place.toObject({ getters: true })...
 

best practice hye tahet degre
*/
placeSchema.set("toJSON", { getters: true });
module.exports = mongoose.model("Place", placeSchema);
