// 获取外部容器样式
const getWrapperClass = ({
  cardType, // 卡片类型
  cardStatus // 卡片状态
}) => {
  let classArray = [];
  // 卡类型判断
  if (cardType === 2) {
    classArray.push('blue');
  } else if (cardType === 1) {
    classArray.push('purple');
  }
  // 灰色
  if (cardStatus === 1) {
    classArray.push('gray');
  }
  // 灰色加盖章
  if (cardStatus === 2) {
    classArray = classArray.concat('gray', 'used-seal');
  }
  return classArray.join(' ');
};

export {
  getWrapperClass
};
