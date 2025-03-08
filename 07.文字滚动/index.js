// 1. 克隆第一项元素到列表的最后
const list = document.querySelector('.list');
const firstNode = list.children[0];
const cloneNode = firstNode.cloneNode(true);
list.appendChild(cloneNode);

// 2.每隔一段时间，将列表滚动到下一个位置
let duration = 2000;
setInterval(handleScroll, duration);
let curIdx = 0;
let itemHeight = 30;
function handleScroll() {
  if (curIdx === list.children.length - 1) {
    curIdx = 0;
    list.scrollTop = 0;
  }
  let from = curIdx * itemHeight;
  curIdx++;
  let to = curIdx * itemHeight;
  let duration = 10;
  let totalDuration = 300;
  let times = totalDuration / duration;
  let dis = (to - from) / times;
  let timerId = setInterval(() => {
    from += dis;
    if (from >= to) {
      clearInterval(timerId);
    }
    list.scrollTop = from;
    // list.scrollTo({
    //   top: scrollPosition,
    //   behavior: 'smooth',
    // });
  }, duration);
}
