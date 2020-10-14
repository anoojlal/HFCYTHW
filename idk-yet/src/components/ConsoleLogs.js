import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";

export default class ConsoleLogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
    };
  }

  componentDidMount() {
    this.setState({ logs: this.props.logs });
  }

  componentDidUpdate() {
    let { logs } = this.state;

    if (logs.length > 10) {
      while (logs.length > 10) {
        logs.splice(0, 1);
      }

      this.setState({ logs });
    }
  }

  render() {
    const { logs } = this.state;

    if (logs.length > 0) {
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

            if (i < logs.length - 1) {
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
        </div>
      );
    }

    return <div></div>;
  }
}
