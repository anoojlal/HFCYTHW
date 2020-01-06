import React from "react";
import "./../css/Solo.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AppNavbar from "./AppNavbar.js";
import Console from "./Console.js";
import PressEnter from "@material-ui/icons/KeyboardReturn";
import Backspace from "@material-ui/icons/BackspaceOutlined";
import {
  Row,
  Col
} from "reactstrap";

export default class Solo extends React.Component {
  constructor(props) {
    super(props);

    const codeBlock =
      'public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}';

    this.state = {
      codeBlock: codeBlock,
      completed: "",
      current: codeBlock.charAt(0),
      incorrect: "",
      remaining: codeBlock.substring(1),
      finished: false,
      pressEnter: false,
      backspace: false,
      logs: []
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCorrectInput = this.handleCorrectInput.bind(this);
    this.handleIncorrectInput = this.handleIncorrectInput.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.getLineNumbers = this.getLineNumbers.bind(this);
    this.getCurrentLineNumber = this.getCurrentLineNumber.bind(this);
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

    const { incorrect } = this.state;

    const key = event.keyCode;
    const inputChar = String.fromCharCode(key);
    const valid = (key >= 32 && key <= 126) || key === 13;
    const { current, pressEnter } = this.state;

    if (inputChar === " ") {
      event.preventDefault();
    }

    if (valid) {
      if (
        incorrect.length === 0 &&
        (inputChar === current || (pressEnter && key === 13))
      ) {
        this.handleCorrectInput();
      } else {
        this.handleIncorrectInput(key);
      }
    }
  }

  handleKeyDown(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode;

    if (key === 8) {
      this.handleBackspace();
    } else if (key === 9 || key === 11) {
      event.preventDefault();
    }
  }

  handleCorrectInput() {
    let { codeBlock, completed, current, remaining, finished } = this.state;

    completed = completed + current;
    current = remaining.charAt(0);
    remaining = remaining.substring(1);
    finished = codeBlock === completed;

    this.setState({
      completed: completed,
      current: current,
      remaining: remaining,
      pressEnter: current === "\n",
      backspace: false,
      finished: finished
    });

    if (finished) {
      document.removeEventListener("keypress", this.handleKeyPress, false);
      document.removeEventListener("keydown", this.handleKeyDown, false);
    }

    if (current === "\t") {
      this.handleCorrectInput();
    }
  }

  handleIncorrectInput(key) {
    let {
      incorrect,
      current,
      logs,
      pressEnter
    } = this.state;

    const line = this.getCurrentLineNumber();
    const inputChar = String.fromCharCode(key);

    if (incorrect.length < 5) {
      incorrect = incorrect + (key === 13 ? ' ' : inputChar);

      if (incorrect.length === 1) {
        logs.push({
          type: "warning",
          text: "Found '" + (key === 13 ? "[Enter]" : inputChar) + "'; expected '" + (pressEnter ? "[Enter]" : current) + "'",
          line: line
        });
      }
    } else {
      logs.push({
        type: "error",
        text: "Backspace your mistakes before progressing",
        line: line
      });
    }

    this.setState({
      incorrect: incorrect,
      backspace: true,
      logs: logs
    });
  }

  handleBackspace() {
    let {
      completed,
      incorrect,
      current,
      remaining
    } = this.state;

    if (incorrect.length > 0) {
      incorrect = incorrect.substring(0, incorrect.length - 1);
    } else if (completed.length === 0) {
      return;
    } else {
      remaining = current + remaining;
      current = completed.charAt(completed.length - 1);
      completed = completed.substring(0, completed.length - 1);
    }

    this.setState({
      completed: completed,
      incorrect: incorrect,
      remaining: remaining,
      pressEnter: current === "\n",
      backspace: incorrect.length > 0,
      current: current
    });

    if (current === "\t") {
      this.handleBackspace();
    }
  }

  getLineNumbers() {
    const numLines = this.state.codeBlock.split("\n").length;
    let lineNumbers = "";

    for (let i = 1; i <= numLines; i++) {
      lineNumbers = lineNumbers + " " + i + "\n";
    }

    return lineNumbers;
  }

  getCurrentLineNumber() {
    return this.state.completed.split("\n").length;
  }

  render() {
    const {
      codeBlock,
      completed,
      current,
      incorrect,
      remaining,
      pressEnter,
      backspace,
      logs
    } = this.state;

    const customStyle = {
      whiteSpace: "pre-wrap",
      marginBottom: "0px",
      backgroundColor: "white",
      tabSize: "4",
      webkitTouchCallout: "none" /* iOS Safari */,
      webkitUserSelect: "none" /* Safari */,
      khtmlUserSelect: "none" /* Konqueror HTML */,
      mozUserSelect: "none" /* Firefox */,
      msUserSelect: "none" /* Internet Explorer/Edge */,
      userSelect: "none",
      padding: "0em"
      // display: "none"
    };

    const lineNumbers = this.getLineNumbers();

    return (
      <div>
        <AppNavbar />
        <div className="solo">
          <div className="codeBlock">
            <Row>
              <Col xs="1">
                <div className="lineNumbers">{lineNumbers}</div>
              </Col>
              <Col xs="11">
                <div className="overlay">
                  <span>{completed}</span>
                  {!backspace && (
                    <span className="current">
                      {pressEnter && <PressEnter className="pressEnter" />}
                      {current}
                    </span>
                  )}
                  <span className="incorrect">
                    {incorrect}
                    {backspace && <Backspace className="backspace" />}
                  </span>
                  <span>{remaining}</span>
                </div>
                <SyntaxHighlighter
                  language="java"
                  style={github}
                  customStyle={customStyle}
                  
                >
                  {codeBlock}
                </SyntaxHighlighter>
              </Col>
            </Row>
          </div>
          <Console logs={logs}/>
        </div>
      </div>
    );
  }
}
