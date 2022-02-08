
function loadScript(src) {
  // 下面代码主要是根据chunkId加载对应的script脚本
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');

  script.charset = 'utf-8';
  script.timeout = 120;

  // jsonpScriptSrc方法会根据传入的chunkId返回对应的文件路径
  script.src = src;

  const onScriptComplete = function () {
    script.onerror = null;
    script.onload = null;
    console.log('onScriptComplete');
    // const chunk = installedChunks[chunkId];
    // if (chunk !== 0) {
    //   if (chunk) {
    //     const errorType = event && (event.type === 'load' ? 'missing' : event.type);
    //     const realSrc = event && event.target && event.target.src;
    //     const error = new Error(`Loading chunk ${chunkId} failed.\n(${errorType}: ${realSrc})`);
    //     error.type = errorType;
    //     error.request = realSrc;
    //     chunk[1](error);
    //   }
    //   installedChunks[chunkId] = undefined;
    // }
  };
  // var timeout = setTimeout(() =>  {
  //   onScriptComplete({ type: 'timeout', target: script });
  // }, 120000);
  script.onerror = onScriptComplete;
  script.onload = onScriptComplete;
  head.appendChild(script);
}

loadScript('./test3.js');
