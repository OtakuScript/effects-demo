/**
 * 生成26个大写字母A-Z的字符串
 * @returns {string} 26个大写字母A-Z的字符串
 * 大写字母A-Z的ASCII码值为65-90
 * 小写字母a-z的ASCII码值为97-122
 */
function generateAlphabetStringFromAToZ() {
  let result = '';
  for (let i = 65; i <= 90; i++) {
    result += String.fromCharCode(i);
  }
  return result;
}

/**
 * 将rgb格式转换为16进制(HEX)格式
 */
function turnRgbToHex(r, g, b) {
  return ((r << 16) | (g << 8) | b).toString(16);
}

/**
 * 生成随机整数
 * @param {number} min 最小值
 * @param {number} max 最大值(不包含)
 * @returns
 */
function getRandomInt(min, max) {
  max++; // 使结果可以包含最大值
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 生成随机长度的字符串
 * 字符串包含数字、字母
 * @param {number} length 字符串长度
 * @returns {string} 随机数字字母字符串
 */
function generateRandomNumberLetterString(length) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * 将日期转换为指定格式的字符串
 * @param {Date} date 日期
 * @param {string} format 格式
 * @returns {string} 日期字符串
 */
function formatDate(date, format) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const map = {
    YYYY: date.getFullYear().toString().padStart(4, '0'),
    MM: (date.getMonth() + 1).toString().padStart(2, '0'),
    DD: date.getDate().toString().padStart(2, '0'),
    HH: date.getHours().toString().padStart(2, '0'),
    mm: date.getMinutes().toString().padStart(2, '0'),
    ss: date.getSeconds(),
  };
  for (let key in map) {
    format = format.replace(key, map[key]);
  }
  return format;
}

/**
 * 计时器的执行销毁完整代码
 */
let timerId = null;
function start() {
  if (timerId) {
    return;
  }
  timerId = setInterval(() => {
    console.clear();
    console.log(new Date().toLocaleString());
  }, 1000);
}
function stop() {
  clearInterval(timerId);
  timerId = null;
}

/**
 * 创建动画
 * @param {number} from 起始值
 * @param {number} to 结束值
 * @param {number} totalDuration 动画总时长(ms)
 * @param {number} duration 动画时长(ms)
 * @param {function} onChange 动画变化回调
 * @param {function} onEnd 动画结束回调
 */
function createAnimation(options) {
  let from = options.from;
  let to = options.to;
  let totalDuration = options.totalDuration;
  let duration = options.duration;

  let currentTime = 0; // 当前变化次数
  let totalTimes = Math.floor(totalDuration / duration); // 总变化次数
  let dis = (to - from) / totalTimes; // 每次变化的值

  let timerId = setInterval(() => {
    from += dis;
    currentTime++;
    options.onChange && options.onChange(from);
    if (currentTime >= totalTimes) {
      from = to;
      options.onEnd && options.onEnd(from);
      clearInterval(timerId);
    }
  }, duration);
}
