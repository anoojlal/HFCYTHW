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
      'public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!aaaaaaaaaaaaaaaaaaaaaaaaa");\n\t}\n}';

    this.state = {
      codeBlock: codeBlock
    };
  }

  render() {
    const customStyle = {
        whiteSpace: 'pre-wrap',
        marginBottom: '0px',
        backgroundColor: 'white'
    }

    return (
        <div>
            <AppNavbar />
      <div className="solo">
        <Button
          color="primary"
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          Home
        </Button>
        <br />
        <br />
        <div className="codeBlock">
          <SyntaxHighlighter language="java" style={github} customStyle={customStyle} showLineNumbers>
            {this.state.codeBlock}
          </SyntaxHighlighter>
        </div>
      </div>
      </div>
    );
  }
}
