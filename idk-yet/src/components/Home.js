import React from "react";
import "./../css/Home.css";
import AppNavbar from "./AppNavbar.js";
import Input from "./Input";
import ConsoleLogs from "./ConsoleLogs";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      logs: [],
      playingSolo: false
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  componentDidMount() {
    let { logs } = this.state;

    document.addEventListener("keypress", this.handleKeyPress, false);
    document.addEventListener("keydown", this.handleKeyDown, false);

    logs.push({
      type: "info",
      text: "Welcome to YeetCode.",
    });

    this.setState({ logs });
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
      let { userInput, logs } = this.state;

      if (key === 13) {
        this.handleUserInput(userInput);
        userInput = "";
      } else {
        userInput += inputChar;
      }

      this.setState({ userInput, logs });
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

  handleUserInput(input) {
    const trimmed = input.trim().toLowerCase();

    if (trimmed.length == 0) {
      return;
    }

    let { logs } = this.state;
    const args = trimmed.split(/\s+/);

    if (trimmed === "help") {
      logs.push({
        type: "info",
        text: "help\t\t\tView a list of valid commands\nabout\t\t\tRead a description of the app and get a link to the repo\nplay [solo|multi]\tInitiates a solo or multiplayer game depending on the provided argument"
      });
    } else if (trimmed === "about") {
      // about
    } else if (args[0] === "play") {
      if (args.length < 2) {
        logs.push({
          type: "warning",
          text: "Specify a mode to play with an argument of `solo` or `multi`."
        });
      } else if (args[1] === "solo") {
        this.props.history.push("/solo");
      } else if (args[1] === "multi") {
        // multi
      } else {
        logs.push({
          type: "error",
          text: `"${args[1]}" is not a valid argument for the \`play\` command. Try \`solo\` or \`multi\`.`
        });
      }
    } else {
      logs.push({
        type: "error",
        text: `"${input.trim()}" is not a valid command. Type \`help\` for a list of commands.`,
      });
    }

    this.setState({ logs });
  }

  render() {
    const { userInput, logs } = this.state;

    return (
      <div>
        <AppNavbar />
        <div className="console">
          <div className="sticky">
            <ConsoleLogs logs={logs} />
            <div className="consoleBreak">
              <br />
            </div>
            <Input userInput={userInput} />
          </div>
        </div>
      </div>
    );
  }
}
