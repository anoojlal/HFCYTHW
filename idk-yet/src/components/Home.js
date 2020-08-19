import React from "react";
import "./../css/Home.css";
import { Button } from "reactstrap";
import AppNavbar from "./AppNavbar.js";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="home">
          Lorem ipsum asdf. <br /><br />
          <div className="column">
            <div className="button1">
              <Button color="primary" onClick={() => {this.props.history.push("/solo")}}>Solo</Button>
            </div>
            <div className="button2">
              <Button color="primary" onClick={() => {this.props.history.push("/game")}}>Private Game</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
