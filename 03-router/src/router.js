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
  const dynamics = []
  let isDynamic = false
  const dynamicPath = /(:[A-Za-z])\w+/
  const matchNumber = /[0-9]+/
  const router = function(params, fun) {
    if(typeof(params) == 'object'){
      const window = params.window
      const document = window.document
      const history = window.history
      
      if(routes.length <= 0)  return router.error = new Error('no route defined in your router')
      else if((routes.filter(r => (r.path === '/'))).length){
        let default_route = routes.filter(r => (r.path === '/'))
        if(default_route[0].redirect){
          let redirect = routes.find(route => route.path == default_route[0].redirect)
          router.current = redirect
          redirect.function()
        }
        else router.current = '/'
      }

      document.addEventListener("click", evt => {
        evt.preventDefault()
        let targetLink = evt.target.pathname
        if(document.location.hostname == evt.target.hostname && evt.target.download != "download"
        && evt.target.rel != "external" && evt.target.target != "_blank"){
          history.pushState({}, router.current)
          router.current = targetLink
        } 
      })
      
      window.onpopstate = function(event) {
        let route = routes.filter(r => {
          if(document.location.pathname == "/") {
            return "/"
          }
          else if(r.pathParts != "") {
            return new RegExp("/".concat(r.pathParts.join("/"))).exec(document.location.pathname)
          }
        })

        if(route[0] == undefined){
          let current_path = routes.find(route => route.path == "*")
          router.current = current_path.path
          current_path.function()
        }
        else {
          let current_path = route[0].path          
          if(route[0].dynamicPathParts) {
            let ctx = {
              params: {}
            }
            let ids = document.location.pathname.substr(1).split('/').filter(x => matchNumber.exec(x))
            for(let id in ids){
              ctx.params[route[0].dynamicPathParts[id]] = ids[id];
            }
            route[0].function(ctx)
          }
          else{
            route[0].function()
          }
          router.current = current_path
        }
      }
    }
    else {
      let obj = {
        path: params
      }
      if(typeof(fun) == 'string'){
        obj.path = params
        obj.redirect = fun
        routes.push(obj)
      }
      else {
        let dynamicPathParts = []
        let p = params.substr(1)
        if(dynamicPath.exec(params) != null){
          let pathParts = p.split('/').map(x => {
            if(dynamicPath.exec(x) != null) {
              dynamicPathParts.push(x.substr(1))
              return "[0-9]+"
            }
            else return x
          })
          obj.pathParts = pathParts
          obj.dynamicPathParts = dynamicPathParts
          obj.function = fun
          routes.push(obj)
        }
        else{
          let pathParts = p.split('/')
          obj.pathParts = pathParts
          obj.function = fun
          routes.push(obj)
        }
      }      
    }
    return router
  }
  return router  
 }