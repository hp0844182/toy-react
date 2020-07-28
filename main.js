
import { ToyReact,render,Component } from './ToyReact';

class MyCompoent extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <span>haha</span>123
        {this.props.children}
        </div>
    )
  }
}
var a = <MyCompoent name="hp" id="first">
    <MyCompoent>1232</MyCompoent>
  </MyCompoent>

render(a,document.body);