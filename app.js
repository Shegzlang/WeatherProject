// jshint esversion:6 - also add to json - "type": "commonjs",

// must be at the top
require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// al
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees celsius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();

      console.log(weatherDesc);
    });
  });
  
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// res.send("server is up and running."); one res/app method but multiple res.write
//  File(__dirname + "/index.html");

// const object = {
//         name: "Segun",
//         favoriteFood: "cocaine"
//       }
//       console.log(JSON.stringify(object));
