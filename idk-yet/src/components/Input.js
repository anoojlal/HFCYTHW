import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ConsoleLogs from "./ConsoleLogs";

export default class Input extends React.Component {
  render() {
    const { userInput } = this.props;

    return (

          <div className="consoleInput">
          <Row>
            <Col xs="1">
              <ArrowRight className="arrowRight" />
            </Col>
            <Col xs="11">
              {userInput}
              <span className="current"> </span>
            </Col>
          </Row>
          </div>
    );
  }
}
