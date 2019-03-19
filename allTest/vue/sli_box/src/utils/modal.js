import iView from 'iview';

const info = (config) => {
  iView.Modal.info(config);
};

const success = (config) => {
  iView.Modal.success(config);
};

const warning = (config) => {
  iView.Modal.warning(config);
};

const confirm = (config) => {
  iView.Modal.confirm(config);
};

export {
  success,
  info,
  warning,
  confirm
};
