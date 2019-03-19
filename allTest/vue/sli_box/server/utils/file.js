const path = require('path');
const fs = require('fs');

// path参数是文件的路径，返回一个Promise对象
function readFileByPromise (path) {
  // 显示返回一个Promise对象
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const getFileByUrl = async ({url, filename}) => {
  let index = url.indexOf('?');
  if (index !== -1) {
    url = url.slice(0, index);
  }
  let temp = url.split('/');
  if (filename) {
    temp.push(filename);
  }
  if (temp.length > 1) {
    temp = `../mock/${temp.join('/')}.json`;
  } else {
    temp = `../mock/${temp[0]}.json`;
  }
  let data = await readFileByPromise(path.join(`${__dirname}`, temp));
  return data;
};

module.exports = {
  readFileByPromise,
  getFileByUrl
};
