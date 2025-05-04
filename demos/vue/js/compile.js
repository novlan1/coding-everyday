function Compile(vm) {
  this.vm = vm;
  this.el = vm.$el;
  this.fragment = null;
  this.init();
}

Compile.prototype = {
  init: function () {
    this.fragment = this.nodeFragment(this.el);
    this.compileNode(this.fragment);
    this.el.appendChild(this.fragment); // 解析完成添加到元素中
  },
  nodeFragment: function (el) {
    const fragment = document.createDocumentFragment();
    let child = el.firstChild;
    // 将子节点，全部移动文档片段里
    while (child) {
      fragment.appendChild(child);
      child = el.firstChild;
    }
    return fragment;
  },
  compileNode: function (fragment) {
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(node => {
      if (this.isElementNode(node)) {
        this.compile(node);
      }

      const reg = /\{\{(.*)\}\}/;
      const text = node.textContent;


      if (reg.test(text)) {
        const prop = reg.exec(text)[1];
        this.compileText(node, prop); // 替换模板
      }

      // 编译子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileNode(node);
      }
    });
  },
  compile: function (node) {
    const nodeAttrs = node.attributes;
    [...nodeAttrs].forEach(attr => {
      const name = attr.name;
      if (this.isDirective(name)) {
        const value = attr.value;
        if (name === "v-model") {
          this.compileModel(node, value);
        }
      }
    });
  },
  compileModel: function (node, prop) {
    const val = this.vm.$data[prop]; // 因为属性被监听，会进入 observer 的 get 方法
    this.updateModel(node, val);

    console.log('compileModel, prop:', prop);

    new Watcher(this.vm, prop, (value) => {
      this.updateModel(node, value);
    });

    node.addEventListener('input', e => {
      const newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      this.vm.$data[prop] = newValue;
    });
  },
  compileText: function (node, prop) {
    const text = this.vm.$data[prop];
    this.updateView(node, text);
    new Watcher(this.vm, prop, (value) => {
      this.updateView(node, value);
    });
  },

  updateModel: function (node, value) {
    node.value = typeof value == 'undefined' ? '' : value;
  },
  updateView: function (node, value) {
    node.textContent = typeof value === 'undefined' ? '' : value;
  },
  isDirective: function (attr) {
    return attr.indexOf('v-') !== -1;
  },

  isElementNode: function (node) {
    return node.nodeType === 1;
  },
  isTextNode: function (node) {
    return node.nodeType === 3;
  }
};
