// 获取domain
function getDomain() {
  const { host } = location;
  const list = host.split('.');
  return list.slice(list.length - 3, list.length).join('.');
}

// 设置单个cookie
function setCookie(name, value, domain, hours = 1) {
  const date = new Date();
  const expiresDays = hours;
  date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;domain=${domain}`;
}

// 写入cookie到domain
function writeToCookie(cookie, domain) {
  const a = cookie.split('; ');
  const d = a.reduce((c, item) => {
    const index = item.indexOf('=');
    const key = item.slice(0, index);
    const value = item.slice(index + 1);

    c[key] = value;
    return c;
  }, {});

  Object.keys(d).map((item) => {
    setCookie(item, d[item], domain);
  });
}

// 写入cookie
function writeAllCookie(cookie, domain) {
  if (!cookie) return;
  try {
    if (!domain) {
      domain = getDomain();
    }
    writeToCookie(cookie, domain);
  } catch (err) {
    console.log('err', err);
  }
}