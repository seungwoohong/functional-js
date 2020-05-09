const curry = (f) => (a, ...rest) =>
  rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest);

const map = curry((f, iter) => {
  let iterable = [];

  for (const a of iter) {
    iterable.push(f(a));
  }

  return iterable;
});

const filter = curry((f, iter) => {
  let iterable = [];

  for (const a of iter) {
    f(a) && iterable.push(a);
  }

  return iterable;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

const go = (...args) => reduce((acc, f) => f(acc), args);

const pipe = (...args) => (a) => go(a, ...args);

module.exports = { map, filter, reduce, go, pipe, curry };
