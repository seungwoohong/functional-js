const log = console.log;

log("Array -----------");
const arr = [1, 2, 3];
for (const v of arr) log(v);

log("Set -----------");
const set = new Set([1, 2, 3]);
for (const v of set) log(v);

log("Map -----------");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const v of map) log(v);
for (const v of map.keys()) log(v);
for (const v of map.values()) log(v);
for (const v of map.entries()) log(v);

log("Array 0 index");
log(arr[0]); // 1

log("Set 0 index");
log(set[0]); // undefined

log("Map 0 index");
log(map[0]); // undefined

/**
 * arr와 달리 set과 map은 인덱스로 접근 불가능하다. 이유는 배열이 아니기때문이다.
 * for ...of문은 iter 이터러블을 순회한다. 이터러블이란 다음과 같다.
 *
 * 이터러블 - es6에서 나온 [Symbol.iterator]를 가진 값을 말하며, [Symbol.iterator]은 이터러블은 가진 속성으로써 함수이다. 이를 실행하면 이터레이터를 반환한다.
 * 이터레이터 - 이터레이터는 {value, done} 객체를 반환하는 next() 함수를 갖습니다.
 * 이터러블 / 이터레이터 프로토콜 - 이터러블이 for ...of, 전개 연산자 등과 함께 동작하도록 하는 규약을 말합니다.
 * 즉, Array, Set, Map은 이터러블 / 이터레이터 프로토콜을 따른다고 할 수 있다.
 *
 * for ...of문은 이터러블을 받아 [Symbol.iterator]을 호출하여 반환 받은 어터레이터를 가지고 순회한다.
 * map.keys 나 다른 함수들은 호출하면 이터레이터를 반환한다. for ...of문은 이터레이를 받는데 잘 동작하는 이유는 이터레이블이 [Symbol.iterator] 가지고 있기때문이다.
 */

let iterator = arr[Symbol.iterator]();
log(iterator.next()); // { value: 1, done: false }
log(iterator.next()); // { value: 1, done: false }
log(iterator.next()); // { value: 1, done: false }
log(iterator.next()); // { value: 1, done: false }

/**
 * 사용자 정의 이터러블
 */

const iterable = {
  [Symbol.iterator]() {
    let i = 3;

    return {
      next() {
        return i == 0 ? { done: true } : { value: --i, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

/**
 * 주의할 점은 위에서 본거처럼 이터레이터는 순회가 가능하도록 [Symbol.iterator]를 가지고 있어야한다. 그렇기 때문에 자기 자신도 반환해주도록한다.
 */

const it = iterable[Symbol.iterator]();
log(it.next());
log(it.next());
log(it.next());

/**
 * 전개 연산자
 *
 * 전개 연산자 역시 이터러블 / 이터레이터 프로토콜을 따른다. 즉, [Symbol.iterator]를 가지고 있는 값들은 동작이 가능하게 된다.
 */

log([...arr, ...set, ...map.values()]); // [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
