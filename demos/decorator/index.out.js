"use strict";

let _class, _class2, _dec, _dec2, _class3;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
 try {
 var info = gen[key](arg); var value = info.value;
} catch (error) {
 reject(error); return;
} if (info.done) {
 resolve(value);
} else {
 Promise.resolve(value).then(_next, _throw);
}
}

function _asyncToGenerator(fn) {
 return function () {
 const self = this, args = arguments; return new Promise(function (resolve, reject) {
 const gen = fn.apply(self, args); function _next(value) {
 asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
} function _throw(err) {
 asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
} _next(undefined);
});
};
}

function _defineProperties(target, props) {
 for (let i = 0; i < props.length; i++) {
 const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
}
}

function _createClass(Constructor, protoProps, staticProps) {
 if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor;
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
 let desc = {}; Object.keys(descriptor).forEach(function (key) {
 desc[key] = descriptor[key];
}); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) {
 desc.writable = true;
} desc = decorators.slice().reverse().reduce(function (desc, decorator) {
 return decorator(target, property, desc) || desc;
}, desc); if (context && desc.initializer !== void 0) {
 desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined;
} if (desc.initializer === void 0) {
 Object.defineProperty(target, property, desc); desc = null;
} return desc;
}

function _classCallCheck(instance, Constructor) {
 if (!(instance instanceof Constructor)) {
 throw new TypeError("Cannot call a class as a function");
}
}

//  demo-01
const MyClass = annotation(_class = function MyClass() {
  _classCallCheck(this, MyClass);
}) || _class;

function annotation(target) {
  target.annotated = "123123";
} // console.log(MyClass.annotated)
//  demo-02


const Math = (_class2 = /* #__PURE__*/(function () {
  function Math() {
    _classCallCheck(this, Math);
  }

  _createClass(Math, [{
    key: "add",
    value: function add(a, b) {
      return a + b;
    }
  }]);

  return Math;
}()), (_applyDecoratedDescriptor(_class2.prototype, "add", [log], Object.getOwnPropertyDescriptor(_class2.prototype, "add"), _class2.prototype)), _class2);

function log(target, name, descriptor) {
  const oldValue = descriptor.value;
  descriptor.value = /* #__PURE__*/_asyncToGenerator(/* #__PURE__*/regeneratorRuntime.mark(function _callee() {
    const _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Calling ".concat(name, " with"), _args);
            return _context.abrupt("return", oldValue.apply(this, _args));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return descriptor;
}

const math = new Math(); // passed parameters should get logged now
// math.add(2, 4);
//  demo-03

function dec(id) {
  console.log("evaluated", id);
  return function (target, property, descriptor) {
    return console.log("executed", id);
  };
}

const Example = (_dec = dec(1), _dec2 = dec(2), (_class3 = /* #__PURE__*/(function () {
  function Example() {
    _classCallCheck(this, Example);
  }

  _createClass(Example, [{
    key: "method",
    value: function method() {}
  }]);

  return Example;
}()), (_applyDecoratedDescriptor(_class3.prototype, "method", [_dec, _dec2], Object.getOwnPropertyDescriptor(_class3.prototype, "method"), _class3.prototype)), _class3)); //  demo-04

function doSomething(name) {
  console.log(`Hello, ${name}`);
}

function loggingDecorator(wrapped) {
  return function () {
    console.log("Starting");
    const result = wrapped.apply(this, arguments);
    console.log("Finished");
    return result;
  };
}

const wrapped = loggingDecorator(doSomething); // wrapped();
