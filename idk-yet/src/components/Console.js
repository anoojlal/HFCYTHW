import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import WarningIcon from "@material-ui/icons/WarningRounded";
import ErrorIcon from "@material-ui/icons/ErrorRounded";
import Input from "./Input";
import ConsoleLogs from "./ConsoleLogs";

export default class Console extends React.Component {
  render() {
    const { logs, time, cps, accuracy, progress } = this.props;

    return (
      <div className="console">
        <div className="sticky">
          <ConsoleLogs logs={logs}/>
          <div className="consoleBreak">
            <br />
          </div>
          <Input />
        </div>
      </div>
    );
  }
}
