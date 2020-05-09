const { map, curry, reduce } = require("../lib/fx");

const products = [
  { name: "반팔티", price: 10000, quantity: 1 },
  { name: "긴팔티", price: 15000, quantity: 2 },
  { name: "후드티", price: 20000, quantity: 3 },
  { name: "셔츠", price: 30000, quantity: 4 },
  { name: "바지", price: 25000, quantity: 5 },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);
const total_price = sum((p) => p.price * p.quantity);

log(total_quantity(products));
log(total_price(products));
