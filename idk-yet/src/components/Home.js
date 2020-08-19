import React from "react";
import "./../css/Home.css";
import { Button, Row, Col } from "reactstrap";
import AppNavbar from "./AppNavbar.js";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="home">
          Lorem ipsum asdf. <br /><br />
          <Col>
            <Row className = "text">
              <p>Placeholder text for Solo Game description</p>
            </Row>
            <Row>
              <Button className = "soloButton" color="primary" onClick={() => {this.props.history.push("/solo")}}>Solo</Button>
            </Row>
            <Row className = "text">
              <p>Placeholder text for Private Game description</p>
            </Row>
            <Row>
              <Button className = "privateButton" color="primary" onClick={() => {this.props.history.push("/private")}}>Private Game</Button>
            </Row>
          </Col>
        </div>
      </div>
    );
  }
}
