/**
 * 将`毫秒数`格式化成`时分秒`
 * @param time number 毫秒
 * @return hh:dd:ss string
 */
export function dateCount(time) {
  const hour = Math.floor((time / 3600000) % 24);
  const minute = Math.floor((time / 60000) % 60);
  const second = Math.floor((time / 1000) % 60);
  return `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}

/**
 * 根据时间戳 返回时间
 * @param date format
 * @return string
 */
export function dateFormat(date, format) {
  if (!format || typeof format !== "string") {
    console.error("format is undefiend or type is Error");
    return "";
  }
  date =    date instanceof Date
      ? date
      : typeof date === "number" || typeof date === "string"
      ? new Date(date)
      : new Date();
  // 解析
  const formatReg = {
    "y+": date.getFullYear(),
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (const reg in formatReg) {
    if (new RegExp(reg).test(format)) {
      const match = RegExp.lastMatch; // 关键，lastMatch

      format = format.replace(
        match,
        formatReg[reg] < 10 ? `0${formatReg[reg]}` : formatReg[reg].toString()
      );
      console.log(match, RegExp, format);
    }
  }
  return format;
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
    `${(Math.random() * 10000000).toString(16).substr(0, 4)
    }-${
    new Date().getTime()
    }-${
    Math.random().toString().substr(2, 5)}`
  );
}
