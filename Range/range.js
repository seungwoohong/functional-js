const { reduce } = require("../lib/fx");

const log = console.log;

const add = (a, b) => a + b;

const range = (l) => {
  let res = [];
  let i = -1;

  while (++i < l) {
    res.push(i);
  }

  return res;
};

const list = range(5);
log(list);
log(reduce(add, list));

/**
 * 느긋한 L.range
 */

const L = {};

L.range = function* (l) {
  let i = -1;

  while (++i < l) {
    yield i;
  }
};

const list2 = L.range(5);
log(list2); // Object [Generator] {} :: 아직 배열을 생성하지 않음 함수가 실행되지 않고 순회할 때 실행된다. 떠러서 while문 안에 log도 호출이 안된다.
// log(reduce(add, list2));

/**
 * L.range와 range는 차이가 있다.
 * 1. L.range는 실행이 됐을 때 코드가 바로 평가 되지않는다. 반면 range는 바로 배열이 만들어져 변수에 할당이 된다.
 * 2. 이터레이터 프로토콜 따르는 문법들은 실행 전 값을 Symbol.iterator를 이용해 이터레이터를 만드는데 L.range는 이미 이터레이터를 반환하기때문에 이 과정이 없다.
 */

/**
 * 성능 체크
 */

function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test("range", 10, () => reduce(add, range(1000000))); // range: 413.755ms
test("L.range", 10, () => reduce(add, L.range(1000000))); // L.range: 268.208ms
