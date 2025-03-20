const imgList = [
  './images/0.jpg',
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg',
  './images/6.jpg',
  './images/7.jpg',
  './images/8.jpg',
];

function $(s) {
  return document.querySelector(s);
}

const doms = {
  imgBox: $('.imgBox'),
  imgBlock: $('.imgBlock'), // 滑动块
  imgGap: $('.imgGap'), // 空缺块
  title: $('.imgContainer h3'),
  slider: $('.slider'),
  spans: $('.slider span'),
  buttons: $('#btn'),
};

function init() {
  const randomNum = getRandomInt(0, imgList.length - 1);
  const imgUrl = imgList[randomNum];
  doms.imgBox.style.backgroundImage = `url(${imgUrl})`;
  doms.imgBlock.style.backgroundImage = `url(${imgUrl})`;

  // 计算滑动块和空缺块的随机位置
  const maxTop = doms.imgBox.offsetHeight - doms.imgGap.offsetHeight;
  const maxLeft = doms.imgBox.offsetWidth - doms.imgGap.offsetWidth;
  const top = getRandomInt(0, maxTop);
  const left = getRandomInt(doms.imgBox.offsetWidth / 2, maxLeft);
  doms.imgGap.style.top = top + 'px';
  doms.imgGap.style.left = left + 'px';
  doms.imgBlock.style.top = top + 'px';
  doms.imgBlock.style.left = 0 + 'px';
  doms.imgBlock.style.backgroundPosition = `-${left}px -${top}px`;
}

init();
