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
console.log(imgList);
console.log(waterfallList);

const container = document.querySelector(".container");
const imgWidth = 220;
const columns = [];
let gap = 1;

function caculateColumn() {
  const container = document.querySelector(".container");
  const containerWidth = container.clientWidth;
  const perRowCount = Math.floor(containerWidth / imgWidth);

  for (let i = 0; i < perRowCount; i++) {
    columns.push(0);
  }

  gap = (containerWidth - perRowCount * imgWidth) / perRowCount;
}

function setImgPosition(img) {
  const imgHeight = img.clientHeight;
  const minColumnIndex = columns.indexOf(Math.min.apply(null, columns));

  let left;
  let top;

  if (minColumnIndex === 0) {
    left = imgWidth + gap;
  } else {
    left = (imgWidth + gap) * minColumnIndex + gap;
  }
  top = columns[minColumnIndex] + gap;
  columns[minColumnIndex] += top;
  img.style.position = "absolute";
  img.style.left = left + "px";
  img.style.top = top + "px";
}

function createImg() {
  // 创建img元素
  for (let i = 0; i < waterfallList.length; i++) {
    const img = document.createElement("img");
    img.src = waterfallList[i];
    img.style.width = imgWidth + "px";
    container.appendChild(img);
    img.onload = function () {
      console.log("图片加载完成");
    };
  }
}

function init() {
  // 计算每行的图片数量
  caculateColumn();
  createImg();
}

init();
