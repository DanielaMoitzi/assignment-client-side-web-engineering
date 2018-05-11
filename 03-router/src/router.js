/**
 * Implement a dependency free global router for web browsers
 *
 * - It should allow static paths
 * - It should invoke function for "/" if defined on start
 * - It should have WILDCARD support * for catch all route
 * - It should never fail (provide error fallback)
 * - It should allow static redirects
 *
 * API:
 *
 * Static:
 * - page('/', index)
 *
 * Dynamic:
 * - page('/user/:user', show)
 * - page('/user/:user/edit', edit)
 * - page('/user/:user/album', album)
 * - page('/user/:user/album/sort', sort)
 *
 * Redirects:
 * - page('/home', index)
 * - page('/', '/home')
 *
 * Catch all:
 * - page('*', notfound)
 *
 * Start:
 * - page()
 */


 export function createRouter() {
  const routes = []
  let route;
  const router = function(params, fun) {
    if(typeof(params) == 'object'){
      const window = params.window
      const document = window.document
      const history = window.history
      const currentPage = window.location.pathname
      router.current = route

      window.onpopstate = function(event) {
        // console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
        // console.log("pathname: " + document.location.pathname)
        router.current = document.location.pathname
      }
      
      
      
    

      // window PopStateEvent
      // document click
    }
    else {
      route = params
      routes.push(route)
      fun()
      
      // console.log("here: " + router.current)
      
    }

    
    
    // console.log(router.current)
    router.error = Error('no route defined in your router');

    
    return router
    


    
    
    
  }

  return router

  
 }
