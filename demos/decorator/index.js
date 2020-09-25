//  demo-01
@annotation
class MyClass {}

function annotation(target) {
  target.annotated = "123123";
}

// console.log(MyClass.annotated)

//  demo-02
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = async function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
// math.add(2, 4);

//  demo-03
function dec(id) {
  console.log("evaluated", id);
  return (target, property, descriptor) => console.log("executed", id);
}

class Example {
  @dec(1)
  @dec(2)
  method() {}
}

//  demo-04
function doSomething(name) {
  console.log("Hello, " + name);
}

function loggingDecorator(wrapped) {
  return function () {
    console.log("Starting");
    const result = wrapped.apply(this, arguments);
    console.log("Finished");
    return result;
  };
}

const wrapped = loggingDecorator(doSomething);
// wrapped();
