const API_KEY = "196159874954b852211c889a8e00cd52";

fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(locationData => {
    console.log("位置情報取得成功:", locationData);
    
    const { latitude, longitude } = locationData;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ja&units=metric`;

    return fetch(weatherUrl);
  })
  .then(response => response.json())
  .then(weatherData => {
    console.log("天気情報取得成功:", weatherData);
    
    const weatherId = weatherData.weather[0].id;
    const hour = new Date().getHours();

    console.log("天気ID:", weatherId, "時間:", hour);

    const playlists = {
      rain_morning: "https://open.spotify.com/playlist/0QtiVaZlEkewSrYbKLQTCX",
      rain_night: "https://open.spotify.com/playlist/50kn9XQb3B6Tbn0ErdskBo",
      clear_morning: "https://open.spotify.com/playlist/5eZRF45oQTOTKxc6LlrdCC",
      clear_night: "https://open.spotify.com/playlist/2zQmS4CcnQRlWh6mY5ph23",
      default: "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F"
    };

    let isRain = (weatherId >= 500 && weatherId < 600);
    let isClear = (weatherId === 800);

    if (isRain) {
      if (hour >= 6 && hour < 10) {
        console.log("雨の朝に該当！");
        window.location.href = playlists.rain_morning;
      } else if (hour >= 16 && hour < 20) {
        console.log("雨の夜に該当！");
        window.location.href = playlists.rain_night;
      } else {
        console.log("雨だけど時間外なのでデフォルトへ！");
        window.location.href = playlists.default;
      }
    } else if (isClear) {
      if (hour >= 6 && hour < 10) {
        console.log("晴れの朝に該当！");
        window.location.href = playlists.clear_morning;
      } else if (hour >= 16 && hour < 20) {
        console.log("晴れの夜に該当！");
        window.location.href = playlists.clear_night;
      } else {
        console.log("晴れだけど時間外なのでデフォルトへ！");
        window.location.href = playlists.default;
      }
    } else {
      console.log("天気が雨でも晴れでもないのでデフォルトへ！");
      window.location.href = playlists.default;
    }
  })
  .catch(error => {
    console.error('エラー発生:', error);
    window.location.href = "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F";
  });
