const imgList = [
  '../assets/ASL.jpg',
  '../assets/kaido.jpg',
  '../assets/Legion1.png',
  '../assets/momo.jpg',
  '../assets/railgun.jpg',
  '../assets/ThounsandSunny.png',
  '../assets/railgun1.jpg',
];
function $(element) {
  return document.querySelector(element);
}

const doms = {
  carouselContainer: $('.carousel-container'),
  carouselList: $('.carousel-list'),
  indicator: $('.indicator'),
  arrowLeft: $('.arrow-left'),
  arrowRight: $('.arrow-right'),
};

let currentIndex = 0;

function init() {
  function createlList() {
    for (let i = 0; i < imgList.length; i++) {
      const img = document.createElement('img');
      img.src = imgList[i];
      img.classList.add('carousel-item');
      img.alt = 'carousel';
      doms.carouselList.appendChild(img);

      const div = document.createElement('div');
      div.classList.add('indicator-item');
      div.dataset.index = i;
      doms.indicator.appendChild(div);
    }
    const firstImg = doms.carouselList.firstElementChild.cloneNode(true);
    doms.carouselList.appendChild(firstImg);
  }

  createlList();
  setindicatorStatus(currentIndex);

  doms.carouselList.style.width = doms.carouselList.children.length + '00%';
}

function setindicatorStatus(curIndex) {
  for (let i = 0; i < doms.indicator.children.length; i++) {
    doms.indicator.children[i].classList.remove('active');
  }
  let index = curIndex % doms.indicator.children.length;
  doms.indicator.children[index].classList.add('active');
}

init();

let totalDuration = 500;
let duration = 10;
let isPlaying = false;
function move(index, onToLast) {
  if (isPlaying || index === currentIndex) {
    return;
  }
  isPlaying = true;
  let from = parseFloat(doms.carouselList.style.marginLeft) || 0;
  let to = -index * doms.carouselContainer.clientWidth;

  const onChange = value => {
    doms.carouselList.style.marginLeft = value + 'px';
  };
  const onEnd = () => {
    isPlaying = false;
    onToLast && onToLast();
  };

  createAnimation({
    from,
    to,
    totalDuration, // 动画总时长(ms)
    duration, // 动画时长(ms)
    onChange, // 动画变化回调
    onEnd, // 动画结束回调
  });

  currentIndex = index;
  setindicatorStatus(index);
}

function toPre() {
  let preIndex = currentIndex - 1;
  if (preIndex < 0) {
    let maxIndex = doms.carouselList.children.length - 1;
    doms.carouselList.style.marginLeft =
      -maxIndex * doms.carouselContainer.clientWidth + 'px';
    preIndex = maxIndex - 1;
  }
  move(preIndex);
}
function toNext() {
  let nextIndex = currentIndex + 1;
  let onToLast;
  if (nextIndex === doms.carouselList.children.length - 1) {
    onToLast = () => {
      doms.carouselList.style.marginLeft = 0;
      currentIndex = 0;
    };
  }
  move(nextIndex, onToLast);
}

doms.indicator.addEventListener('click', e => {
  console.log(e.target);
  if (e.target.tagName === 'DIV') {
    move(parseInt(e.target.dataset.index));
  }
});
doms.arrowLeft.addEventListener('click', toPre);
doms.arrowRight.addEventListener('click', toNext);

let carouselTimerId = null;
function autoStart() {
  if (carouselTimerId) {
    return;
  }
  carouselTimerId = setInterval(() => {
    toNext();
  }, 2000);
}
function autoStop() {
  clearInterval(carouselTimerId);
  carouselTimerId = null;
}

autoStart();
doms.carouselContainer.addEventListener('mouseenter', autoStop);
doms.carouselContainer.addEventListener('mouseleave', autoStart);
