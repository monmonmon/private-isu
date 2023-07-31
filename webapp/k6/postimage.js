// ランダムなユーザーとして画像を投稿
// k6 run --vus 1 postimage.js
import http from 'k6/http';
import { parseHTML } from 'k6/html';
import { url } from './lib/config.js';
import { getAccount } from './lib/accounts.js';

const imageFileName = 'images/shbbb.jpg';
const testImage = open(imageFileName, 'b');

export default function () {
  // アカウントを選択
  const account = getAccount();
  // ログイン
  const res = http.post(url('/login'), {
    account_name: account.account_name,
    password: account.password,
  });
  // フォームのinput:hiddenからcsrf_tokenを抽出
  const doc = parseHTML(res.body);
  const csrf_token = doc.find('input[name="csrf_token"]').first().attr('value');
  // 画像を投稿
  http.post(url('/'), {
    file: http.file(testImage, imageFileName, 'image/jpeg'),
    body: 'Posted by k6',
    csrf_token,
  });
}
