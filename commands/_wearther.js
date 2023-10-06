//BY DIEGOSON 

//_@AZTEC MD

module.exports = {
  name: 'weather',
  category: 'Search',
  description: 'Get current weather information for a specific location.',
  async xstart(vorterx, m, { xReact, text, args }) {
   
     if (!text) { await xReact('😐');
      vorterx.sendMessage(m.from, {text: 'Please provide a country location. Example: !weather Johannesburg'});
      return;
     }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`;

      const response = await fetch(apiUrl);
      const data = await response.json();
    
      await xReact('⛅');
      if (response.ok) {
      const location = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const longitude = data.coord.lon;
      const latitude = data.coord.lat;
      const country = data.sys.country;

      const flagResponse = await fetch(`https://www.countryflags.io/${country}/flat/64.png`);
      const flagUrl = flagResponse.ok ? flagResponse.url : '';
      const weatherMessage = `⛅Current weather in ${location}, ${country}:\n🌳Description: ${description}\n🌡Temperature: ${temperature}°C\n🌬Humidity: ${humidity}%\n🌪Wind Speed: ${windSpeed} m/s\n🌬Longitude: ${longitude}\n🌬Latitude: ${latitude}`;
      vorterx.sendMessage(m.from, weatherMessage, { file: flagUrl });
      } else {
      vorterx.sendMessage(m.from, 'Failed to retrieve weather information.');
    }
   }
  };
