import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// configure cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/track", (req, res) => {
  res.send("Tracking...");

  let watchId;
  const duration = 60000 * 10;
  function startWatching() {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Send the location data to your server or desired endpoint
          sendLocationToServer(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true, // Optional, request high accuracy
          timeout: 5000, // Optional, timeout for retrieving location
          maximumAge: 0, // Optional, don't use cached location
        }
      );

      // Stop watching after the specified duration
      setTimeout(stopWatching, duration);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  startWatching();

  function stopWatching() {
    if (watchId !== undefined) {
      navigator.geolocation.clearWatch(watchId);
      console.log("Stopped watching position.");
    }
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
