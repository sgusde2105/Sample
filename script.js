// APIキーを設定
const API_KEY = "あなたのOpenWeatherMap APIキー";

// IPアドレスベースの位置取得（無料APIを使う）
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(locationData => {
    const { latitude, longitude } = locationData;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=ja&units=metric`;
    
    return fetch(weatherUrl);
  })
  .then(response => response.json())
  .then(weatherData => {
    const weather = weatherData.weather[0].main.toLowerCase(); // 例：clear、rainなど
    const hour = new Date().getHours(); // 現地時間

    if (weather.includes("rain") && hour >= 18) {
      window.location.href = "https://open.spotify.com/playlist/雨の夜用";
    } else if (weather.includes("clear") && hour < 12) {
      window.location.href = "https://music.apple.com/playlist/晴れた朝用";
    } else {
      window.location.href = "https://example.com/default";
    }
  })
  .catch(error => {
    console.error('エラー:', error);
    window.location.href = "https://example.com/error"; // エラー時の飛び先
  });
