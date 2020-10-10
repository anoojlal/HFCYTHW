import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

export default class GameStats extends React.Component {
  render() {
    const { time, cps, accuracy, progress } = this.props;

    return (
      <div className="stats">
        <Row>
          <Col xs="1">
            <ArrowRight className="arrowRight invisible" />
          </Col>
          <Col>{"Time\nCPS\nAccuracy\nProgress"}</Col>
          <Col>
            <ArrowRight className="arrowRight invisible" />
          </Col>
          <Col>
            <div className="colons">{":\n:\n:\n:"}</div>
          </Col>
          <Col>
            <ArrowRight className="arrowRight invisible" />
          </Col>
          <Col>
            {time + "\n"}
            {cps + "\n"}
            {accuracy + "%\n"}
            {progress}
          </Col>
        </Row>
      </div>
    );
  }
}
