import React from 'react';
import { BrowserRouter as Router, Route,Link,Switch } from 'react-router-dom';
import { routers } from './router';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        {routers.map(item => {
          return(
          <Link to={item.path} key={item.code}>{item.name}</Link>
          )
        })}
      </div>
        <Switch>
          {
            routers.map(route=>{
              return(
                <Route path={route.path} component={route.component} key={route.code}/>
              )
            })
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
