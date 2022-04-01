import React from "react";
import Home from './pages/home';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import RouteLogin from "./components/routeLogin";
function App() {
  return (

    <Router>
            <Switch>
              <Route path="/login" component={Login}/>
              <RouteLogin path="/" component={Home} exact/>
            </Switch>
    </Router>
  );
}

export default App;
