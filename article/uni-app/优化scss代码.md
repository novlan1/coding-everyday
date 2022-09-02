## 1. 背景

有个scss文件，行数达到了10000多，这里记录下寻找规律、提取函数的过程。

## 2. 优化


### 2.1. 提取公共样式

公共样式的提取能用 extend 的话就不要用 mixin，extend的话会把多个选择器写在一起，比如：

```scss
// 源代码
%mt5 {
  margin-top: 5px;
}
.btn {
  @extend %mt5;
}
.block {
  @extend %mt5;
}

// 编译后产物
.btn, .block {
  margin-top: 5px;
}
```



### 2.2. tab样式优化

这里直接贴代码了，下面定义了一个Map类型的数据，表示某一列的起点和终点。


```scss
$tabMap: (
  8: (start: 2,
    end: 8,
  ),
  7: (start: 2,
    end: 14,
  ),
  6: (start: 2,
    end: 12,
  ),
  5: (start: 2,
    end: 10,
  ),
  4: (start: 2,
    end: 8,
  ),
  3: (start: 2,
    end: 6,
  ),
  2: (start: 2,
    end: 4,
  ),
  1: (start: 2,
    end: 2,
  ),
);
```

遍历这个Map，然后为不同位置的`icon`指定样式。

`:nth-child(-n+3)`表示前3个位置，也就是1、2、3。

`map-get($map, key)`可以获取 `map` 中 `key` 对应的值。


```scss
@mixin sche-tab-style() {

  @each $key,
  $val in $tabMap {
    $start: map-get($val, start);
    $end: map-get($val, end);

    @for $i from $start through $end {
      .tip-match-pk-#{$key}-#{$i} {
        .tip-match-schedule-tab {
          .tip-match-schedule-tab-item {
            &:nth-child(-n+#{$i}) {
              .tip-match-schedule-tab-icon {
                @extend %sche-tab-icon-2;
              }

              &::after {
                background: $color-blue-1;
              }
            }

            &:nth-child(#{$i+1}) {
              .tip-match-schedule-tab-icon {
                @extend %sche-tab-icon;
              }
            }
          }
        }
      }
    }
  }
}

@include sche-tab-style();
```

### 2.3. translateY优化


<img src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2022/8/sche-style-1661845689892.png" width="320">

计算某一列的 translateY，公式为： 

```
(2 ** n - 1) * 2.32 / 2
```


当 n 取`0, 1, 2, 3, 4, 5, 6`时，translateY 分别为`0, 1.16, 3.48, 8.12, 17.4, 35.96, 73.08`。


公式是怎么来的呢，当 n 为 1 时，就有 `2 ** n = 2` 个赛程， 减去最新一列的 1 个，然后乘以 1 个赛程的高度，然后除以 2，就是上面偏移的距离了，也就是上面的公式了。如果 n 为 2，就有 4 个赛程，n 为 3， 就是 8 个赛程，以此类推。


2.32是这么来的，`2.32 = 0.8 + 0.8 + 0.4 + 0.32`。


下面是代码，`$x + rem`，可以拼接字符串，不要加双引号。

```scss
@mixin sch-item-translate-y($n) {
  $pow: 1;
  $tmp: 0;
  $base: 2;

  @while $tmp < $n {
    $pow: $pow * $base;
    $tmp: $tmp +1;
  }

  $x: calc(($pow - 1) * 2.32 / 2);
  transform: translate3d(0, $x + rem, 0);
}
```


### 2.4. marginBottom优化


计算某一列的赛程的 marginBottom，公式为：

```
(2 ** n - 1) * 2.32 + 0.32
```


当 n 取`0, 1, 2, 3, 4, 5, 6`时，marginBottom 分别为`0.32, 2.64, 7.28, 16.56, 35.12, 72.24, 146.48`。

公式说明，当 n 为 1 时，原来的赛程树是2个，减去最新一列的 1 个，然后乘以 1 个赛程的高度，再加上之前原先的 marginBottom。

下面是代码：

```scss
@mixin sch-item-margin-bottom($n) {
  $pow: 1;
  $tmp: 0;
  $base: 2;

  @while $tmp < $n {
    $pow: $pow * $base;
    $tmp: $tmp +1;
  }

  $x: calc(($pow - 1) * 2.32 + 0.32);
  margin-bottom: $x +rem;
}
```

## 3. 效果

首先代码行数大幅减少，至少可以减少一半，另外，编译后的产物减少了30k，主要是使用extend继承公共样式的作用。