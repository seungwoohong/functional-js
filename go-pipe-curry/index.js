const { map, filter, reduce } = require("../lib/fx.js");

const log = console.log;

/**
 * 코드를 값으로 다루어 표현력 높이기
 * 이 말은 풀어 말하면 함수를 값으로 전달한다 말과 비슷하다고 해석된다.

 */
const go = (...args) => reduce((acc, f) => f(acc), args);

go(
  0,
  (n) => n + 1,
  (n) => n + 2,
  log
);

// 만약 익명함수가 아닌 함수 이름으로 인자를 전달한다면 훨씬 표현력이 높아질 것이다.
const add1 = (n) => n + 1;
const add2 = (n) => n + 2;

go(0, add1, add2, log);

/**
 * pipe 함수는 go함수에서 나열된 함수들이 통합하여 반환해주는 함수이다.
 */
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const fn = pipe(add1, add2, log);
fn(0);

/**
 * curry
 * 클로저를 이용한다. 함수를 인자로 받고 인자로 받은 함수를 실행할 함수를 리턴하여 코드 평가 시점을 정할 수 있다.
 */

const curry = (f) => (a, ...rest) =>
  rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest);

const mult = curry((a, b) => a * b);

const mult3 = mult(3);
log("mult");
go(5, mult3, log);
go(3, mult3, log);
go(7, mult3, log);
