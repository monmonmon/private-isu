// アカウントリストをSharedArrayとして用意しランダムに取得出来るようにする
import { SharedArray } from 'k6/data';

const accounts = new SharedArray('accounts', function () {
  return JSON.parse(open('./accounts.json'));
});

// SharedArrayからアカウント情報をランダムに1件取り出して返却
export function getAccount() {
  return accounts[Math.floor(Math.random() * accounts.length)];
}
