const { JSDOM } = require("jsdom");
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


// provide DOM for tests
const dom = new JSDOM(`<!DOCTYPE html>`);
global.document = dom.window.document;


export function build(template){
  

  const elementMatch = (str) => {
    
    const MATCH_ELEMENT = /<([a-z][a-z0-9]*\b[^>]*)>(.*?)<\/\1>/g;
    const MATCH_VARIABLE = /^\{\{(.+)\}\}$/;
    let element
    let elements = []
    do {
      element = MATCH_ELEMENT.exec(str)
      if(element) {
        let variable = MATCH_VARIABLE.exec(element[2])
        let o = {}
        let tag = element[1]
        o.tag = tag
        o.dom_element = global.document.createElement(tag)      
        o.children = elementMatch(element[2])
        if(variable){
          o.variable = variable[1]
          o.text = global.document.createTextNode("")
          o.dom_element.appendChild(o.text)
        }
        elements.push(o)
      }
    } while (element)

    return elements
  }
  

  const update = (data, actual_obj) => {
    let key = Object.keys(data)[0]
    let obj = actual_obj
    while(actual_obj[0]){
      if(actual_obj[0].variable == key){
        actual_obj[0].text.nodeValue = data[key]
      }
      actual_obj = actual_obj[0].children
    }
    return obj
  }
  
  


  // // let variable = template.toString().match(MATCH_VARIABLE)
  return function createElement(x) {
    const obj = elementMatch(template)
    const updated = update(x, obj)
    const v = updated[0].dom_element
    return { el: v }
  }

  
}
// const tpl = build("<h1><span><small>{{title}}</small></span></h1>")
// const title = "Hello, World!";
// const txt = "blubb blubb blubb"
// tpl({ title })

