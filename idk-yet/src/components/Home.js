import React from "react";
import "./../css/Home.css";
import { Button } from "reactstrap";
import AppNavbar from "./AppNavbar.js";
import Input from "./Input";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <div className="sticky">
          <Input />
        </div>
      </div>
    );
  }
}
