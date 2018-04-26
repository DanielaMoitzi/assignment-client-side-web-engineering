/*
 * Implement a monad with the following requirements and features
 *
 * - Create a monad
 * - 1. type constructor: Create a constructor for a monad
 * - 2. unit function: Wrap a value of given type into a monad
 * - 3. bind function: allow chaining of operations on a monadic value
 * - Implement a fake DOM library
 * - Implement style function
 * - Implement fadeOut function
 *
 * Example:
 *
 * const $ = d()
 *  .extend("style", function(style) {…})
 *  .extend("fadeOut", function(style) {…})
 *
 * $({})
 *   .style({ color: "red" })
 *   .fadeOut();
 */
export function d() {
  const wrapper = function (obj = {}) {
    wrapper.value = obj
    return wrapper
  }
  wrapper.extend = function(str, fn) {
    this[str] = function(...args) {
      fn.apply(this, args)
      return this
    }
    return this
  }
  
  return wrapper
}
