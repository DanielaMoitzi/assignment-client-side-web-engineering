import { isPlainObject } from "./utils/is-plain-object";

/**
 * Implement a predictable state container (inspired by Redux):
 *
 * 1. The store should be created by a `createStore` factory (use Crockford's Object creation pattern: https://www.youtube.com/watch?v=PSGEjv3Tqo0)
 * 2. The store object returned should provide `dispatch`, `subscribe` and `getState` methods
 * 3. Reducers must always be functions!
 * 4. Actions must always be plain objects!
 * 5. A store can have more than one subscriber
 * 6. Ensures immutability of listeners is guaranteed during a dispatch cycle
 * 7. Allows nested dispatch
 * 8. Does not leak listeners
 * 9. Does not allow dispatch(), getState(), subscribe(), unsubscribe() from within a reducer
 * 13. Recovers from errors
 * 14. Throws if action type is missin or undefined and not if falsy
 */
export function createStore(reducer, state) {
  if(!(reducer instanceof Function)) throw new Error("reducer must be a function")
  let nextState = state
  let listeners = []
  const dispatch = (action) => {
    if(action.type === undefined) throw "action type is undefined";
    if(!isPlainObject(action)) throw "action needs to be a plain object"
    let current_listeners = []
    listeners.forEach(l => current_listeners.push(l.slice(0)))
    let currentState = getState()
    nextState = reducer(currentState, action)
    current_listeners.forEach(listener => {
      if(listener[1] == true) {
        listener[0].apply(undefined)
      }
    })
  }
  const subscribe = (listener) => {
    listeners.push([listener, true])
    return () => {
      let l = listeners.find(x => listener == x[0])
      l[1] = false
    }
  }
  const getState = () => { return nextState }
  return { dispatch, subscribe, getState }
}
