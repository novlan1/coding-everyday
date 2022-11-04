问题背景
表单参数中有单个字段（需要校验是否存在、是否合法），也有数组对象字段（数组中每个对象需要验证里面的属性是否存在，同时还有时间格式、数值区间格式、字符串格式的校验以及各种大小限制），需要在发 POST 请求前对所有参数做校验。

本文结尾有表单参数结构以及重构前大量的 if-else ，可以感受下，已经算很复杂的了。

调研阶段
从宏观方面来讲其实是简化 if-else 的复杂度，抽离出公共逻辑，对不同情况进行合理封装，提高代码可读性。所以我从多个渠道收集到对于 if-else 嵌套的解决方案，总结出如下：

lookup（查找表）
分离数据配置与业务逻辑，简单来说就是调用两者间的映射关系来实现需求，以银行信用的示例来说明：

function showGrace(grace,level,levelForGrace) {
    for(let i=0;i<level.length;i++){
        if(grace>=level[i]){
            return levelForGrace[i];
        }
    }
    //如果不存在，那么就是分数很低，返回最后一个
    return levelForGrace[levelForGrace.length-1];
}
let graceForLevel=[700,650,600,550];
let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
showGrace(696,graceForLevel,levelText) // "信用优秀"
优点：

摆脱了编写重复 if-else 的困境
相比较于 switch 更加灵活，可动态添加映射关系
缺点：

只适用于简单条件判断，无法解决嵌套的情况
策略模式
针对一组算法（策略），将每个算法（策略）分别封装在具有共同接口的独立类中，根据实际情况选择不同的策略完成任务。

以绩效等级和薪资计算奖金为说明：

let calculateBouns = (level,salary)=>{
    if(level=='A'){
        return salary * 1.4;
    }else if(level=='B'){
        return salary * 1.3;
    }else if(level=='C'){
        return salary * 1.2;
    }else{
        return salary;
    }
}
console.log(calculateBouns('A', 8000)); //11200
console.log(calculateBouns('C', 8000)); //9600

/*
*********** 重构后 ***********
*/
//策略对象
class ruleA{
    calculate(salary){
        return salary * 1.4;
    }
} 
class ruleB{
    calculate(salary){
        return salary * 1.3;
    }
} 
class ruleC{
    calculate(salary){
        return salary * 1.2;
    }
} 

//奖金类
class Bouns{
    constructor(){
        this.salary = null;
        this.level = null;
    }
    setLevel(level){
        this.level = level;
    }
    setSalary(salary){
        this.salary = salary;
    }
    getBouns(){
        return this.level.calculate(this.salary);
    }
}

let tom = new Bouns(),jerry = new Bouns();
//设置薪资
tom.setSalary(8000);
jerry.setSalary(10000);
//设置策略对象
tom.setLevel(new ruleA());
jerry.setLevel(new ruleA());
console.log(tom.getBouns()); //11200
console.log(jerry.getBouns()); //14000

jerry.setLevel(new ruleB());
console.log(jerry.getBouns()); //13000
当然还有一些组件库，如 Ant Design 的表单校验也是应用的这种模式，这里不细说了。

优点：

策略模式利用组合、委托等技术和思想，可以避免很多if条件语句
策略模式提供了开放-封闭原则，使代码更容易理解和拓展
缺点：

客户端必须知道所有的策略类，并自行决定使用哪一个策略类。
策略模式将产生很多策略类，导致对象数量增加。
应用场景：

如果在一个系统里面有许多类，它们之间的区别仅在于它们的行为，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为。
一个系统需要动态地在几种算法中选择一种。
不希望客户端知道复杂的、与算法相关的数据结构，在具体策略类中封装算法和相关的数据结构，提高算法的保密性与安全性。
状态机模式
一个状态对应一个行为，封装在一个类里，状态与状态间、行为与行为间彼此独立互不干扰，通过改变状态来改变不同的行为。

红绿灯示例：

var trafficLight = (function () {
  var currentLight = null;
  return {
    change: function (light) {
      currentLight = light;
      currentLight.go();
    }
  }
})();

