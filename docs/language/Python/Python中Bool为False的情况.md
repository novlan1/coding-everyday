## Python中Bool为False的情况

在python中，以下数值会被认为是False：

- **为0的数字，包括0，0.0**
- **空字符串，包括'', ""**
- **表示空值的None**
- **空集合，包括()，[]，{}**

其他的值都认为是True。

**None是python中的一个特殊值，表示什么都没有**，它和0、空字符、False、空集合都不一样。

**bool(‘False’)的结果是True，因为‘False’是一个不为空的字符串**，当被转换成bool类型之后，就得到True。

- **bool(‘ ’)的结果是True**，一个空格也不能算作空字符串。
- **bool(‘’)才是False**。

**对比js中为false的情况： null, false, NaN, undefined, 0, ''**

