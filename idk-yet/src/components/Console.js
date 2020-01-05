import React from "react";
import "./../css/Console.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";

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

  componentDidMount() {
    const { logs } = this.state;

    for (let i = 1; i <= 7; i++) {
      if (i === 6) {
        logs.push({
          text: "Console Log " + i + "\nnew line of text",
          type: "warning",
          line: Math.floor(Math.random() * 10) + 1
        });
      } else if (i === 4) {
        logs.push({
          text: "Console Log " + i,
          type: "error",
          line: Math.floor(Math.random() * 10) + 1
        });
      } else {
        logs.push({
          text: "Console Log " + i,
          type: "info",
          line: Math.floor(Math.random() * 10) + 1
        });
      }
    }

    this.setState({ logs: logs });
  }

  render() {
    const { logs } = this.state;

    return (
      <div className="console">
        <div className="sticky">
          <div className="consoleLogs">
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
                    <Col xs="9"><div className="logText">{log.text}</div></Col>
                    <Col xs="2"><div className="logLine">{"Line " + log.line}</div></Col>
                  </Row>
                </div>
              );
            })}
            <div className="stats">
              <Row>
                <Col xs="1">
                  <ArrowRight className="arrowRight invisible" />
                </Col>
                <Col>{"Timer\nWPM\nAccuracy\nProgress"}</Col>
                <Col>
                  <ArrowRight className="arrowRight invisible" />
                </Col>
                <Col><div className="colons">{":\n:\n:\n:"}</div></Col>
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
              <Col>
                <ArrowRight className="arrowRight" />
              </Col>
              <Col>{""}</Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
