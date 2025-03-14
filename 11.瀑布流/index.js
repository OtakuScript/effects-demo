const imgList = [
  './images/佐藤美和子.jpg',
  './images/兰.jpg',
  './images/博士.jpg',
  './images/基安蒂.jpg',
  './images/妃英理.jpg',
  './images/安室透.jpeg',
  './images/工藤优作.jpg',
  './images/工藤有希子.jpg',
  './images/怪盗基德.jpg',
  './images/服部平次.jpg',
  './images/柯南.jpg',
  './images/步美.jpg',
  './images/毛利小五郎.jpg',
  './images/灰原哀.jpg',
  './images/目暮十三.jpg',
  './images/贝尔摩德.jpg',
  './images/赤井秀一.jpg',
  './images/远山和叶.jpg',
  './images/铃木园子.jpg',
];
let waterfallList = [];
function createWaterfallList() {
  // 修正拼写错误 createt -> create
  // Fisher-Yates 洗牌算法
  const shuffleArray = imgList => {
    const arr = [...imgList];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // 创建4个随机排序的副本
  return [
    ...shuffleArray(imgList),
    ...shuffleArray(imgList),
    ...shuffleArray(imgList),
    ...shuffleArray(imgList),
  ];
  // return shuffleArray(imgList);
}
waterfallList = createWaterfallList();

const container = document.querySelector('.container');
const imgWidth = 220;
const imagesList = [];

function caculateColumn() {
  const container = document.querySelector('.container');
  const containerWidth = container.clientWidth;
  const columns = Math.floor(containerWidth / imgWidth);
  const gap = (containerWidth - columns * imgWidth) / (columns + 1);

  return (info = {
    columns,
    gap,
  });
}

function setImgPosition() {
  // 计算每行的图片数量
  const info = caculateColumn();
  const arr = new Array(info.columns).fill(0);
  for (let i = 0; i < imagesList.length; i++) {
    const img = imagesList[i];
    const minTop = Math.min.apply(null, arr);
    const minIndex = arr.indexOf(minTop);
    const left = (minIndex + 1) * info.gap + minIndex * imgWidth;
    const maTop = Math.max.apply(null, arr);

    img.style.top = minTop + info.gap + 'px';
    img.style.left = left + 'px';
    container.style.height = maTop + info.gap + 'px';
    arr[minIndex] += img.offsetHeight + info.gap;
  }
}

function createImgs() {
  // 创建img元素
  for (let i = 0; i < waterfallList.length; i++) {
    const img = document.createElement('img');
    img.src = waterfallList[i];
    img.style.width = imgWidth + 'px';
    imagesList.push(img);
    img.onload = setImgPosition;
    container.appendChild(img);
  }
}

function init() {
  createImgs();
  window.onresize = debounce(setImgPosition, 300);
}

init();
