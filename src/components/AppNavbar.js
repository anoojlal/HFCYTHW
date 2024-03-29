import React from "react";
import "./../css/AppNavbar.css";
import {
  Navbar,
  NavbarBrand
} from "reactstrap";
import Logo from "@material-ui/icons/Code";

export default class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar classname="navbar" light expand="md">
          <NavbarBrand href="/">
            <Logo className="logo" />
            HFCYTHW
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
