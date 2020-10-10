import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";
import GameStats from "./GameStats";
import Input from "./Input";

export default class Console extends React.Component {
  render() {
    const { logs, time, cps, accuracy, progress } = this.props;

    return (
      <div className="console">
        <div className="sticky">
          <div className="consoleLogs">
            {logs.map((log) => {
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
            <GameStats
              time={time}
              cps={cps}
              accuracy={accuracy}
              progress={progress}
            />
          </div>
          <div className="consoleBreak">
            <br />
          </div>
          <Input />
        </div>
      </div>
    );
  }
}