function RedLight() { }
RedLight.prototype.go = function () {
  console.log("this is red light");
}

function GreenLight() { }
GreenLight.prototype.go = function () {
  console.log("this is green light");
}

function YellowLight() { }
YellowLight.prototype.go = function () {
  console.log("this is yellow light");
}

trafficLight.change(new RedLight());
trafficLight.change(new YellowLight());
优点：

一个状态对应一种行为，封装在一个类里，更直观清晰，增改方便
1. 状态与状态间，行为与行为间彼此独立互不干扰
2. 避免因事物对象本身不断膨胀而导致条件判断语句过多

缺点：

1. 需要将事物的不同状态以及对应的行为拆分出来，如果没有拆分标准，有时候会导致拆分得很细，造成过度设计，没有抽象概念，缺少公共行为的复用。
2. 必然会增加事物类和动作类的个数，有时候动作类再根据单一原则，按照功能拆成几个类，会反而使得代码混乱，可读性降低。

应用场景：

1. 一个由一个或多个动态变化的属性导致发生不同行为的对象，在与外部事件产生互动时，其内部状态就会改变，从而使得系统的行为也随之发生变化，那么这个对象，就是有状态的对象
2. 代码中包含大量与对象状态有关的条件语句，像是if else 或switch case 语句，且这些条件执行与否依赖于该对象的状态。

职责链模式

将能够处理同一类请求的对象连成一条链，对链上的对象进行逐一判断是否有能力处理该请求，如果能则就处理，如果不能，则传给链上的下一个对象，直到有一个对象处理它为止。

const rules = [
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  },
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  },
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  }
  // ...
]

function demo (a, b, c) {
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].match(a, b, c)) {
      return rules[i].action(a, b, c)
    }
  }
}
 应用场景：

每个 else-if 分支都包含了复杂的条件判断，且其对执行的先后顺序有所要求，最后仅进入其中一个
解决思路
对当前问题场景进行分析
参数结构无规律性（有单个对象，也有数组对象里面又嵌套了数组对象）
有 if 嵌套，根据条件字段进入不同的 if 语句（数值区间、相对时间、绝对时间）
对参数校验有先后顺序
验证一旦不通过则不进行下一步的校验
初步方案：职责链模式 + Promise
使用职责链对象把满足条件的校验方法动态存储在数组中，调用 execute 方法对数组进行遍历执行，一旦校验不通过则中断遍历，返回错误信息。

// 校验职责链对象
class ValidateChain {
    constructor() {
            this.chain = []
            this.condition = true
        }
        // if条件分支
    match(condition = true) {
            this.condition = condition
            return this
        }
        // 动态添加校验方法
    addValidator(validator) {
            if (!this.condition) return this
            this.chain.push(validator)
            return this
        }
        // 执行所有校验方法
    execute() {
        return new Promise((resolve, reject) => {
            for (let validator of this.chain) {
                const errMsg = validator()
                if (errMsg) {
                    reject(errMsg)
                }
            }
            resolve()
        })
    }
}

validateChain // 校验行为满足时间
    .match(behaviorTime.time_type === 'opp')
    .addValidator(() => isEmpty(behaviorTime.time_opp_cnt) && '请填写完行为满足时间！')
    .addValidator(() => !validateNoNegativeInt(behaviorTime.time_opp_cnt) && '行为满足时间只能为非负整数！')

...

for(let bes of behaviorEventSelects) {
    validateChain
        .match()
        .addValidator(() => !dataResourceSelects.find(el => el.data_resource_id == bes.data_resource_id) && '请确认行为满足中的事件所属数据源都被选中！')
        .addValidator(() => isSomeEmpty([bes.event_code, bes.op, bes.times]) && '请填写完行为满足事件！')
        .addValidator(() => !validateNoNegativeInt(bes.times) && '行为满足事件次数只能为非负整数！')

    const fieldSelects = bes.fieldSelects
    if (Array.isArray(fieldSelects)) {
        for (let el of fieldSelects) {
            validateChain
                .match()
                .addValidator(() => isSomeEmpty([el.field_key, el.op]) && '请填写行为满足字段！')
                .match(el.field_type === 'string') // 字段类型为string类型
                .addValidator(() => isEmpty(el.op_value) && !['-null', '-nnll'].includes(el.op) && '请填写完行为满足字段！')
                .match(el.field_type === 'number') // 字段类型为number类型
                ...
        }
    }
}
validateChain
    .execute()
    .then(() => {
        // 校验通过
    })
    .catch(errMsg => {
        // 校验失败
    })
})
 这个方案虽然让校验顺序更清晰，但是耦合度还是太强，不利于扩展。

