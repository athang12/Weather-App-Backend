// backend/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3001;
// const apiKey = "cc525bd1fbd2601be9e383269a19f61e";
// const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

app.use(express.json());
app.use(cors());

app.post("/getWeather", async (req, res) => {
    try {
    let datas = [];
    const { cities } = req.body;
    // console.log(cities);
    if (!cities || !Array.isArray(cities)) {
      return res
        .status(400)
        .json({ error: "Invalid input. Please provide an array of cities." });
    }

    const fetchDataForCity = async (city) => {
      const apiKey = "cc525bd1fbd2601be9e383269a19f61e";
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    
      try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data.list[0].main;
        // console.log(weatherData)
        const icon = response.data.list[0].weather[0].icon;
      const url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        return { city : city, data : weatherData,img : url, desc : response.data.list[0].weather[0].description};
      } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return { city: city, data: null ,img : null,desc : null}; // Handle the error as needed
      }
    };
    const fetchDataForAllCities = async () => {
      const promises = cities.map(fetchDataForCity);
    
      try {
        const results = await Promise.all(promises);
        console.log(results);
        res.json(results);
      } catch (error) {
        console.error('Error fetching data for cities:', error.message);
      }
    };
    fetchDataForAllCities();
    //  cities.map( async (city) => {
      
    //   const apiKey = "cc525bd1fbd2601be9e383269a19f61e";
    //   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    //   https.get(apiUrl, (resp) => {
    //     resp.on("data", async(data) => {
    //       wd = await JSON.parse(data);
    //       //   console.log(weatherdata.list[0].main);
    //       // const { temp, temp_min } = wd.list[0].main;
    //       //   console.log(temp,temp_min)
    //       console.log(wd.list[0].main);
    //       datas.push({ city: city,temp : wd.list[0].main.temp });
    //     });
    //   });
     
    //   // console.log(city,weatherData)
    //   // return { [city]: weatherData };
    // });
    // console.log(weatherData)


    // setTimeout(()=>{
    //     console.log(datas);
    //     res.json({ weather: datas });
    // },3000)
    // console.log(datas);

  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// async function fetchWeatherDataForCities(cities) {
//   const weatherPromises = cities.map(async (city) => {
//     // console.log("waiting")
//     await fetchWeatherData(city);
//     // console.log(city,weatherData);
//     // data.push({city: weatherData});
//     // console.log("Done")
//     // console.log(city,weatherData)
//     // return { [city]: weatherData };
//   });

//   return await Promise.all(weatherPromises);
// }

// async function fetchWeatherData(city) {
//   // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap or any other weather API.
//   const apiKey = "cc525bd1fbd2601be9e383269a19f61e";
//   const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
//   //   console.log("waiting....");
//   //   const response = await axios.get(apiUrl);
//   let wd;
//   let t;
//   https.get(apiUrl, (resp) => {
//     resp.on("data", (data) => {
//       wd = JSON.parse(data);
//       //   console.log(weatherdata.list[0].main);
//       const { temp, temp_min } = wd.list[0].main;
//       //   console.log(temp,temp_min)
//       data.push({ city: temp });
//     });
//   });

//   //   console.log(response)
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
