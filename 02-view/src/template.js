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
        for(let child of o.children){
          o.dom_element.appendChild(child.dom_element)
        }
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
  
  const obj = elementMatch(template)
  const update = (data, actual_obj = obj) => {
    let key = Object.keys(data)[0]
    for(let o of actual_obj){
      if(o.variable == key){
        o.text.nodeValue = data[key]
      }
      if(o.children.length > 0) update(data, o.children)
    }
    return obj
  }

  return function createElement(data) {
    const updated = update(data, obj)
    const v = updated[0].dom_element
    return { el: v, update}
  }
}


