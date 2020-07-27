/**
 * dom包装
 */
class ElementWrapper{
  constructor(type){
    this.root = document.createElement(type);
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value);
  }
  mountTo(parent){
    parent.appendChild(this.root);
  }
  appendChild(child){
    child.mountTo(this.root);
  }
}

/**
 * text dom
 */
class TextWrapper{
  constructor(content){
    this.root = document.createTextNode(content);
  }
  mountTo(parent){
    parent.appendChild(this.root)
  }
}
/**
 * 
 * @param {*} type 组件类型：1、自定义组件引用。2、原生dom字符串
 * @param {*} props 传递属性
 * @param  {...any} children 子组件
 * @return 返回值作为参数传入到副父组件到createElement方法中
 */
function createElement(type, props, ...children) {
  console.log(arguments);
  let element;
  if(typeof type ==='string'){
    //原生dom
    element = new ElementWrapper(type);
  }else{
    element = new type;
  }
  /* 添加属性 */
  for (let name in props) {
    element.setAttribute(name, props[name]);
  }
  /* 添加子组件 */
  for (let child of children) {
    //文本节点
    if (typeof child === 'string'){
      child = new TextWrapper(child);
      child.mountTo(element)
    }else{
      element.appendChild(child)
    }
  }
  return element;
}


export function render(vdom,element){
  vdom.mountTo(element)
}

export const ToyReact = {
  createElement,
}