解决方案：策略模式 + 职责链模式 + Promise
为什么不用状态机模式而用策略模式？

状态机模式旨在根据不同的状态触发不用的行为，而策略模式是由客户端自己决定调用哪些策略，从功能上说策略模式在目前场景下更适用。

策略模式扮演角色：
将表单区域分为多个策略对象，每个策略对象继承共同的祖先对象，祖先对象有公共的校验方法，每个策略对象将原先的 if 条件判断划分为多个校验方法，用 init 方法调用职责链对象，按顺序添加策略方法。
职责链模式扮演角色：
采用增量式链式调用，动态添加来自策略对象的策略方法。

// 公共策略对象
class BaseRule {
    // 校验空
    validateEmpty = (val, msg) => () => {
            return isEmpty(val) && msg
        }
        // 校验一定数量字段是否为空
    validateSomeEmpty = (val, msg) => () => {
            return isSomeEmpty(val) && msg
        }
        // 校验非负数
    validateNoNegative = (val, msg) => () => {
            return !isNoNegative(val) && msg
        }
        // 校验数值范围是否超出
    validateNumRange = (min, max, range, msg) => () => {
            return (parseFloat(min) <= range[0] || parseFloat(max) > range[1]) && msg
        }
        // 校验最小值是否小于最大值
    validateSize = (min, max, msg) => () => {
            return +min >= +max && msg
        }
        // 校验绝对时间大小
    validateStartTimeAndEndTime = (start, end, msg) => () => {
        return !moment(+start).isBefore(moment(+end)) && msg
    }
}
// 行为满足策略对象
class BehaviorEventRule extends BaseRule {
    constructor({
        selects, dataResourceSelects, time
    }, chain) {
        super()
        this.selects = selects
        this.dataResourceSelects = dataResourceSelects
        this.time = time
        this.chain = chain
        this.hasTimeMsg = '请填写完行为满足时间！'
        this.isStartTimeAndEndTimeMsg = '行为满足开始时间要小于结束时间！'
        this.isOppTimeNoNegativeMsg = '行为满足时间只能为非负整数！'
        this.hasDataResourceSelectedMsg = '请确认行为满足中的事件所属数据源都被选中！'
        this.isEventFilledMsg = '请填写完行为满足事件！'
        this.isEventTimeNoNegativeMsg = '行为满足事件次数只能为非负整数！'
        this.isFieldFilledMsg = '请填写完行为满足字段！'
        this.isOverNumRangeMsg = '行为满足字段超出数值范围！'
        this.isValidBetweenTimeMsg = '行为满足字段绝对时间非法！'
        this.isMinLessThanMaxMsg = '行为满足字段最小值应小于最大值！'
        this.isFieldStartTimeAndEndTimeMsg = '行为满足字段中开始时间要小于结束时间！'
    }

