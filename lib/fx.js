module.exports = {
  map(f, iter) {
    let iterable = [];

    for (const a of iter) {
      iterable.push(f(a));
    }

    return iterable;
  },
  filter(f, iter) {
    let iterable = [];

    for (const a of iter) {
      f(a) && iterable.push(a);
    }

    return iterable;
  },
  reduce(f, acc, iter) {
    if (!iter) {
      iter = acc[Symbol.iterator]();
      acc = iter.next().value;
    }

    for (const a of iter) {
      acc = f(acc, a);
    }

    return acc;
  },
};
