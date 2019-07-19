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
          asdf
          <Button color="primary">primary</Button>{" "}
          <Button color="secondary">secondary</Button>{" "}
          <Button color="success">success</Button>{" "}
          <Button color="info">info</Button>{" "}
          <Button color="warning">warning</Button>{" "}
          <Button color="danger">danger</Button>{" "}
          <Button color="link">link</Button>
        </div>
      </div>
    );
  }
}
