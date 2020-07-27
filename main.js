
import { ToyReact,render } from './ToyReact';

class MyCompoent {
  render(){
    return (
      <div><span>haha</span></div>
    )
  }
  setAttribute(name,value){
    this[name] = value;
  }
  mountTo(parent){
    let vdom = this.render();
    vdom.mountTo(parent);
  }
}

var a = (
  <MyCompoent name="hp" id="first">
  </MyCompoent>
)

render(a,document.body)