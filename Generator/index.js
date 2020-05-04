const log = console.log;

/**
 * 제너레이터: 이터레이터이자 이터러블을 생성하는 함수, 이터레이터를 반환한다.
 * yield라는 키워드를 통해 next가 반환하는 done이 true가 될 때까지의 시점을 정할 수 있다.
 * 제너레이터 함수가 return문을 통해 반환하는 것은 done이 true가 될때 반환하는 value가 된다.
 * 제너레이터는 어떠한 로직이나 조건으로 인해 나오는 값도 이터레이터로 만들 수 있다.
 */

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  if (false) yield 4;
  return 100;
}

const iter = gen();

log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 1, done: false }
log(iter.next()); // { value: 100, done: true }
log(iter[Symbol.iterator]);

/**
 * example - odds
 */
function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (l === a) return;
  }
}

function* infinity(i = 0) {
  while (true) yield i++;
}

const iter2 = odds(10);
log(iter2.next()); // { value: 1, done: false }
log(iter2.next()); // { value: 3, done: false }
log(iter2.next()); // { value: 5, done: false }
log(iter2.next()); // { value: 7, done: false }
log(iter2.next()); // { value: 9, done: false }
log(iter2.next()); // { value: undefined, done: true }

/**
 * 전개 연산자, 구조 분해, 나머지 연산자
 */
log(...odds(10), ...odds(20));
const [firstOdd, ...rest] = odds(10);
log(firstOdd, rest);
