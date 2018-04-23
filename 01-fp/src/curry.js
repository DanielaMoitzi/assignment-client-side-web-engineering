/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */


// export function curry(fn, i = 0, args = []) {
  
//   if(fn.length == 0) return fn
  
//   if(i === fn.length) return fn(...args)

//   return (x) => {
//     args.push(x)
//     return curry(fn, i+1, args)
//   }
// }






export function curry(fn) {
  function f(i, args) {
    return (...x) => {
      if (i + x.length >= fn.length) {
        return fn(...args, ...x)
      }
      return f(i + x.length, [...args, ...x])
    }
  }
  return f(0, []);
}