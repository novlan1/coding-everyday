function debounce(fn, time) {
  let timer = null;

  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(null, [...arguments])
    }, time)
  }
}

function throttle(fn, time) {
  let timer = null

  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(null, args)
      }, time)
    }
  }
}


function count() {
  console.log('xxxx')
}

window.onscroll = debounce(count, 1000)
window.onscroll = throttle(count, 1000)

