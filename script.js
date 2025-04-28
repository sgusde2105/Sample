// 現在の時間を取得
const hour = new Date().getHours();

// プレイリストURLをここに設定
const playlists = {
  morning: "https://open.spotify.com/playlist/5eZRF45oQTOTKxc6LlrdCC", // 朝6〜10時
  evening: "https://open.spotify.com/playlist/2zQmS4CcnQRlWh6mY5ph23", // 夕方16〜18時
  night: "ttps://open.spotify.com/playlist/0rwum0FuoiCw54BVeHdJdO",   // 夜18〜20時
  default: "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F"   // それ以外
};

// 条件分岐してリダイレクト
if (hour >= 6 && hour < 12) {
  window.location.href = playlists.morning;
} else if (hour >= 16 && hour < 19) {
  window.location.href = playlists.evening;
} else if (hour >= 19 && hour < 23) {
  window.location.href = playlists.night;
} else {
  window.location.href = playlists.default;
}
