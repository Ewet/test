import axios from 'axios';
import qs from 'qs';
import config from './config';
import {
  jumpLogin
} from 'utils/jump';
import {
  getItem
} from 'utils/cache';
import {
  TOKEN,
  SESSION_ID
} from 'const/cacheKey';
import { Object } from 'core-js';
/**
 * 格式化status
 */
const formatStatus = response => {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  let txt = '网络异常';
  if (!response) {
    txt = '通信错误';
  } else if (response.status === 500) {
    txt = '服务器错误';
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: txt,
    request: response.request || {}
  };
};

/**
 * 格式化code
 *
 */
const formatCode = ({
  status,
  data,
  msg
}) => {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (status === -404) {
    return {
      code: status,
      success: false,
      msg: msg,
      data: {}
    };
  }
  // api内置错误类型
  if (data && !data.success) {
    let msg = data.message;
    if (data.statusCode === 500) {
      msg = '内部服务器错误';
    }
    return {
      success: false,
      msg,
      code: data.statusCode,
      errorObj: data.error,
      data: data.data
    };
  }
  return {
    success: true,
    msg: data.message,
    code: data.statusCode,
    data: data.data
  };
};

// 处理网络通信错误
const handleNetworkError = error => {
  if (typeof (error.message) === 'string') {
    if (error.message === 'Network Error' || error.message.includes('500')) {
      return {
        code: 500,
        success: false,
        msg: '通信错误',
        data: {}
      };
    } else if (error.message.includes('timeout')) {
      return {
        code: 1,
        success: false,
        msg: '通信超时',
        data: {}
      };
    } else if (error.message.includes('404')) {
      return {
        code: 1,
        success: false,
        msg: '通信失败',
        data: {}
      };
    } else {
      return {
        code: error.statusCode || -1,
        success: false,
        msg: error.message || '',
        data: {}
      };
    }
  } else {
    return {
      code: -1,
      success: false,
      msg: '',
      data: {}
    };
  }
};

/**
 * 打印api信息
 * @param {api地址} url
 * @param {api参数} data
 */
const printApiInfo = (url, data) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n\n');
    console.group('---------------开始发送API请求------------');
    console.log('API基础地址', config.baseURL);
    console.log('API请求地址', url);
    let temp = Object.keys(data);
    if (temp.length) {
      console.group('API请求参数');
      temp.forEach(x => {
        console.log(`${x} = ${data[x]}`);
      });
      console.groupEnd();
    }
    console.log('\n\n');
    console.groupEnd();
  }
};

/**
 * 设置全局参数
 */
axios.defaults.baseURL = config.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.timeout = config.timeout;

// 请求队列
const queue = [];
// axios内置的中断ajax的方法
const CancelToken = axios.CancelToken;
// 拼接请求的url和方法，同样的url+方法可以视为相同的请求
const queueKey = ({
  url,
  method,
  data
}) => {
  data = data || {};
  return `${url}_${method}`;
};

// 中断重复的请求，并从队列中移除
const removeQueue = (config) => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i];
    if (task && task.queueKey === queueKey(config)) {
      task.cancel();
      queue.splice(i, 1);
    }
  }
};

/**
 * 请求前前置处理
 */
axios.interceptors.request.use(config => {
  let sessionId = getItem(SESSION_ID);
  let token = getItem(TOKEN);
  // 设置token
  if (token) {
    config.headers['X-Token'] = token;
  }
  // 设置sessionId
  if (sessionId) {
    config.headers['X-Session-Id'] = sessionId;
  }
  // 当例子请求关键字
  if (config.data && config.data['__single_case']) {
    removeQueue(config); // 中断之前的同名请求
  }
  if (['post', 'put'].includes(config.method) &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
    config.data = qs.stringify(config.data);
  }
  // 添加cancelToken
  config.cancelToken = new CancelToken((c) => {
    queue.push({
      queueKey: queueKey(config),
      cancel: c
    });
  });
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 请求返回数据后统一处理
 */
axios.interceptors.response.use(response => {
  // 在请求完成后，自动移出队列
  removeQueue(response.config);
  // 401未授权并且非登录页
  if (response.data.success === false &&
    response.data.statusCode === 401) {
    jumpLogin();
    return Promise.reject(response.data);
  }
  return response;
}, error => {
  console.log('错误 response', error);
  return Promise.reject(error);
});

/**
 * 处理response
 * @param {axios请求结果} fetchResult
 */
const formatResponse = fetchResult => {
  return fetchResult
    .then(response => formatStatus(response))
    .then(res => formatCode(res), handleNetworkError);
};

// 预处理配置文件
const pretreatConfig = _config => {
  if (_config && 'dataType' in _config) {
    if (_config.dataType === 'json') {
      Object.assign(_config, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }});
    } else if (_config.dataType === 'formdata') {
      Object.assign(_config, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }});
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
  _config &&
  'mock' in _config &&
  _config.mock
  ) {
    Object.assign(_config, {
      baseURL: config.mockURL
    });
  }
  console.log(_config);
  return _config;
};

const get = (url, data = {}, config) => {
  config = pretreatConfig(config);
  printApiInfo(url, data);
  return formatResponse(axios.get(url, { ...config,
    params: data,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'brackets' });
    }
  }));
};

const del = (url, data = {}, config) => {
  config = pretreatConfig(config);
  printApiInfo(url, data);
  return formatResponse(axios.delete(url, { ...config,
    params: data
  }));
};

const post = (url, data = {}, config) => {
  config = pretreatConfig(config);
  printApiInfo(url, data);
  config = Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, config);
  return formatResponse(axios.post(url, data, config));
};

const put = (url, data = {}, config) => {
  config = pretreatConfig(config);
  printApiInfo(url, data);
  config = Object.assign({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }, config);
  return formatResponse(axios.put(url, data, config));
};

const download = (url, params) => {
  location.href = config.baseURL + url + '?' + qs.stringify(params);
};

const jsonp = (url, params) => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!');
    return;
  }
  url = config.baseURL + url + '?' + qs.stringify(params);
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result) => {
      console.log('jsonCallBack', result);
      resolve(result);
    };
    var JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};

export default {
  get,
  post,
  del,
  put,
  download,
  jsonp
};
