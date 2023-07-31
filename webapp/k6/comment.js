// ランダムなユーザーの最初の画像にコメントを投稿
// k6 run --vus 1 comment.js
import http from 'k6/http';
import { check } from 'k6';
import { parseHTML } from 'k6/html';
import { url } from './lib/config.js';
import { getAccount } from './lib/accounts.js';

export default function () {
  // アカウントを選択
  const account = getAccount();
  // ログイン
  const login_res = http.post(url('/login'), {
    account_name: account.account_name,
    password: account.password,
  });
  check(login_res, {
    'is status 200': (r) => r.status === 200,
  });
  // ユーザーページをGET
  const res = http.get(url(`/@${account.account_name}`));
  // フォームのinput:hiddenからcsrf_token, post_idを抽出
  const doc = parseHTML(res.body);
  const csrf_token = doc.find('input[name="csrf_token"]').first().attr('value');
  const post_id = doc.find('input[name="post_id"]').first().attr('value');
  // コメントを投稿
  const comment_res = http.post(url('/comment'), {
    post_id,
    csrf_token,
    comment: 'Hello k6!',
  });
  check(comment_res, {
    'is status 200': (r) => r.status === 200,
  });
}
