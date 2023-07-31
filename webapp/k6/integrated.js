// 複数のシナリオを組み合わせて一連の負荷試験を定義
// k6 run integrated.js
import initialize from './lib/initialize.js';
import comment from './comment.js';
import postimage from './postimage.js';

export { initialize, comment, postimage };

export const options = {
  scenarios: {
    initialize: {
      executor: 'shared-iterations', // 一定量の実行を複数のVUsで共有
      vus: 1,             // 並列数
      iterations: 1,      // イテレーション回数
      exec: 'initialize',
      maxDuration: '10s',
    },
    comment: {
      executor: 'constant-vus', // 複数のVUsを並列で動かす
      vus: 4,             // 並列数
      duration: '30s',    // 実行時間
      exec: 'comment',
      startTime: '12s',   // 12秒後に実行開始
    },
    postimage: {
      executor: 'constant-vus', // 複数のVUsを並列で動かす
      vus: 2,
      duration: '30s',
      exec: 'postimage',
      startTime: '12s',
    },
  },
};

export default function() {}
