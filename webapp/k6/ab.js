// ab同様のシンプルなリクエストを定義
// k6 run --vus 4 --duration 30s ab.js
import http from 'k6/http';

const BASE = 'http://localhost';

export default function () {
  http.get(`${BASE}/`);
};