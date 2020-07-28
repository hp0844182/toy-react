/**
 * dom包装
 */
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
  appendChild(child) {
    this.root.appendChild(child);
  }
}

/**
 * text dom
 */
class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}
export class Component {
  constructor(props = {}) {
    this.props = props;
    this.props.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  mountTo(parent) {
    let vdom = this.render();
    vdom.mountTo(parent);
  }
  // 自定义组件中嵌套对内容通过push到children中，之后在render中处理
  appendChild(child) {
    this.props.children.push(child);
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
  if (typeof type === 'string') {
    //原生dom
    element = new ElementWrapper(type);
  } else {
    element = new type(props || {});
  }
  /* 添加属性 */
  for (let name in props) {
    element.setAttribute(name, props[name]);
  }
  /* 添加子组件 */
  let insertChildren = (ichildren) => {
    for (const child of ichildren) {
      if (child instanceof Array) {
        insertChildren(child)
      } else {
        if (!(child instanceof Component) &&
          !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)
        ) {
          child = String(child)
        }
        if (typeof child === 'string') {
          child = new TextWrapper(child);
        }
        // element.appendChild(child);

        child.mountTo(element);
      }
    }
  }

  insertChildren(children);
  return element;
}


export function render(vdom, element) {
  vdom.mountTo(element)
}

export const ToyReact = {
  createElement,
}
