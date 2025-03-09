(function (window) {
  // 切换图片
  const thumbnailsList = document.querySelector('.thumbnails').children;
  const previewImg = document.querySelector('.preview-img');
  const zoomedView = document.querySelector('.zoomed-view');

  for (let i = 0; i < thumbnailsList.length; i++) {
    thumbnailsList[i].addEventListener('click', function () {
      for (let j = 0; j < thumbnailsList.length; j++) {
        thumbnailsList[j].setAttribute('class', 'thumbnail');
      }
      console.log(this);
      this.setAttribute('class', 'thumbnail active');
      const src = this.getAttribute('src');
      previewImg.setAttribute('src', src);
      zoomedView.style.backgroundImage = `url(${this.src})`;
    });
  }

  const previewContainer = document.querySelector('.preview');
  let previewClientRect = previewContainer.getBoundingClientRect();
  const mask = document.querySelector('.mask');

  window.addEventListener('mousemove', function (e) {
    const { clientX, clientY } = e;
    previewClientRect = previewContainer.getBoundingClientRect();

    // 计算鼠标是否在预览图区域内
    if (
      clientX < previewClientRect.left ||
      clientX > previewClientRect.right ||
      clientY < previewClientRect.top ||
      clientY > previewClientRect.bottom
    ) {
    } else {
      mask.addEventListener('mousedown', onMouseDown);
      mask.addEventListener('mouseup', onMouseup);
    }
  });

  function onMouseDown(e) {
    e.preventDefault();
    mask.style.cursor = 'move';
    mask.addEventListener('mousemove', onMousemove);
  }
  function onMouseup(e) {
    mask.style.cursor = 'default';
    // mask.removeEventListener('mousedown', onMouseDown);
    mask.removeEventListener('mousemove', onMousemove);
  }
  function onMousemove(e) {
    // 计算相对于预览容器的坐标
    let x = e.clientX - previewClientRect.left - mask.offsetWidth / 2;
    let y = e.clientY - previewClientRect.top - mask.offsetHeight / 2;

    // 限制移动范围
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    if (x > previewClientRect.width - mask.offsetWidth) {
      x = previewClientRect.width - mask.offsetWidth;
    }
    if (y > previewClientRect.height - mask.offsetHeight) {
      y = previewClientRect.height - mask.offsetHeight;
    }

    let zoomedImgLeft = x * 2;
    let zoomedImgTop = y * 2;

    mask.style.transform = `translate(${x}px, ${y}px)`;
    zoomedView.style.backgroundPosition = `${-zoomedImgLeft}px ${-zoomedImgTop}px`;
  }
})(window);
