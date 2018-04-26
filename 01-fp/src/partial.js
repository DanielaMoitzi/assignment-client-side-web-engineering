/*
 * Implement a partial function. The function should return a variation of
 * the original function that can be invoked partially. Do also implement a
 * placeholder constant that can be used during invocation.
 *
 * - Works with an arbitrary length of arguments
 * - Works with an arbitrary number of placeholder elements!
 * - `partial` is a pure function!
 */
export const _ = undefined;

export function partial(fn, len = fn.length) {
  let arr = new Array(len).fill(_)
  return function f(...args) {
    args.forEach((arg, idx) => {
      for(let index = idx; index < arr.length; index ++ ){
        if(arg && !arr[index]){
          arr[index] = arg
          break
        }
      }
    })
    return !arr.includes(_) ? fn(...arr) : f
  }
}
