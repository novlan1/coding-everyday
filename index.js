


// const timeout = (time) => new Promise(resolve => {
//   setTimeout(resolve, time)
// })

// const scheduler = new Scheduler()
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time)).then(() => console.log(order))
// }

// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')



// // function Scheduler(){
// //   this.list=[]
// //   this.add=function(promiseCreator){
// //      this.list.push(promiseCreator)
// //   }

// //   this.maxCount=2;


// //   var tempRunIndex=0;

// //   this.taskStart=function(){
// //      for(var i =0 ;i<this.maxCount;i++){
// //          request.bind(this)()
// //      }
// //   }

// //   function request(){

// //       if(!this.list || !this.list.length || tempRunIndex>=this.maxCount){
// //           return
// //       }

// //       tempRunIndex++
// //       this.list.shift()().then(()=>{
// //           tempRunIndex--
// //           request.bind(this)()
// //       })
// //   }
// // }

// // function timeout(time){
// //   return new Promise(resolve=>{
// //       setTimeout(resolve,time)
// //   })
// // }

// // var scheduler = new Scheduler()

// // function addTask(time,order){
// //   scheduler.add(()=>timeout(time).then(()=>console.log(order)))
// // }


// // addTask(1000,1)
// // addTask(500,2)
// // addTask(300,3)
// // addTask(400,4)

// // scheduler.taskStart()



let menu = [
  { "Id": 1, "ParentId": null, "Sort": 0, "Name": "菜单1" },
  { "Id": 2, "ParentId": 1, "Sort": 0, "Name": "菜单1-1" },
  { "Id": 3, "ParentId": 1, "Sort": 1, "Name": "菜单1-2" },
  { "Id": 4, "ParentId": 2, "Sort": 2, "Name": "菜单1-1-2" },
  { "Id": 5, "ParentId": 2, "Sort": 1, "Name": "菜单1-1-1" },
  { "Id": 6, "ParentId": null, "Sort": 1, "Name": "菜单2" },
  { "Id": 7, "ParentId": 6, "Sort": 0, "Name": "菜单2-1" },
  { "Id": 8, "ParentId": 6, "Sort": 1, "Name": "菜单2-2" },
  { "Id": 9, "ParentId": 8, "Sort": 2, "Name": "菜单2-2-2" },
  { "Id": 10, "ParentId": 8, "Sort": 1, "Name": "菜单2-2-1" },
  { "Id": 11, "ParentId": 10, "Sort": 0, "Name": "菜单2-2-1-1" }
]


// function getTotal(menu) {
//   return menu.reduce((acc, item) => {
//     if (item.ParentId) {
//       helper(acc, item)
//     } else{
//       acc.push(item)
//     }
//     return acc
//   }, [])
// }

// function helper(acc, item) {
//   if (!acc) return
//   for (let obj of acc) {
//     if (obj.Id === item.ParentId) {
//       obj.children = obj.children || []
//       obj.children.push(item)
//       obj.children.sort((a, b) => a.Sort - b.Sort)
//     }
//     helper(obj.children, item)
//   }
// }

// function generateMenuHtml() {
//   const newData = getTotal(menu)
//   // console.log(JSON.stringify(newData))
//   const res =  newData.map(item => getItemHtml(item)).join('')
//   console.log(res)
// }
// function getItemHtml(item) {
//   return `
//     <ul>
//      <li>
//        <a>${item.Name}</a>
//        ${item.children ? item.children.map(it => getItemHtml(it)).join('') : ''}
//      </li>
//     </ul>
//   `
// }

// generateMenuHtml(menu)


function split(arr) {
  // implement
  const len = arr.length
  if (len < 3) return false

  let sum = 0

  for (let item of arr) {
    sum += item
  }
  console.log(sum)
  if (sum % 3) {
    return false
  }

  let s = 0
  let flag = 0
  for (let item of arr) {
    s += item
    if (s == sum / 3) {
      flag += 1
      s = 0
    }
  }
  console.log(flag)
  if (flag && flag % 3 === 0) return true
  return false
}

// const arr = [0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]
const arr = [0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]
// const arr = [3, 3, 6, 5, -2, 2, 5, 1, -9, 4]
const res = split(arr)
console.log(res)


let menu = [
  { "Id": 1, "ParentId": null, "Sort": 0, "Name": "菜单1" },
  { "Id": 2, "ParentId": 1,    "Sort": 0, "Name": "菜单1-1"},
  { "Id": 3, "ParentId": 1,    "Sort": 1, "Name": "菜单1-2"},
  { "Id": 4, "ParentId": 2,    "Sort": 2, "Name": "菜单1-1-2"},
  { "Id": 5, "ParentId": 2,    "Sort": 1, "Name": "菜单1-1-1"},
  { "Id": 6, "ParentId": null, "Sort": 1, "Name": "菜单2" },
  { "Id": 7, "ParentId": 6,    "Sort": 0, "Name": "菜单2-1"},
  { "Id": 8, "ParentId": 6,    "Sort": 1, "Name": "菜单2-2"},
  { "Id": 9, "ParentId": 8,    "Sort": 2, "Name": "菜单2-2-2"},
  { "Id": 10, "ParentId": 8,   "Sort": 1, "Name": "菜单2-2-1"},
  { "Id": 11, "ParentId": 10,  "Sort": 0, "Name": "菜单2-2-1-1"}
]
// 写一个通用算法将以上数组结构转换为以下菜单结构

// <ul>
// <li>
//     <a>菜单1<a>
//     <ul>
//       // 子菜单节点
//   </ul>
// </li>
// // 其他节点
// </ul>