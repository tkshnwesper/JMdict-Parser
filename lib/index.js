#!/usr/bin/env node
"use strict";

var _react = _interopRequireDefault(require("react"));

var _child_process = require("child_process");

var _ink = require("ink");

var _inkSpinner = _interopRequireDefault(require("ink-spinner"));

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _console = console,
    log = _console.log;

var VERSION = require('../package.json').version;

var JMDictParser =
/*#__PURE__*/
function (_React$Component) {
  _inherits(JMDictParser, _React$Component);

  function JMDictParser(props) {
    var _this;

    _classCallCheck(this, JMDictParser);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JMDictParser).call(this, props));
    _this.state = {
      complete: false,
      started: false,
      outputFilename: ''
    };
    return _this;
  }

  _createClass(JMDictParser, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _commander.default.version(VERSION, '-v, --version').arguments('<file>').action(function (file) {
        _this2.setState({
          started: true
        });

        _this2.state.outputFilename = "".concat(file, ".json");
        (0, _child_process.execFile)('node', ["".concat(__dirname, "/parser.js"), file], function (error) {
          if (error) {
            log(error);
            process.exit(1);
          } else {
            _this2.setState({
              complete: true
            });
          }
        });
      });

      _commander.default.parse(process.argv);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var complete = this.state.complete;

      if (complete) {
        process.exit(0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          complete = _this$state.complete,
          outputFilename = _this$state.outputFilename,
          started = _this$state.started;
      return complete ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Color, {
        green: true,
        bold: true
      }, "Complete!"), _react.default.createElement("div", null, _react.default.createElement(_ink.Color, {
        cyan: true
      }, "Your JSON file is saved at"), outputFilename)) : started && _react.default.createElement(_ink.Color, {
        green: true
      }, _react.default.createElement(_inkSpinner.default, {
        green: true
      }), ' ', _react.default.createElement(_ink.Color, {
        gray: true,
        bold: true
      }, "Parsing", ' ', _react.default.createElement(_inkSpinner.default, {
        type: "simpleDots"
      })));
    }
  }]);

  return JMDictParser;
}(_react.default.Component);

(0, _ink.render)(_react.default.createElement(JMDictParser, null));