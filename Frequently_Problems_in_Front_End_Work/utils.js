/**
 * 将`毫秒数`格式化成`时分秒`
 * @param time number 毫秒
 * @return hh:dd:ss string
 */
export function dateCount(time: number) {
  var hour = Math.floor((time / 3600000) % 24);
  var minute = Math.floor((time / 60000) % 60);
  var second = Math.floor((time / 1000) % 60);
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }:${second < 10 ? "0" + second : second}`;
}

export function encodeBase64(str) {
  return btoa(encodeURIComponent(str));
}

export function decodeBase64(str) {
  return atob(decodeURIComponent(str));
}

/**
 * 生成不重复ID
 */

export function createRandomId() {
  return (
    (Math.random() * 10000000).toString(16).substr(0, 4) +
    "-" +
    new Date().getTime() +
    "-" +
    Math.random().toString().substr(2, 5)
  );
}
