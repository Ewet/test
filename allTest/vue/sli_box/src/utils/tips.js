import iView from 'iview';

const success = (msg) => {
  iView.Message.success(msg);
};
const error = (msg) => {
  if (msg) {
    // if (typeof (msg) === 'string') {
    //   msg = '自定义错误' + msg;
    // }
    iView.Message.error(msg);
  }
};
const warning = (msg) => {
  iView.Message.warning(msg);
};

export default {
  success,
  error,
  warning
};
