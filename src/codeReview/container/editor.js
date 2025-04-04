"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

//전역변수 설정
var editor_select,editor_theme;

var monaco = _interopRequireWildcard(require("../../../node_modules/monaco-editor/esm/vs/editor/editor.api"));

var _propTypes = _interopRequireDefault(require("../../../node_modules/prop-types"));

var _react = _interopRequireDefault(require("../../../node_modules/react"));

var _utils = require("../../../node_modules/react-monaco-editor/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MonacoEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MonacoEditor, _React$Component);

  function MonacoEditor(props) {
    var _this;

    _classCallCheck(this, MonacoEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MonacoEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "assignRef", function (component) {
      _this.containerElement = component;
    });

    _this.containerElement = undefined;
    return _this;
  }

  _createClass(MonacoEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initMonaco();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          value = _this$props.value,
          language = _this$props.language,
          theme = _this$props.theme,
          height = _this$props.height,
          options = _this$props.options,
          width = _this$props.width;
      var editor = this.editor;
      var model = editor.getModel(); 
          editor_select = _this$props.lineSelect;
          editor_theme = _this$props.theme;
   
        if(prevProps.value !== value){
            model.pushEditOperations([], [{
                range: model.getFullModelRange(),
                text: value
            }]);
        }

  

      if (prevProps.language !== language) {
        monaco.editor.setModelLanguage(monaco.editor.getModels()[0], language);
      }

      if (prevProps.theme !== theme) {
         monaco.editor.setTheme(theme);
      }

      if (editor && (width !== prevProps.width || height !== prevProps.height)) {
        editor.layout();
      }

      if (prevProps.options !== options) {
        editor.updateOptions(options);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyMonaco();

    }
  }, {
    key: "destroyMonaco",
    value: function destroyMonaco() {
      if (this.editor) {
        this.editor.dispose();
        var model = this.editor.getModel();

        if (model) {
          model.dispose();
        }
      }

      if (this._subscription) {
        this._subscription.dispose();
      }
    }
  }, {
    key: "initMonaco",
    value: function initMonaco() {
      var value = this.props.value != null ? this.props.value : this.props.defaultValue;
      var _this$props2 = this.props,
          language = _this$props2.language,
          theme = _this$props2.theme,
          options = _this$props2.options,
          overrideServices = _this$props2.overrideServices;  
          
      if (this.containerElement) {
        // Before initializing monaco editor
        Object.assign(options, this.editorWillMount());
        this.editor = monaco.editor.create(this.containerElement, _objectSpread({
          value: value,
          fontSize: "20px",
          roundedSelection: true,
          //contextmenu: false,
          //cursorWidth: 0,
          wordWrap: true, //끝까지가면 다음줄로 자동변경
          scrollBeyondLastLine: false, //스크롤바 설정
          minimap: {     //미니맵 설정
            enabled: false
          },
          language: language
        }, options, theme ? {
          theme: theme
        } : {}), overrideServices); // After initializing monaco editor
        this.editorDidMount(this.editor);
      }
    }
  }, {
    key: "editorWillMount",
    value: function editorWillMount() {
      var editorWillMount = this.props.editorWillMount;
      var options = editorWillMount(monaco);
      return options || {};
    }
  }, 
  {
    key: "editorDidMount",
    value: function editorDidMount(editor) {
      var _this2 = this;

      this.props.editorDidMount(editor, monaco);
      // this._subscription = editor.onDidChangeModelContent(function (event) {
      //   if (!_this2.__prevent_trigger_change_event) {
      //     _this2.props.onChange(editor.getValue(), event);
      //   }
      // });
    }
  },
   {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          width = _this$props3.width,
          height = _this$props3.height;
      var fixedWidth = (0, _utils.processSize)(width);
      var fixedHeight = (0, _utils.processSize)(height);
      var style = {
        width: fixedWidth,
        height: fixedHeight
      };
      return _react["default"].createElement("div", {
        ref: this.assignRef,
        style: style,
        className: "react-monaco-editor-container"
      });

    }
  }]);

  return MonacoEditor;
}(_react["default"].Component);

MonacoEditor.propTypes = {
  width: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  value: _propTypes["default"].string,
  defaultValue: _propTypes["default"].string,
  language: _propTypes["default"].string,
  theme: _propTypes["default"].string,
  lineSelect: _propTypes["default"].string,
  code_state:_propTypes["default"].string,
  options: _propTypes["default"].object,
  modal_start:_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  overrideServices: _propTypes["default"].object,
  editorDidMount: _propTypes["default"].func,
  editorWillMount: _propTypes["default"].func,
  onChange: _propTypes["default"].func
};
MonacoEditor.defaultProps = {
  width: "100%",
  height: "100%",
  value: null,
  code_state:"",
  defaultValue: "",
  modal_start:0,
  language: "javascript",
  theme: null,
  lineSelect: null,
  options: {},
  overrideServices: {},
  editorDidMount: _utils.noop,
  editorWillMount: _utils.noop,
  onChange: _utils.noop
};
var _default = MonacoEditor;
exports["default"] = _default;