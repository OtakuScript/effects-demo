const ball = document.querySelector('.ball');

let moveDisX = 2;
let moveDisY = 2;

// 获取小球的宽高
const ballClientWidth = ball.clientWidth;
const ballClientHeight = ball.clientHeight;
// 获取视口的宽高
const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;

// 边界
const maxLeft = windowWidth - ballClientWidth;
const maxTop = windowHeight - ballClientHeight;

const getRandomInt = (min, max) => {
  max++; // 使结果可以包含最大值
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomColorRGB = () => {
  const r = getRandomInt(0, 256);
  const g = getRandomInt(0, 256);
  const b = getRandomInt(0, 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const changeBackground = () => {
  const angle = getRandomInt(0, 360);
  const color1 = getRandomColorRGB();
  const color2 = getRandomColorRGB();
  ball.style.background = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

function moveBall() {
  // 获取小球位置
  const { left, top } = ball.getBoundingClientRect();

  // 移动距离
  let x = left + moveDisX;
  let y = top + moveDisY;

  // 判断是否超出边界
  if (left > maxLeft) {
    x = maxLeft;
    moveDisX = -moveDisX;
    changeBackground();
  }
  if (top > maxTop) {
    y = maxTop;
    moveDisY = -moveDisY;
    changeBackground();
  }
  if (left < 0) {
    x = 0;
    moveDisX = -moveDisX;
    changeBackground();
  }
  if (top < 0) {
    y = 0;
    moveDisY = -moveDisY;
    changeBackground();
  }

  ball.style.transform = `translate(${x}px, ${y}px)`; // 移动小球
}

setInterval(moveBall, 10); // 每秒移动一次
