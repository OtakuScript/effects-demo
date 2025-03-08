// 按下鼠标才能拖动
const target = document.querySelector('.target');

// 事件名称注意全小写
target.onmousedown = function (e) {
  e.preventDefault();
  const { clientX, clientY } = e; // 鼠标当前位置
  const { left, top } = target.getBoundingClientRect(); // 元素当前位置

  // 获取视口和元素的宽高，比较费时，且相对固定，所以尽可能在鼠标点击时获取，提高性能
  const clientWidth = target.clientWidth;
  const clientHeight = target.clientHeight;
  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;

  window.onmousemove = function (e) {
    e.preventDefault();
    target.style.userSelect = 'none'; // 防止选中文字
    const { clientX: moveX, clientY: moveY } = e; // 鼠标移动后的位置

    // 移动坐标
    let disX = moveX - clientX + left;
    let disY = moveY - clientY + top;

    // 边界检测
    if (disX < 0) {
      disX = 0;
    }
    if (disX > documentWidth - clientWidth) {
      disX = documentWidth - clientWidth;
    }

    if (disY < 0) {
      disY = 0;
    }
    if (disY > documentHeight - clientHeight) {
      disY = documentHeight - clientHeight;
    }

    // target.style.left = disX + 'px';
    // target.style.top = disY + 'px';
    target.style.transform = `translate(${disX}px, ${disY}px)`;
  };
  window.onmouseup = function () {
    window.onmousemove = null;
    window.onmouseup = null;
    target.style.userSelect = 'auto';
  };
};
