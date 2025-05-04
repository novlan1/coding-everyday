"use strict";

const _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

const _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

const _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

const _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

const _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

let _context;

// import "@bable/polyfill"; // 不完美的方式
const fn = function fn() {
  console.log("wens");
};

const p = new _promise["default"](function (resolve, reject) {
  resolve("wens");
});
const list = (0, _map["default"])(_context = [1, 2, 3, 4]).call(_context, function (item) {
  return item * 2;
});

const Person = /* #__PURE__*/(function () {
  function Person(name) {
    (0, _classCallCheck2["default"])(this, Person);
    this.name = name;
  }

  (0, _createClass2["default"])(Person, [{
    key: "say",
    value: function say() {
      console.log(this.name);
    }
  }]);
  return Person;
}());