    // 校验事件所属事件源都被选中
    hasDataResourceSelects = event => () => {
            return !this.dataResourceSelects.find(el => el.data_resource_id == event.data_resource_id) && this.hasDataResourceSelectedMsg
        }
        // 校验string类型字段是否填写
    hasStringFieldFilled = field => () => {
            return isEmpty(field.op_value) && !['-null', '-nnll'].includes(field.op) && this.isFieldFilledMsg
        }
        // 校验绝对时间字段格式YYYY-MM-DD
    isValidBetweenTime = (startTime, endTime) => () => {
            return !(invalidDateTime('YYYY-MM-DD', startTime) && invalidDateTime('YYYY-MM-DD', endTime)) && this.isValidBetweenTimeMsg
        }
        // 规则初始化
    init() {
        // 校验相对时间和绝对时间
        this.chain
            .match(this.time.time_type === 'opp')
            .addValidator(this.validateEmpty(this.time.time_opp_cnt, this.hasTimeMsg))
            .addValidator(this.validateNoNegative(this.time.time_opp_cnt, this.isOppTimeNoNegativeMsg))
            .match(this.time.time_type === 'between')
            .addValidator(this.validateStartTimeAndEndTime(this.time.time_between_from, this.time.time_between_to, this.isStartTimeAndEndTimeMsg))

        for (let event of this.selects) {
            // 校验事件
            this.chain
                .match()
                .addValidator(this.hasDataResourceSelects(event))
                .addValidator(this.validateSomeEmpty([event.event_code, event.op, event.times], this.isEventFilledMsg))
                .addValidator(this.validateNoNegative(event.times, this.isEventTimeNoNegativeMsg))

            const fieldSelects = event.fieldSelects
            if (Array.isArray(fieldSelects)) {
                for (let field of fieldSelects) {
                    this.chain
                        .match()
                        .addValidator(this.validateSomeEmpty([field.field_key, field.op], this.isFieldFilledMsg))
                        .match(field.field_type === 'string')
                        .addValidator(this.hasStringFieldFilled(field))
                        ...
                }
            }
        }
    }
}

// 客户端调用
const validatorChain = new ValidateChain()
const behaviorEventRule = new BehaviorEventRule({
    selects: behaviorEventSelects,
    dataResourceSelects,
    time: behaviorTime
}, validatorChain)
behaviorEventRule.init()

validatorChain
    .execute()
    .then(() => {
        // 校验成功					
    })
    .catch(() => {
        // 校验失败				
    })
BaseRule 为公共策略对象，含公共校验方法，BehaviorEventRule为某个策略对象，含自身校验方法。

每个策略对象相对独立，互不影响，方便后面迭代维护、扩展，需求来了不再头痛！这就是重构的意义！

回顾下重构前的噩梦
需要校验参数结构：

{
    ...
    "data_resources": [
        {
            "data_resource_id": 259,
            "data_biz_type": "user_event",
            "data_resource_name": "音兔iOS"
        },
        {
            "data_resource_id": 213,
            "data_biz_type": "user_attribute",
            "data_resource_name": "集群导入用户属性类型"
        }
    ],
   ...
    "behavior_filter": {
        "time_type": "opp",
        "time_opp_cnt": 3,
        "time_opp_unit": "month",
        "ops": [],
        "behaviors": [
            {
                "event_code": "status_login_success",
                "event_name": "登录成功",
                "op": "-gt",
                "times": 3,
                "event_filter": [
                    {
                        "field_key": "event_time",
                        "field_type": "datetime",
                        "storage_field_type": "STRING",
                        "field_name": "时间",
                        "op": "between",
                        "op_value": "2018-12-20,2019-02-01",
                        "time_type": "between",
                        "time_opp_unit": "day",
                        "time_format": "yyyy-MM-dd HH🇲🇲ss"
                    },
                    {
                        "field_key": "package_size",
                        "field_type": "number",
                        "storage_field_type": "STRING",
                        "field_name": "包大小",
                        "op": "-btn",
                        "op_value": "10,50"
                    },
                    {
                        "field_key": "province",
                        "field_type": "string",
                        "storage_field_type": "STRING",
                        "field_name": "省份",
                        "op": "-is",
                        "op_value": "广东"
                    }
                ],
                "data_resource_id": 259
            }
        ]
    },
   ...
    "user_attribute_filter": {
        "ops": [
            "and"
        ],
        "atts": [
            {
                "field_key": "first_date",
                "field_type": null,
                "storage_field_type": "STRING",
                "field_name": "first_date",
                "op": null,
                "op_value": "2",
                "time_type": "opp",
                "time_between_from": null,
                "time_between_to": null,
                "time_opp_cnt": 2,
                "time_opp_unit": "day",
                "time_format": "yyyyMMddHHmmss",
                "data_resource_id": 213
            },
        ],
        "dmp_crowd_filter": []
    },
    "crowd_id": 1487
}
 重构前的部分代码：

