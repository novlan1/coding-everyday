// console.log('1')
// setTimeout(() => {
//   console.log('2')
  
  
//   new Promise((resolve) => {
//     console.log('4')
//     resolve()
//   }).then(() => {
//     console.log('5')
//   })
//   process.nextTick(() => {
//     console.log('3')
//   })
// })

// process.nextTick(() => {
//   console.log('6')
// })
// new Promise((resolve) => {
//   console.log('7')
//   resolve()
// }).then(() => {
//   console.log('8')
// })

// setTimeout(() => {
//   console.log('9')
  
  
//   new Promise((resolve) => {
//     console.log('11')
//     resolve()
//   }).then(() => {
//     console.log('12')
//   })

//   process.nextTick(() => {
//     console.log('10')
//   })
// })


setTimeout(function() {
    console.log(1)
  }, 0);
  
  new Promise(function(resolve, reject) {
    console.log(2);
    resolve();
  }).then(function() {
    console.log(3)
  }).then(function() {
    console.log(4)
  });
   
  process.nextTick(function(){
    console.log(5)
  });
   
  console.log(6);