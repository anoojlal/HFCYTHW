import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

export default class Input extends React.Component {
  render() {
    const { userInput, playing } = this.props;

    return (
      <div className="consoleInput">
        <Row>
          <Col xs="1">
            <ArrowRight className="arrowRight" />
          </Col>
          <Col xs="11">
            {!playing && userInput}
            {!playing && (<span className="current"> </span>)}
          </Col>
        </Row>
      </div>
    );
  }
}
