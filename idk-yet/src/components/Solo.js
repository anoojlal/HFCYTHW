import React from "react";
import "./../css/Solo.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AppNavbar from "./AppNavbar.js";
import PressEnter from "@material-ui/icons/KeyboardReturn";

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
      pressEnter: false
    };

    this.getLineNumbers = this.getLineNumbers.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCorrectInput = this.handleCorrectInput.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);

    this.codeBlock = React.createRef();
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
    const valid = (key >= 32 && key <= 126) || key === 13;
    const { current, pressEnter } = this.state;

    if (valid) {
      if (String.fromCharCode(key) === current ||
        (pressEnter && key === 13)) {
        this.handleCorrectInput();
      } else {

      }
    } else {

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
      pressEnter: current === '\n',
      finished: finished
    });

    if (finished) {
      document.removeEventListener("keypress", this.handleKeyPress, false);
      document.removeEventListener("keydown", this.handleKeyDown, false);

      console.log("Finished!");
    }

    if (current === '\t') {
      this.handleCorrectInput();
    }
  }

  handleBackspace() {
    console.log("back");
  }

  getLineNumbers() {
    const numLines = this.state.codeBlock.split('\n').length;
    let lineNumbers = "";

    for (let i = 1; i <= numLines; i++) {
      lineNumbers = lineNumbers + i + "\n";
    }

    return lineNumbers;
  }

  render() {
    const { codeBlock, completed, current, incorrect, remaining, pressEnter } = this.state;

    const customStyle = {
      whiteSpace: "pre-wrap",
      marginBottom: "0px",
      backgroundColor: "white",
      paddingLeft: "15%",
      paddingRight: "15%",
      tabSize: "4",
      webkitTouchCallout: "none", /* iOS Safari */
      webkitUserSelect: "none", /* Safari */
      khtmlUserSelect: "none", /* Konqueror HTML */
      mozUserSelect: "none", /* Firefox */
      msUserSelect: "none", /* Internet Explorer/Edge */
      userSelect: "none"
      //display: "none"
    };

    const lineNumbers = this.getLineNumbers();

    return (
      <div>
        <AppNavbar />
        <div className="solo">
          <div className="codeBlock">
            <div className="overlay">
              <div className="lineNumbers">{lineNumbers}</div>
              <span>{completed}</span>
              <span className="current">{pressEnter && <PressEnter className="pressEnter"/>}{current}</span>
              <span className="incorrect">{incorrect}</span>
              <span>{remaining}</span>
            </div>
            <SyntaxHighlighter
              language="java"
              style={github}
              customStyle={customStyle}
              showLineNumbers
            >
              {codeBlock}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    );
  }
}
