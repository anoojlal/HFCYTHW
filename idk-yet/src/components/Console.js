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

    this.state = {};
  }

  render() {
    return (
      <div className="console">
        <div className="sticky">
          <ArrowRight className="arrowRight"/>
          this the console yo
        </div>
      </div>
    );
  }
}
