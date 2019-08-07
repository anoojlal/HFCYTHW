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

export default class Console extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="console">
        <ArrowRight className="arrowRight"/>
        this the console yo
      </div>
    );
  }
}
