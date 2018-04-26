/*
 * Implement a pure function "pow". The function should behave the same as
 * Math.pow(n, n) -> Math.pow(2, 2) = 4 but should not use Math.pow(…). Find an
 * elegant and pure functional solution to the problem w/o any side-effects.
 *
 * - Works with positive integers ℤ+!
 * - Throws an error if exponent is invalid
 */
export function pow(x, y) {
  let arr = new Array(y).fill(x)
  return arr.reduce((product, factor) => product * factor); 
}

/*
 * Implement a sortBy function that is capable of sorting any field within the
 * set "data.json".
 *
 * - Provides a primer for complex fields
 * - Throws an error if arguments are invalid
 */

export function sortBy(attr, primer) {
  return function(a,b) {
    let y, z
    if(primer){
      y = primer(a[attr])
      z = primer(b[attr])
    }
    else {
      y = a[attr]
      z = b[attr]
    }
    if(y < z) return -1
    else if(y > z) return 1
    return 0
  }
}
