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
  changeImg: $('.changeImg'),
  imgBox: $('.imgBox'),
  imgBlock: $('.imgBlock'), // 滑动块
  imgGap: $('.imgGap'), // 空缺块
  title: $('.imgContainer h3'),
  slider: $('.slider'),
  span: $('.slider span'),
  button: $('#btn'),
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

  let mousedownOffsetX = 0;

  const onMouseMove = e => {
    // 按钮的实时位置：
    // 鼠标的clientX - 滑轨的offsetLeft - 按钮的offsetX
    const mouseClientX = e.clientX;
    const sliderLeft = doms.slider.offsetLeft;
    const mouseX = mousedownOffsetX;

    let left = mouseClientX - sliderLeft - mouseX;

    if (left < -2) {
      left = 0;
    }
    if (left > doms.imgBox.offsetWidth - doms.imgBlock.offsetWidth) {
      left = doms.imgBox.offsetWidth - doms.imgBlock.offsetWidth;
    }
    doms.imgBlock.style.left = left + 'px';
    doms.button.style.left = left + 'px';
  };
  const onMouseDown = e => {
    doms.imgBlock.style.opacity = 1;
    doms.imgBlock.style.transition = 'none'; // 取消过渡动画，避免拖动时出现卡顿闪现的情况

    doms.title.style.color = '#f49747';
    doms.title.innerText = '请拖动图片完成验证';
    doms.span.style.opacity = 0;
    mousedownOffsetX = e.offsetX;

    doms.slider.addEventListener('mousemove', onMouseMove);
  };

  doms.button.addEventListener('mousedown', onMouseDown);
  doms.button.addEventListener('mouseup', () => {
    let diff = doms.imgBlock.offsetLeft - doms.imgGap.offsetLeft;

    if (diff > -5 && diff < 5) {
      doms.imgBlock.style.opacity = 0;
      doms.imgGap.style.opacity = 0;
      doms.title.style.color = 'green';
      doms.title.innerText = '验证成功';
    } else {
      doms.imgBlock.style.opacity = 0;
      doms.title.style.color = 'red';
      doms.title.innerText = '验证失败, 请重新拖动图片验证';
      doms.span.style.opacity = 1;
      doms.imgBlock.style.left = 0 + 'px';
      doms.button.style.left = 0 + 'px';
    }
    doms.button.removeEventListener('mousemove', onMouseMove);
    doms.slider.removeEventListener('mousemove', onMouseMove);
  });
  doms.changeImg.addEventListener('click', init);
}

init();
