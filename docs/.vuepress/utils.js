const fs = require('fs');
// 排除检查的文件
var excludes = ['.DS_Store']

function getFileName(rpath) {
  // console.log(rpath)
  let filenames = [];
  let fileTypes = /\.md$/; //只匹配以md结尾的文件

  fs.readdirSync(rpath).forEach(file => {
    if (excludes.indexOf(file) < 0 ) {
      fullpath = rpath+"/"+file
      var fileinfo = fs.statSync(fullpath)

      if(fileinfo.isFile()){
        if(fileTypes.test(file) && file !== ('README.md')) {
          if (file !== 'README.md') {
            filenames.push([replaceAbsolutePath(fullpath).replace('.md', ''), file.replace('.md', '')]);
          }
        }
      } else {
        const childrenInfo = {
          title: file
        }

        const children = getFileName(rpath + '/' + file);
        if (children && children.length) {
          childrenInfo.children = children;
        }

        if (isReadme(rpath, file)) {
          childrenInfo.path = replaceAbsolutePath(rpath + '/' + file)
        }
        if (childrenInfo.children) {
          filenames.push(childrenInfo)
        } else if (childrenInfo.path) {
          // 没有children的时候插入数组，而不是对象
          filenames.push([childrenInfo.path + '/', childrenInfo.title])
        }
      }
    }
  })
  filenames.sort(); // 排序
  return filenames;
}

function isReadme(rpath, file = '') {
  if(fs.existsSync(rpath + '/' + file + '/README.md')) {
    return true
  }
}

function genSidebar(
  title, 
  rpath,
  collapsable = true, 
  sidebarDepth = 2
) {
  const fullPath = process.cwd() +  rpath;

  const info = {
    title,
    children: getFileName(fullPath),
    collapsable,
    sidebarDepth
  }

  if (isReadme(fullPath, '')) {
    info.path = replaceAbsolutePath(fullPath);
  }

  return info;
}

function replaceAbsolutePath(rpath) {
  return rpath.replace(process.cwd() + '/docs', '')
}

module.exports = {
  getFileName,
  genSidebar
};