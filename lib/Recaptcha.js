'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Constants
var ID = '_grecaptcha.element.id';
var CALLBACK_NAME = '_grecaptcha.data-callback';
var EXPIRED_CALLBACK_NAME = '_grecaptcha.data-expired-callback';

var removeChild = function removeChild(elem) {
  return elem.parentNode && elem.parentNode.removeChild(elem);
};

var Recaptcha = function (_React$Component) {
  _inherits(Recaptcha, _React$Component);

  function Recaptcha() {
    _classCallCheck(this, Recaptcha);

    return _possibleConstructorReturn(this, (Recaptcha.__proto__ || Object.getPrototypeOf(Recaptcha)).apply(this, arguments));
  }

  _createClass(Recaptcha, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          locale = _props.locale,
          callback = _props.callback,
          expiredCallback = _props.expiredCallback;

      // 1. Async lazy load

      var head = document.head || document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.id = ID;
      script.src = 'https://www.google.com/recaptcha/api.js?hl=' + locale;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.onerror = function (oError) {
        throw new URIError('The script ' + oError.target.src + ' is not accessible.');
      };
      head.appendChild(script);

      // 2. Expose callback function to window object
      window[CALLBACK_NAME] = callback;
      window[EXPIRED_CALLBACK_NAME] = expiredCallback;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeChild(document.getElementById(ID));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          sitekey = _props2.sitekey,
          invisible = _props2.invisible,
          otherProps = _objectWithoutProperties(_props2, ['className', 'sitekey', 'invisible']);

      var props = _extends({}, (0, _lodash2.default)(otherProps, ['callback', 'expiredCallback', 'locale']), {
        className: (0, _classnames2.default)('g-recaptcha', className),
        'data-sitekey': sitekey,
        'data-callback': CALLBACK_NAME,
        'data-expired-callback': EXPIRED_CALLBACK_NAME
      }, invisible && { 'data-size': 'invisible' });

      return _react2.default.createElement('div', props);
    }
  }]);

  return Recaptcha;
}(_react2.default.Component);

Recaptcha.propTypes = {
  // Required
  sitekey: _propTypes2.default.string.isRequired,
  callback: _propTypes2.default.func.isRequired,
  expiredCallback: _propTypes2.default.func.isRequired,

  // Options
  className: _propTypes2.default.string,
  invisible: _propTypes2.default.bool,
  locale: _propTypes2.default.string
};
Recaptcha.defaultProps = {
  locale: 'en',
  className: undefined,
  invisible: false
};
exports.default = Recaptcha;