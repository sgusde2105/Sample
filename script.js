// OpenWeatherMapのAPIキーを設定
const API_KEY = "196159874954b852211c889a8e00cd52";

// 位置情報取得
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(locationData => {
    const { latitude, longitude } = locationData;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ja&units=metric`;
    
    return fetch(weatherUrl);
  })
  .then(response => response.json())
  .then(weatherData => {
    const weather = weatherData.weather[0].main.toLowerCase(); // 天気（例：clear、rain）
    const hour = new Date().getHours(); // 現在の時間

    // プレイリストURLをここに設定
    const playlists = {
      rain_morning: "https://open.spotify.com/playlist/0QtiVaZlEkewSrYbKLQTCX",
      rain_night: "https://open.spotify.com/playlist/50kn9XQb3B6Tbn0ErdskBo",
      clear_morning: "https://open.spotify.com/playlist/5eZRF45oQTOTKxc6LlrdCC",
      clear_night: "https://open.spotify.com/playlist/2zQmS4CcnQRlWh6mY5ph23",
      default: "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F"
    };

    // 条件分岐
    if (weather.includes("rain")) {
      if (hour >= 6 && hour < 12) {
        window.location.href = playlists.rain_morning;
      } else if (hour >= 17 && hour < 23) {
        window.location.href = playlists.rain_night;
      } else {
        window.location.href = playlists.default;
      }
    } else if (weather.includes("clear")) {
      if (hour >= 6 && hour < 12) {
        window.location.href = playlists.clear_morning;
      } else if (hour >= 17 && hour < 23) {
        window.location.href = playlists.clear_night;
      } else {
        window.location.href = playlists.default;
      }
    } else {
      window.location.href = playlists.default;
    }
  })
  .catch(error => {
    console.error('エラー:', error);
    window.location.href = "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F"; // エラー時もデフォルトへ
  });

