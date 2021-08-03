import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";

export default class ConsoleLogs extends React.Component {
  render() {
    const { logs, playing, time, cps, accuracy, progress } = this.props;

    return (
      <div className="consoleLogs">
        {logs.map((log, i) => {
          let className = "log";
          let icon = <ArrowRight className="arrowRight invisible" />;

          switch (log.type) {
            case "warning":
              className = "warning log";
              icon = <WarningIcon className="warningIcon" />;
              break;
            case "error":
              className = "error log";
              icon = <ErrorIcon className="errorIcon" />;
              break;
            default:
              break;
          }

          if (playing || i < logs.length - 1) {
            className += " logBorder";
          }

          return (
            <div className={className}>
              <Row>
                <Col xs="1">{icon}</Col>
                <Col xs="9">
                  <div className="logText">{log.text}</div>
                </Col>
                <Col xs="2">
                  {log.line && (
                    <div className="logLine">{"Line " + log.line}</div>
                  )}
                </Col>
              </Row>
            </div>
          );
        })}
        {playing && (
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
        )}
      </div>
    );
  }
}
