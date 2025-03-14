const lyricInfo = handleLyricData(lyric);
const dom = {
  audio: document.querySelector("#audio"),
  lyricBox: document.querySelector(".lyric-box"),
  lyricList: document.querySelector(".lyric-list"),
};

/**
 * 处理歌词数据
 * @param {string} lyricData
 */
function handleLyricData(lyricData) {
  const lines = lyricData.split("\n");
  const lyricInfo = [];
  // debugger;
  lines.forEach(line => {
    const lineSplitArr = line.split("]");
    const timeStr = lineSplitArr[0].split("[")[1];
    const time = handleTimeStr(timeStr);
    const words = lineSplitArr[1];
    const lyricItem = {
      time: 0,
      words: "",
    };

    lyricItem.time = time;
    lyricItem.words = words;
    lyricInfo.push(lyricItem);
  });
  console.log(lyricInfo);
  return lyricInfo;
}

/**
 * 将时间字符串处理为秒数
 * @param {string} timeStr
 */
function handleTimeStr(timeStr) {
  const timeArr = timeStr.split(":");
  const second = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
  return second;
}

/**
 * 当前时间点下对应的歌词索引
 * @param {number} currentTime
 * @param {Array} lyricInfo
 */
function getCurrentLyricIndex(lyricInfo) {
  const currentTime = dom.audio.currentTime;
  console.log("currentTime", currentTime);
  let currentLyricIndex = 0;
  for (let i = 0; i < lyricInfo.length; i++) {
    if (currentTime < lyricInfo[i].time) {
      currentLyricIndex = i - 2;
      return currentLyricIndex;
    }
  }
  return lyricInfo.length - 2;
}

/**
 * 渲染歌词
 * @param {Array} lyricInfo
 */
function renderLyric(lyricInfo) {
  // 文档片段，有利于减少DOM操作
  const fragment = document.createDocumentFragment();
  lyricInfo.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerText = item.words;
    li.classList.add("lyric-item");
    fragment.appendChild(li);
  });
  dom.lyricList.appendChild(fragment);
}

renderLyric(lyricInfo);

const lyricBoxHeight = dom.lyricBox.clientHeight;
const ulHeight = dom.lyricList.clientHeight;
const liHeight = dom.lyricList.children[0].clientHeight;
const maxOffset = dom.lyricList.children.length - 1 * liHeight;

/**
 * 设置偏移量
 * @param {number} offset
 */
function setLyricOffset() {
  const currentLyricIndex = getCurrentLyricIndex(lyricInfo);
  console.log("currentLyricIndex", currentLyricIndex);
  let offset = liHeight * currentLyricIndex + liHeight - lyricBoxHeight / 2;
  dom.lyricList.style.transform = `translateY(${-offset}px)`;

  // 高亮当前歌词
  const activeLi = dom.lyricList.querySelectorAll(".active");
  console.log("activeLi", activeLi);
  if (activeLi.length > 0) {
    activeLi.forEach(item => {
      item.classList.remove("active");
    });
  }
  dom.lyricList.children[currentLyricIndex].classList.add("active");
  dom.lyricList.children[currentLyricIndex + 1].classList.add("active");
}

dom.audio.volume = 0.1;
dom.audio.addEventListener("timeupdate", setLyricOffset);
