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
      logs.push("Console Log " + i);
    }

    this.setState({logs: logs});
  }

  render() {
    const { logs } = this.state;
    
    return (
      <div className="console">
        <div className="sticky">
          {logs.map((log) => {
            return (
              <div className="info">
                <ArrowRight className="arrowRight invisible"/>
                {log}
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
