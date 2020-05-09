const { range, L } = require("../lib/fx");

const log = console.log;

/**
 * limit값을 받아 limit만큼만 순회하도록 하는 함수
 */
const take = (l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
};

/**
 * 여기서도 L.range의 효율성을 볼 수 있는데, 아래 코드를 보면
 * L.range는 순회 하기전까지 배열을 만들지 않는다. 5번을 순회하며 값을 반환할 뿐이다.
 * range는 length가 10000인 배열을 만들고 나서 5번 순회를 한다.
 */
log(take(5, L.range(10000)));
log(take(5, range(10000)));
