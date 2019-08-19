import React from "react";
import "./../css/Console.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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

    for (let i = 1; i <= 8; i++) {
      if (i === 6) {
        logs.push({
          text: "Console Log " + i,
          type: "warning"
        });
      } else if (i === 4) {
        logs.push({
          text: "Console Log " + i,
          type: "error"
        });
      } else {
        logs.push({
          text: "Console Log " + i,
          type: "info"
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
            {logs.map((log, index) => {
              let className = "";
              let icon = <ArrowRight className="arrowRight invisible" />;
              const last = index === logs.length - 1;

              switch (log.type) {
                case "warning":
                  className = "warning " + (last ? "lastLog" : "log");
                  icon = <WarningIcon className="warningIcon" />;
                  break;
                case "error":
                  className = "error " + (last ? "lastLog" : "log");
                  icon = <ErrorIcon className="errorIcon" />;
                  break;
                default:
                  className = last ? "lastLog" : "log";
                  break;
              }

              return (
                <div className={className}>
                  {icon}
                  {log.text}
                </div>
              );
            })}
          </div>
          <div className="consoleBreak">
            <br />
          </div>
          <div className="consoleInput">
            <ArrowRight className="arrowRight" />
          </div>
        </div>
      </div>
    );
  }
}
