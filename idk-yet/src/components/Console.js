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
      } else {
        logs.push({
          text: "Console Log " + i,
          type: "info"
        });
      }
    }

    this.setState({logs: logs});
  }

  render() {
    const { logs } = this.state;
    
    return (
      <div className="console">
        <div className="sticky">
          {logs.map((log) => {
            if (log.type === "warning") {
              return (
                <div className="log warning">
                  <WarningIcon className="warningIcon" />
                  {log.text}
                </div>
              );
            }

            return (
              <div className="log">
                <ArrowRight className="arrowRight invisible" />
                {log.text}
              </div>
            );
          })}
          <ArrowRight className="arrowRight"/>
          this the console yo
        </div>
      </div>
    );
  }
}
