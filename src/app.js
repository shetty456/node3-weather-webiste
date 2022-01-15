const path = require("path");
const express = require("express");
const hbs = require("hbs");

// import the util files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Sunil Hanamshetty",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Sunil Hanamshetty",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message:
      "There is something out there, lurking in the dark. Please be careful",
    name: "Sunil Hanamshetty",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No input address given",
    });
  }
  // using geocode and forecast to output dynamic data
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastdata) => {
      if (error) {
        res.send({ error });
      } else {
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      }
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page Not Found!",
    name: "Sunil Hanamshetty",
  });
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("App running on port 3000");
});
