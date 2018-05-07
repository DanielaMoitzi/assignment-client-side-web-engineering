/**
 * Implement a view engine:
 *
 * - Parse HTML string
 * - Create according elements: node, text, variable
 * - Implement update function
 *
 * API:
 *
 * const template = build('<h1>{{title}}</h1>');
 * const {el, update} = template({title: 'Hello, World!'});
 * el.outerHTML // <h1>Hello, World!</h1>
 * update({title: 'Hallo Welt!'});
 * el.outerHTML // <h1>Hallo, Welt!</h1>
 */

const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;

function build(template){
  

  elementMatch = (str) => {
   //console.log("str:")
    //console.log(str)
    
    const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
    let element
    let arr = []
    do {
      element = MATCH_ELEMENT.exec(str)
      
      // console.log("element", element[2])
      if(element) {
        let o = {}
        let tag = element[1]
        // console.log("element: ")
        // console.log(element)
        o.dom_element = tag;
        // console.log("--------------")
        // console.log("tag: ")
        // console.log(tag)
        // console.log(element[2])
        
        o.children = elementMatch(element[2])
        arr.push(o)
      }
      console.log("--------------------------------------------------")
      console.log(arr[0])
      // console.log("children:")
      // console.log(arr[0].children)

      
    } while (element)
    return arr
  }
  const obj = elementMatch(template)
  
  


  // // let variable = template.toString().match(MATCH_VARIABLE)
  // return function createElement(x) {
  //   console.log(x)
  //   let element = {
  //     title: "danilo"
  //   }
  //   console.log("element: ")
  //   console.log(element)
  //   return { element }
  // }
}

build("<h1><h2><small>{{title}}</small></h2></h1>")
