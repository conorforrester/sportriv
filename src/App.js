import React from 'react';
import './App.css';
import Home from './components/Home';
import Trivia from './components/Trivia';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path={"/"} />
        <Route component={Trivia} path={"/trivia"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
