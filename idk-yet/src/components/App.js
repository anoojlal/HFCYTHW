import React from "react";
import "./../css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Solo from "./Solo";
import PrivateGame from "./PrivateGame"

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/solo" exact component={Solo} />
          <Route path="/private" exact component={PrivateGame} />
        </div>
      </Router>
    );
  }
}
