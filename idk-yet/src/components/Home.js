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
          <Button color="primary" onClick={() => {this.props.history.push("/solo")}}>Solo</Button>
        </div>
      </div>
    );
  }
}
