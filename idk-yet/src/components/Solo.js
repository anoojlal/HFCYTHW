import React from "react";
import "./../css/Solo.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AppNavbar from "./AppNavbar.js";

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
      remaining: codeBlock.substring(1)
    };

    this.getLineNumbers = this.getLineNumbers.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  handleInput(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode;

    const valid = 
      (key >= 32 && key <= 126)

    if (valid || key === 13) {
      console.log("Valid: " + String.fromCharCode(key));
    } else {
      console.log("Not valid: " + String.fromCharCode(key));
    }
  }

  handleBackspace(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode;

    if (key === 8) {
      console.log("back");
    }

    if (key === 9 || key === 11) {
      console.log("tab");
    }
  }

  componentDidMount() {
    document.addEventListener("keypress", this.handleInput, false);
    document.addEventListener("keydown", this.handleBackspace, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleInput, false);
    document.removeEventListener("keydown", this.handleBackspace, false);
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
    const { codeBlock, completed, current, incorrect, remaining } = this.state;

    const customStyle = {
      whiteSpace: "pre-wrap",
      marginBottom: "0px",
      backgroundColor: "white",
      paddingLeft: "15%",
      paddingRight: "15%",
      tabSize: "4",
      display: "none"
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
              <span className="current">{current}</span>
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