if (dataResourceSelects.length > uniqEventSelects.length) {
    this.setState({
        errorModalVisible: true,
        errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
        errorMsg: '存在未选择事件或字段的事件源！',
    })
    return
}
// 校验dataResourceSelects
for (let s of dataResourceSelects) {
    if (!s.data_resource_id) {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '请填写完数据源！',
        })
        return
    }
}

// 校验behavior_filter
if (behaviorTime.time_type === 'opp') {
    if (behaviorTime.time_opp_cnt === '') {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '请填写完行为满足时间！',
        })
        return
    } else if (!validateNoNegativeInt(behaviorTime.time_opp_cnt)) {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '行为满足时间只能为非负整数！',
        })
        return
    }
}
if (behaviorEventSelects.length === 0) {
    this.setState({
        errorModalVisible: true,
        errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
        errorMsg: '行为满足必填！',
    })
    return
}
for (let bes of behaviorEventSelects) {
    if (!dataResourceSelects.find(el => el.data_resource_id == bes.data_resource_id)) {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '请确认行为满足中的事件所属数据源都被选中！',
        })
        return
    }
    if (!bes.event_code || !bes.op || bes.times === '') {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '请填写完行为满足事件！',
        })
        return
    }
    if (!validateNoNegativeInt(bes.times)) {
        this.setState({
            errorModalVisible: true,
            errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
            errorMsg: '行为满足事件次数只能为非负整数！',
        })
        return
    }
    const fieldSelects = bes.fieldSelects
    if (Array.isArray(fieldSelects)) {
        for (let el of fieldSelects) {
            if (!el.field_key || !el.op) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '请填写完行为满足字段！',
                })
                return
            }
            if (el.field_type === 'string' && !['-null', '-nnll'].includes(el.op) && el.op_value === '') {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '请填写完行为满足字段！',
                })
                return
            } else if (el.field_type === 'number' && el.op == '-btn' &&
                (el.op_value.split(',')[0] === '' || el.op_value.split(',')[1] === '')) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '请填写完行为满足字段！',
                })
                return
            } else if (el.field_type === 'number' && el.op !== '-btn' && el.op_value == '') {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '请填写完行为满足字段！',
                })
                return
            } else if (el.field_type === 'number' && el.op !== '-btn' && !validateRealNum(el.op_value)) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段数值只能为实数！',
                })
                return
            } else if (el.field_type === 'number' && el.op == '-btn' &&
                (!validateRealNum(el.op_value.split(',')[0]) || !validateRealNum(el.op_value.split(',')[1]))) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段数值只能为实数！',
                })
                return
            } else if (el.field_type === 'number' && el.op == '-btn' &&
                (parseInt(el.op_value.split(',')[0]) > parseInt(el.op_value.split(',')[1]))) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段最小值应小于等于最大值！',
                })
                return
            } else if (el.field_type === 'number' && el.op == '-btn' &&
                (parseInt(el.op_value.split(',')[0]) <= 0 || parseInt(el.op_value.split(',')[1]) > 100)) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段超出数值范围！',
                })
                return
            } else if (el.field_type === 'datetime' && el.time_type === 'between' && !(
                validateDateTime('YYYY-MM-DD', el.time_between_from) &&
                validateDateTime('YYYY-MM-DD', el.time_between_to))) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段绝对时间非法！',
                })
                return
            } else if (el.field_type === 'datetime' && el.time_type === 'between' && !moment(el.time_between_from).isBefore(el.time_between_to)) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段中开始时间要小于结束时间',
                })
                return
            } else if (el.field_type === 'datetime' && el.time_type === 'opp' && !el.time_opp_cnt) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段相对时间不能为空！',
                })
                return
            } else if (el.field_type === 'datetime' && el.time_type === 'opp' && !validateNoNegativeInt(el.time_opp_cnt)) {
                this.setState({
                    errorModalVisible: true,
                    errorTitle: actionType == MODE.MODIFY ? '保存失败' : '创建失败',
                    errorMsg: '行为满足字段相对时间只能为非负整数！',
                })
                return
            }
        }
    }
}
