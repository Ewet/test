import fecha from 'fecha';

const perDayMilliseconds = 24 * 60 * 60 * 1000;
const perWeekMilliseconds = 7 * perDayMilliseconds;
/**
 * 获取当前时间的上一周时间
 * param {format}     日期格式 ymd, ymd-hms, hms
 * param {returnType} 返回类型 number, string, date
 */
const getLastWeek = ({
  format,
  returnType
} = {
  format: 'ymd-hms',
  returnType: 'date'
}) => {
  const now = new Date().getTime();
  const timeDifference = now - perWeekMilliseconds;
  if (returnType === 'number') {
    return [timeDifference, now];
  } if (returnType === 'string') {
    return [formatTime(timeDifference, format), formatTime(now, format)];
  } if (returnType === 'date') {
    return [new Date(timeDifference), new Date(now)];
  }
};

// 获取当前时间的下一周时间
const getNextWeek = ({
  format,
  returnType
} = {
  format: 'ymd-hms',
  returnType: 'date'
}) => {
  const now = new Date().getTime();
  const timeDifference = now + perWeekMilliseconds;
  if (returnType === 'number') {
    return [now, timeDifference];
  } if (returnType === 'string') {
    return [formatTime(now, format), formatTime(timeDifference, format)];
  } if (returnType === 'date') {
    return [new Date(now), new Date(timeDifference)];
  }
};

// 格式化时间
const formatItemTime = (data, format = 'ymd-hms') => {
  // console.log('formatTime', data);
  // 转换毫秒数
  if (data instanceof Date) {
    data = new Date(data.getTime());
  } else if (typeof data === 'string') {
    data = new Date(data);
  } else if (typeof data === 'number') {
    data = new Date(data);
  }
  let temp = '';
  switch (format) {
    case 'ym':
      temp = fecha.format(data, 'YYYY-MM');
      break;
    case 'ymd':
      temp = fecha.format(data, 'YYYY-MM-DD');
      break;
    case 'hms':
      temp = fecha.format(data, 'HH:mm:ss');
      break;
    case 'ymd-hms':
      temp = fecha.format(data, 'YYYY-MM-DD HH:mm:ss');
      break;
    default:
      temp = fecha.format(data, 'YYYY-MM-DD HH:mm:ss');
      break;
  }
  return temp;
};

/**
 * 上周零点
 */
const getZeroTimeLastWeek = () => {
  const [start, end] = getLastWeek();
  return [`${formatTime(start, 'ymd')} 00:00:00`,
    `${formatTime(+end + perDayMilliseconds, 'ymd')} 00:00:00`
  ];
};

/**
 * 下周零点
 */
const getZeroTimeNextWeek = () => {
  const [start, end] = getNextWeek();
  return [`${formatTime(start, 'ymd')} 00:00:00`,
    `${formatTime(+end + perDayMilliseconds, 'ymd')} 00:00:00`
  ];
};
const formatTime = (data, format = 'ymd-hms') => {
  if (Array.isArray(data)) {
    let startTime = '';
    let endTime = '';
    if (data.length && data.every(x => !!x) > 0) {
      startTime = formatItemTime(data[0], format);
      endTime = formatItemTime(data[1], format);
    }
    return [startTime, endTime];
  }
  return formatItemTime(data, format);
};

export {
  getLastWeek,
  getNextWeek,
  formatTime,
  getZeroTimeLastWeek,
  getZeroTimeNextWeek
};
