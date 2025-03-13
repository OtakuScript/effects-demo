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
  const shuffleArray = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // 创建4个随机排序的副本
  return [
    ...shuffleArray([...imgList]),
    ...shuffleArray([...imgList]),
    ...shuffleArray([...imgList]),
    ...shuffleArray([...imgList]),
  ];
}
waterfallList = createWaterfallList();

const imgWidth = 220;
const container = document.querySelector('.container');
function createImg(params) {
  // 计算每行的图片数量
  const perLineCount = Math.floor(container.offsetWidth / imgWidth);
  // 创建img元素
  waterfallList.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item;
    img.style.width = imgWidth + 'px';
    img.style.height = 'auto';
    img.style.display = 'block';
    img.style.cursor = 'pointer';
    img.style.objectFit = 'cover';
    container.appendChild(img);
  });
}

function init(params) {
  createImg();
}

init();
