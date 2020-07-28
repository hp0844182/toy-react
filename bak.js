class ElementWrapper {
  constructor(type) {
      this.root = document.createElement(type);
  }
  setAttribute(name, value) {
      if (name.match(/^on([\s\S]+)$/)) {
          let eventName = RegExp.$1.toLocaleLowerCase();
          this.root.addEventListener(eventName, value);
      }
      this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
      const range = document.createRange();
      if (this.root.children.length) {
          range.setStartAfter(this.root.lastChild);
          range.setEndAfter(this.root.lastChild);
      } else {
          range.setStart(this.root, 0);
          range.setEnd(this.root, 0);
      }
      vchild.mountTo(range);
  }
  mountTo(range) {
      range.deleteContents();
      range.insertNode(this.root);
  }
}

class TextWrapper {
  constructor(content) {
      this.root = document.createTextNode(content);
  }
  mountTo(range) {
      range.deleteContents();
      range.insertNode(this.root);
  }
}

export class Component {
  constructor() {
      this.children = [];
      this.props = Object.create(null);
  }
  setAttribute(name, value) {
      this.props[name] = value;
      this[name] = value;
  }
  mountTo(range) {
      this.range = range;
      this.update();
  }
  update() {
      const placeholder = document.createComment("placeholder");
      const range = document.createRange();
      range.setStart(this.range.endContainer, this.range.endOffset);
      range.setEnd(this.range.endContainer, this.range.endOffset);
      range.insertNode(placeholder);

      this.range.deleteContents();
      let vdom = this.render();
      vdom.mountTo(this.range);

      // placeholder.parentNode.removeChild(placeholder);
  }
  appendChild(vchild) {
      this.children.push(vchild);
  }
  setState(state) {
      console.log(state);
      let merge = (oldState, newState) => {
          for (let p in newState) {
              if (typeof newState[p] === "object") {
                  if (typeof oldState[p] !== "object") {
                      oldState[p] = {};
                  }
                  merge(oldState[p], newState[p]);
              } else {
                  oldState[p] = newState[p];
              }
          }
      };
      if (!this.state && state) {
          this.state = {};
      }
      merge(this.state, state);
      console.log("this.state", this.state);
      this.update();
  }
}

export const ToyReact = {
  createElement(type, attr, ...children) {
      let ele;
      if (typeof type === "string") {
          ele = new ElementWrapper(type);
      } else {
          ele = new type();
      }

      for (let name in attr) {
          ele.setAttribute(name, attr[name]);
      }

      let insertChildren = (children) => {
          for (let child of children) {
              if (typeof child === "object" && child instanceof Array) {
                  insertChildren(child);
              } else {
                  if (
                      !(child instanceof Component) &&
                      !(child instanceof ElementWrapper) &&
                      !(child instanceof TextWrapper)
                  ) {
                      console.log(child);
                      child = String(child);
                      console.log(child);
                  }
                  if (typeof child === "string") {
                      child = new TextWrapper(child);
                  }
                  ele.appendChild(child);
              }
          }
      };
      insertChildren(children);

      return ele;
  },
  render(vdom, ele) {
      const range = document.createRange();
      if (ele.children.length) {
          range.setStartAfter(ele.lastChild);
          range.setEndAfter(ele.lastChild);
      } else {
          range.setStart(ele, 0);
          range.setEnd(ele, 0);
      }
      vdom.mountTo(range);
      // ele.appendChild(vdom);
  },
};
