const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').js_beautify;
const config = require('./config');
const templatePath = path.join(__dirname, config.templatesDir)
const iconsRender = getRender('icons.js')

/**
 * 读取模板渲染函数
 * @param file
 */
function getRender(file) {
  return require(path.join(templatePath, file))
}

function writeIconData() {
  // iconfont icon
  let content = fs.readFileSync(path.join(__dirname, config.iconCssFile), { encoding: 'utf-8' });
  let regex = /.icon-[\w-_]+:/g;
  let matches = content.match(regex);
  const items = matches.map(function (item) {
    return item.replace('.icon-', 'icon-').replace(':', '')
  });

  // element-ui icon
  const elIconCssFile = config.elIconCssFile || '../node_modules/element-ui/packages/theme-chalk/lib/icon.css';
  content = fs.readFileSync(path.join(__dirname, elIconCssFile), { encoding: 'utf-8' });
  regex = /.el-icon-[\w-_]+:/g;
  matches = content.match(regex);
  const elItems = matches.map(function (item) {
    return item.replace('.el-', 'el-').replace(':', '')
  });

  const fileContent = iconsRender({ data: stringify([...items, ...elItems]) })
  try {
    fs.unlinkSync(path.join(__dirname, config.outIconFile));
    console.log('已成功删除文件');
    fs.writeFileSync(path.join(__dirname, config.outIconFile), beautifyJs(fileContent), {
      encoding: 'utf-8'
    })
    console.log('文件生成成功');
  } catch (err) {
    fs.writeFileSync(path.join(__dirname, config.outIconFile), beautifyJs(fileContent), {
      encoding: 'utf-8'
    })
    console.log('文件生成成功');
  }
}

/**
 * JSON转换成字符串，并把双引号转换成单引号
 * @param json
 */
function stringify(json) {
  let str = JSON.stringify(json)
  return str ? str.replace(/'/g, '\\\'').replace(/"/g, '\'') : ''
}

/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs(content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')

  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true
  })
}

/**
 * 执行函数
 */
writeIconData()

// /**
//  * 修复 node_modules 源码的bug
//  */
// const fs = require('fs');
// const SOCK_FILE = 'node_modules/sockjs-client/dist/sockjs.js';

// (function fixsockjs() {
//     try {
//         let content = fs.readFileSync(SOCK_FILE, 'utf-8')
//         if (content.includes('/*flag*/')) {
//             return
//         }
//         const flag = 'self.xhr.send(payload);'
//         const index = content.indexOf(flag)
//         if (index > 0) {
//             content = content.replace(flag, `/*flag*/`)
//             fs.writeFileSync(SOCK_FILE, content, 'utf-8')
//         } else {
//         }
//     } catch (e) {
//     }
// }())
