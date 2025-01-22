hover 是通过指令实现的，原理：

```ts
import { DirectiveBinding } from 'vue';

interface BindingObj {
  disabledHover: boolean;
  className: string;
}

const Hover = {
  created(el: HTMLElement, binding: DirectiveBinding<BindingObj>) {
    const startTime = 50;
    const stayTime = 70;
    const { className, disabledHover = false } = binding.value;

    el.addEventListener(
      'touchstart',
      () => {
        if (disabledHover) return;

        setTimeout(() => {
          el?.classList.add(className);
        }, startTime);
      },
      { capture: false, passive: true },
    );

    el.addEventListener(
      'touchend',
      () => {
        if (disabledHover) return;

        setTimeout(() => {
          el?.classList.remove(className);
        }, stayTime);
      },
      false,
    );
  },
};

export default Hover;
```

grid-item 的 icon 传入的不是字符串，而是 icon 节点：

```html
<template>
  <t-grid-item text="收藏" :icon="starIcon" />
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { StarIcon } from 'tdesign-icons-vue-next';

  const starIcon = () => h(StarIcon, { size: '24px' });
</script>
```