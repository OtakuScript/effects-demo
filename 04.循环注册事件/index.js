// Description: 循环注册事件
// 解决作用域和变量提升导致的使用同一个变量的问题
// 1. IIFE
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

// 2. let
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
