import React from 'react';
import Landing from './Components/Landing';
import './App.css';
import store from './other/store';
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router }  from 'react-router-dom';
import Auth from './Components/Auth';



function App() {
  return (
    <Provider store={store}>
     <Router>
     <div className="App">
      <Route exact path='/' component={Auth}/>
      <Route  path='/analyze' component={Landing}/>
      </div>
     </Router>
    </Provider>
    
  );
}

export default App;
