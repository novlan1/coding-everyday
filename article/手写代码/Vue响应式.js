function observer(data) {
  const dep = new Dep();

  return new Proxy(data, {
    get(target, key, receiver) {
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      dep.notify();
    }
  })
}