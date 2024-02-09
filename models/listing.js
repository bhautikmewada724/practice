const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    set: (value) =>
      value === ""
        ? "https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : value,
    default:
      "https://unsplash.com/photos/a-rock-on-the-beach-with-a-mossy-log-on-it-Cv7XG4SpEMQ",
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
