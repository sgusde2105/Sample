// 時間帯によってリダイレクトするだけのシンプル版

const hour = new Date().getHours(); // 現在の時間（0〜23）

if (hour >= 6 && hour < 10) {
    // 6時〜10時
    window.location.href = "https://open.spotify.com/playlist/7Ma3BudKw1eVehoTYh5y3F";
} else if (hour >= 16 && hour < 20) {
    // 16時〜20時
    window.location.href = "https://open.spotify.com/playlist/6x19fuTSrOLRj5W6tsjcmj";
} else {
    // それ以外
    window.location.href = "https://open.spotify.com/collection/tracks";
}

