import React from "react";
import "./../css/Solo.css";
import "./../css/Console.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AppNavbar from "./AppNavbar.js";
import PressEnter from "@material-ui/icons/KeyboardReturn";
import Backspace from "@material-ui/icons/BackspaceOutlined";
import { Row, Col } from "reactstrap";
import ConsoleLogs from "./ConsoleLogs";
import Input from "./Input";

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
      logs: [],
      playing: false,
      time: "0:00.0",
      cps: 0,
      accuracy: 0.0,
      seconds: 0,
      incorrectTyped: 0,
      progress: "[--------------------]",
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCorrectInput = this.handleCorrectInput.bind(this);
    this.handleIncorrectInput = this.handleIncorrectInput.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.getLineNumbers = this.getLineNumbers.bind(this);
    this.getCurrentLineNumber = this.getCurrentLineNumber.bind(this);
    this.clearLog = this.clearLog.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.msToTime = this.msToTime.bind(this);
    this.getProgress = this.getProgress.bind(this);
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
    const { current, pressEnter } = this.state;

    if (inputChar === " ") {
      event.preventDefault();
    }

    if (valid) {
      const { incorrect, playing } = this.state;

      if (!playing) {
        this.setState({
          playing: true,
        });

        this.startTimer();
      }

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
    let {
      codeBlock,
      completed,
      current,
      remaining,
      finished,
      logs,
      seconds,
      cps,
      accuracy,
      incorrectTyped,
      progress,
    } = this.state;

    completed = completed + current;
    current = remaining.charAt(0);
    remaining = remaining.substring(1);
    finished = codeBlock === completed;
    cps = (completed.length / (seconds === 0 ? 1 : seconds)).toFixed(2);

    // length of code / total characters inputted

    accuracy = (
      ((completed.length - incorrectTyped) /
        (completed.length === 0 ? 1 : completed.length)) *
      100
    ).toFixed(2);

    if (accuracy < 0) {
      accuracy = 0;
    }

    if (finished) {
      document.removeEventListener("keypress", this.handleKeyPress, false);
      document.removeEventListener("keydown", this.handleKeyDown, false);

      logs.push({
        type: "info",
        text: "Finished",
      });

      clearInterval(this.timer);
    }

    this.setState({
      completed: completed,
      current: current,
      remaining: remaining,
      pressEnter: current === "\n",
      backspace: false,
      finished: finished,
      logs: logs,
      cps: cps,
      accuracy: accuracy,
    });

    progress = this.getProgress(completed.length, remaining.length);

    this.setState({ progress: progress });

    if (current === "\t") {
      this.handleCorrectInput();
    }
  }

  handleIncorrectInput(key) {
    let {
      incorrect,
      current,
      logs,
      pressEnter,
      incorrectTyped,
      accuracy,
      completed,
    } = this.state;

    const inputChar = String.fromCharCode(key);
    let log = null;

    if (incorrect.length < 5) {
      incorrect = incorrect + (key === 13 ? " " : inputChar);
      incorrectTyped++;
      accuracy = (
        ((completed.length - incorrectTyped) /
          (completed.length === 0 ? 1 : completed.length)) *
        100
      ).toFixed(2);

      if (accuracy < 0) {
        accuracy = 0;
      }

      if (incorrect.length === 1) {
        log = {
          type: "warning",
          text:
            "Found '" +
            (key === 13 ? "[Enter]" : inputChar) +
            "'; expected '" +
            (pressEnter ? "[Enter]" : current) +
            "'",
          line: this.getCurrentLineNumber(),
        };
      } else if (incorrect.length === 5) {
        log = {
          type: "error",
          text: "Backspace your mistakes before progressing",
          line: this.getCurrentLineNumber(),
        };
      }
    }

    this.setState({
      incorrect: incorrect,
      backspace: true,
      incorrectTyped: incorrectTyped,
      accuracy: accuracy,
    });

    if (log) {
      if (logs.length >= 3) {
        while (logs.length >= 3) {
          logs.splice(0, 1);
        }

        this.setState({ logs });
        logs.push(log);
        this.setState({ logs });
      } else {
        logs.push(log);
        this.setState({ logs });
      }

      this.clearLog(log);
    }
  }

  clearLog(log) {
    setTimeout(() => {
      const { logs } = this.state;

      if (logs[logs.length - 1] === log) {
        logs.splice(0, 1);
        this.setState({ logs: logs });

        if (logs.length > 0) {
          this.clearLog(logs[logs.length - 1]);
        }
      }
    }, 5000);
  }

  handleBackspace() {
    let { completed, incorrect, current, remaining, progress } = this.state;

    if (incorrect.length > 0) {
      incorrect = incorrect.substring(0, incorrect.length - 1);
    } else if (completed.length === 0) {
      return;
    } else {
      remaining = current + remaining;
      current = completed.charAt(completed.length - 1);
      completed = completed.substring(0, completed.length - 1);
      progress = this.getProgress(completed.length, remaining.length);
    }

    this.setState({
      completed: completed,
      incorrect: incorrect,
      remaining: remaining,
      pressEnter: current === "\n",
      backspace: incorrect.length > 0,
      current: current,
      progress: progress,
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

  startTimer() {
    const startTime = Date.now();

    this.timer = setInterval(() => {
      const timeElapsed = Date.now() - startTime;

      this.setState({
        time: this.msToTime(timeElapsed),
        seconds: Math.floor((timeElapsed / 1000) % 60),
      });
    }, 1);
  }

  msToTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 100),
      seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60);

    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
  }

  getProgress(completed, remaining) {
    if (completed === 0) {
      return "[--------------------]";
    }

    if (this.state.finished) {
      return "[********************]";
    }

    let progress = "[";
    let completion = Math.floor((completed / (completed + remaining)) * 20);

    if (completion === 20) {
      completion--;
    }

    for (let i = 0; i < completion; i++) {
      progress = progress + "*";
    }

    progress = progress + "o";

    for (let i = 0; i < 19 - completion; i++) {
      progress = progress + "-";
    }

    progress = progress + "]";

    return progress;
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
      logs,
      time,
      cps,
      accuracy,
      progress,
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
      padding: "0em",
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
          <div className="console">
            <div className="sticky">
              <ConsoleLogs
                logs={logs}
                time={time}
                cps={cps}
                accuracy={accuracy}
                progress={progress}
                playing
              />
              <div className="consoleBreak">
                <br />
              </div>
              <Input playing />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
