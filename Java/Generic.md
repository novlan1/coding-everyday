- [1. 泛型](#1-泛型)
- [2. 使用泛型](#2-使用泛型)
- [3. 编写泛型](#3-编写泛型)
- [4. 擦拭法](#4-擦拭法)
- [5. 泛型 extends 通配符](#5-泛型-extends-通配符)
  - [5.1. extends通配符的作用](#51-extends通配符的作用)
- [6. 泛型 super 通配符](#6-泛型-super-通配符)
    - [6.0.1. PECS 原则](#601-pecs-原则)
    - [6.0.2. 无限定通配符`<?>`](#602-无限定通配符)
- [7. 泛型和反射](#7-泛型和反射)

### 1. 泛型

泛型就是编写模板代码来适应任意类型；

泛型的好处是使用时不必对类型进行强制转换，它通过编译器对类型进行检查；

注意泛型的继承关系：可以把`ArrayList<Integer>`向上转型为`List<Integer>`（`T`不能变！），但不能把`ArrayList<Integer>`向上转型为`ArrayList<Number>`（`T`不能变成父类）。

```java
// 创建可以存储String的ArrayList:
ArrayList<String> strList = new ArrayList<String>();
// 创建可以存储Float的ArrayList:
ArrayList<Float> floatList = new ArrayList<Float>();
// 创建可以存储Person的ArrayList:
ArrayList<Person> personList = new ArrayList<Person>();
```



### 2. 使用泛型

1. 使用泛型时，把泛型参数`<T>`替换为需要的class类型，例如：`ArrayList<String>`，`ArrayList<Number>`等；
2. 可以省略编译器能自动推断出的类型，例如：`List<String> list = new ArrayList<>();`；
3. 不指定泛型参数类型时，编译器会给出警告，且只能将`<T>`视为`Object`类型；
4. 可以在接口中定义泛型类型，实现此接口的类必须实现正确的泛型类型。

让`Person`实现`Comparable<T>`接口：


```java
class Person implements Comparable<Person> {
    String name;
    int score;
    Person(String name, int score) {
        this.name = name;
        this.score = score;
    }
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
    public String toString() {
        return this.name + "," + this.score;
    }
}
```

### 3. 编写泛型

```java
public class Pair<T>{
  private T first;
  private T last;
  
  public Pair(T first, T last) {
    this.first = first;
    this.last = last;
  }
  
  public T getFirst{
    return first;
  }
  public T getLast{
    return last;
  }
  
  // 静态方法
  public static <K> Pair<K> create(K first, K last) {
    return new Pair(K first, K last)
  }
}
```

多个泛型类型：

```java
public class Pair<T, K> {
    private T first;
    private K last;
    public Pair(T first, K last) {
        this.first = first;
        this.last = last;
    }
    public T getFirst() { ... }
    public K getLast() { ... }
}
```

使用的时候，需要指出两种类型：

```java
Pair<String, Integer> p = new Pair<>("test", 123);
```

小结：

1. 编写泛型时，需要定义泛型类型`<T>`；
2. 静态方法不能引用泛型类型`<T>`，必须定义其他类型（例如`<K>`）来实现静态泛型方法；
3. 泛型可以同时定义多种类型，例如`Map<K, V>`。



### 4. 擦拭法

擦拭法是指，虚拟机对泛型其实一无所知，所有的工作都是编译器做的。

- 编译器把类型`<T>`视为`Object`；
- 编译器根据`<T>`实现安全的强制转型。

Java泛型的局限：

- 不能是基本类型，例如：`int`，因为实际类型是`Object`，`Object`类型无法持有基本类型；

- 不能获取带泛型类型的`Class`，例如：`Pair<String>.class`。

  - 因为，所有泛型实例，无论`T`的类型是什么，`getClass()`返回同一个`Class`实例，因为编译后它们全部都是`Pair<Object>`；

- 不能判断带泛型类型的类型，例如：`x instanceof Pair<String>`。

  - 因为，并不存在`Pair<String>.class`，而是只有唯一的`Pair.class`；

- 不能实例化`T`类型，例如：`new T()`。

  - 擦拭后实际上变成了：

  ```java
  first = new Object();
  last = new Object();
  ```

  这样一来，创建`new Pair<String>()`和创建`new Pair<Integer>()`就全部成了`Object`，显然编译器要阻止这种类型不对的代码

泛型方法要防止重复定义方法，例如：`public boolean equals(T obj)`；

### 5. 泛型 extends 通配符

#### 5.1. extends通配符的作用

如果我们考察Java标准库的`java.util.List<T>`接口，它实现的是一个类似“可变数组”的列表，主要功能包括：

```java
public interface List<T> {
    int size(); // 获取个数
    T get(int index); // 根据索引获取指定元素
    void add(T t); // 添加一个新元素
    void remove(T t); // 删除一个已有元素
}
```

现在，让我们定义一个方法来处理列表的每个元素：

```java
int sumOfList(List<? extends Integer> list) {
    int sum = 0;
    for (int i=0; i<list.size(); i++) {
        Integer n = list.get(i);
        sum = sum + n;
    }
    return sum;
}
```

为什么我们定义的方法参数类型是`List<? extends Integer>`而不是`List<Integer>`？从方法内部代码看，传入`List<? extends Integer>`或者`List<Integer>`是完全一样的，但是，注意到`List<? extends Integer>`的限制：

- 允许调用`get()`方法获取`Integer`的引用；
- 不允许调用`set(? extends Integer)`方法并传入任何`Integer`的引用（`null`除外）。

因此，方法参数类型`List<? extends Integer>`表明了该方法内部只会读取`List`的元素，不会修改`List`的元素（因为无法调用`add(? extends Integer)`、`remove(? extends Integer)`这些方法。换句话说，这是一个对参数`List<? extends Integer>`进行只读的方法（恶意调用`set(null)`除外）。

小结：

使用类似`<? extends Number>`通配符作为方法参数时表示：

- 方法内部可以调用获取`Number`引用的方法，例如：`Number n = obj.getFirst();`；
- 方法内部无法调用传入`Number`引用的方法（`null`除外），例如：`obj.setFirst(Number n);`。

即一句话总结：使用`extends`通配符表示可以读，不能写。

使用类似`<T extends Number>`定义泛型类时表示：

- 泛型类型限定为`Number`以及`Number`的子类。



### 6. 泛型 super 通配符

使用`<? super Integer>`通配符表示：

- 允许调用`set(? super Integer)`方法传入`Integer`的引用；
- 不允许调用`get()`方法获得`Integer`的引用。

唯一例外是可以获取`Object`的引用：`Object o = p.getFirst()`。

即使用`super`通配符表示只能写不能读。

##### 6.0.1. PECS 原则

使用`extends`和`super`通配符要遵循PECS原则，`Producer Extends Consumer Super`。

即：如果需要返回`T`，它是生产者（Producer），要使用`extends`通配符；如果需要写入`T`，它是消费者（Consumer），要使用`super`通配符。

以`Collections`的`copy()`方法为例：

```java
public class Collections {
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i); // src是producer
            dest.add(t); // dest是consumer
        }
    }
}
```

需要返回`T`的`src`是生产者，因此声明为`List<? extends T>`，需要写入`T`的`dest`是消费者，因此声明为`List<? super T>`。

##### 6.0.2. 无限定通配符`<?>`

无限定通配符`<?>`很少使用，可以用`<T>`替换，同时它是所有`<T>`类型的超类。

因为`<?>`通配符既没有`extends`，也没有`super`，因此：

- 不允许调用`set(T)`方法并传入引用（`null`除外）；
- 不允许调用`T get()`方法并获取`T`引用（只能获取`Object`引用）。

换句话说，既不能读，也不能写，那只能做一些`null`判断：

```java
static boolean isNull(Pair<?> p) {
    return p.getFirst() == null || p.getLast() == null;
}
```

### 7. 泛型和反射

Java的部分反射API也是泛型。例如：`Class<T>`就是泛型：

```java
// compile warning:
Class clazz = String.class;
String str = (String) clazz.newInstance();

// no warning:
Class<String> clazz = String.class;
String str = clazz.newInstance();
```

调用`Class`的`getSuperclass()`方法返回的`Class`类型是`Class<? super T>`：

```java
Class<? super String> sup = String.class.getSuperclass();
```

构造方法`Constructor<T>`也是泛型：

```java
Class<Integer> clazz = Integer.class;
Constructor<Integer> cons = clazz.getConstructor(int.class);
Integer i = cons.newInstance(123);
```

我们可以声明带泛型的数组，但不能用`new`操作符创建带泛型的数组：

```java
Pair<String>[] ps = null; // ok
Pair<String>[] ps = new Pair<String>[2]; // compile error!
```

必须通过强制转型实现带泛型的数组：

```java
@SuppressWarnings("unchecked")
Pair<String>[] ps = (Pair<String>[]) new Pair[2];
```

小结：

1. 部分反射API是泛型，例如：`Class<T>`，`Constructor<T>`；
2. 可以声明带泛型的数组，但不能直接创建带泛型的数组，必须强制转型；
3. 可以通过`Array.newInstance(Class<T>, int)`创建`T[]`数组，需要强制转型；
4. 同时使用泛型和可变参数时需要特别小心。