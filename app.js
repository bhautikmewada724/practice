const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5050;
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverRide = require('method-override');
const ejsMate = require('ejs-mate');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverRide("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log(`Connected To Database`);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  console.log(`Route Is Working`);
});

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listing/index", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listing/new");
});

// Show Route (Read)
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/show", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body);
  console.log(newListing);
  await newListing.save();
  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listing/edit", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true }); // Set new option to true
  console.log(updatedListing);
  res.redirect("/listings");
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
  console.log(deleteListing);
});

app.listen(port, () => {
  console.log(`App Is Listening on ${port}`);
});
