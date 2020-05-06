const log = console.log;
const products = [
  { name: "a", price: 1000 },
  { name: "b", price: 2000 },
  { name: "c", price: 3000 },
  { name: "d", price: 4000 },
];

const string = "Hello world";
const arr = [1, 2, 3, 4];
const m = new Map();

m.set("a", 10);
m.set("b", 20);
m.set("c", 30);

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

/**
 * map - 이터러블 프로토콜을 따르는 함수, 따라서 다형성이 높다. Array 생성자로 생성된 값이 아닌 값들도 그 값이 이터러블 하다면 사용 가능하다.
 */
const map = (f, iter) => {
  let iterable = [];

  for (const a of iter) {
    iterable.push(f(a));
  }

  return iterable;
};

log(map((p) => p.name, products));
log(map((s) => s + 1, string));
log(map((n) => n * n, arr));
log(map((n) => n + 1, gen()));
log(new Map(map(([k, a]) => [k, a * 2], m)));

/**
 * filter
 */
const filter = (f, iter) => {
  let iterable = [];

  for (const a of iter) {
    f(a) && iterable.push(a);
  }

  return iterable;
};

log(filter((i) => i.price > 2000, products));
log(filter((i) => i.price <= 2000, products));

/**
 * reduce - 이터러블을 순회하면서 값을 누적시키는 함수
 */

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
};

log(reduce((a, b) => a + b, 0, [1, 2, 3, 4, 5]));
log(reduce((total, product) => total + product.price, 0, products));

/**
 * 함수형 프로그래밍은 순수함수를 중첩하여 사용하며 프로그래밍한다.
 */

/**
 * example
 */

const add = (a, b) => a + b;

log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 2000, products)
    )
  )
);
