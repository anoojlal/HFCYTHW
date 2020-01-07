import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

/*
  What's displayed in the console:

  Timer
  WPM
  Accuracy
  "Line 10: Backspace your mistakes before progressing"
  "Found 'a'; expected 's'"
*/

export default class Console extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: []
    };
  }

  render() {
    const { logs } = this.props;

    return (
      <div className="console">
        <div className="sticky">
          <div className="consoleLogs">
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={250}
              transitionLeaveTimeout={250}
            >
              {logs.map(log => {
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
            </ReactCSSTransitionGroup>
            <div className="stats">
              <Row>
                <Col xs="1">
                  <ArrowRight className="arrowRight invisible" />
                </Col>
                <Col>{"Timer\nWPM\nAccuracy\nProgress"}</Col>
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
                  {"00:00:00" + "\n"}
                  {"0" + "\n"}
                  {"0.0%" + "\n"}
                  {"[--------------------]"}
                </Col>
              </Row>
            </div>
          </div>
          <div className="consoleBreak">
            <br />
          </div>
          <div className="consoleInput">
            <Row>
              <Col xs="1">
                <ArrowRight className="arrowRight" />
              </Col>
              <Col xs="11">{""}</Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
