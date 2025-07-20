// jshint esversion:6 - also add to json - "type": "commonjs",

const express = require("express");
const https = require("https");

const app = express();

// al
app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=Lagos&appid=a832a682a278bc25825e17be65ccaaa4&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDesc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + weatherDesc + "</p>");
      res.write("<h1>The temperature in Lagos is " + temp + " degrees celsius</h1>");
      res.write("<img src=" + imageURL +">");
      res.send();
      
      console.log(weatherDesc);
    });
  });

   // res.send("server is up and running."); one res/app method but multiple res.write
   //  File(__dirname + "/index.html");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});


// const object = {
//         name: "Segun",
//         favoriteFood: "cocaine"
//       }
//       console.log(JSON.stringify(object));