import React from "react";
import "./../css/Solo.css";
import { Button } from "reactstrap";
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
  }

  componentDidMount() {
    console.log(document.getElementById("syntaxHighlighter"));
  }

  render() {
    const { codeBlock, completed, current, incorrect, remaining } = this.state;

    const customStyle = {
      whiteSpace: "pre-wrap",
      marginBottom: "0px",
      backgroundColor: "white",
      paddingLeft: "15%",
      paddingRight: "15%",
      tabSize: "4"
    };

    return (
      <div>
        <AppNavbar />
        <div className="solo">
          <div className="codeBlock">
            <div className="overlay">
              <div className="lineNumbers">{"a\na\na\na\na\n"}</div>
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
