// 切换图片
const thumbnailsList = document.querySelector('.thumbnails').children;
const previewImg = document.querySelector('.preview-img');
const zoomedImg = document.querySelector('.zoomed-img');

for (let i = 0; i < thumbnailsList.length; i++) {
  thumbnailsList[i].addEventListener('click', function () {
    const src = this.getAttribute('src');
    previewImg.setAttribute('src', src);
    zoomedImg.setAttribute('src', src);
  });
}

const previewContainer = document.querySelector('.preview');
const {} = previewContainer.getBoundingClientRect;
console.log(previewContainer.getBoundingClientRect());
window.addEventListener('mousemove', function (e) {
  const { clientX, clientY } = e;
  // console.log(e);
});
