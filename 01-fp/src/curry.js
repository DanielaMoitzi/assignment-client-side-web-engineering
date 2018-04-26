/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */

export function curry(fn, len = fn.length) {
  function f(i, args) {
    return (...x) => {
      if (i + x.length >= len) {
        return fn(...args, ...x)
      }
      return f(i + x.length, [...args, ...x])
    }
  }
  return f(0, [])
}