import React from "react";
import "./../css/Console.css";
import { Row, Col } from "reactstrap";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress, false);
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress, false);
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyPress(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode;
    const inputChar = String.fromCharCode(key);
    const valid = (key >= 32 && key <= 126) || key === 13;

    if (inputChar === " ") {
      event.preventDefault();
    }

    if (valid) {
      let { userInput } = this.state;

      userInput += inputChar;

      this.setState({ userInput });
    }
  }

  handleKeyDown(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode;

    if (key === 8) {
      const { userInput } = this.state;

      this.setState({ userInput: userInput.slice(0, -1) });
    } else if (key === 9 || key === 11) {
      event.preventDefault();
    }
  }

  render() {
    const { userInput } = this.state;

    return (
      <div className="consoleInput">
        <Row>
          <Col xs="1">
            <ArrowRight className="arrowRight" />
          </Col>
          <Col xs="11">
          {userInput}
            <span className="current">{" "}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
