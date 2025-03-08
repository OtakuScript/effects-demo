const menu = document.querySelectorAll('.menu');
const menuItemHeight = menu[0].offsetHeight;
const totalDuration = 500;

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    const isTarget = e.target.localName === 'h2';
    if (!isTarget) {
      return;
    }
    const submenu = this.children[1];
    const openStatus = submenu.getAttribute('open-status');
    const spreadHeight = menuItemHeight * submenu.children.length;
    const opnedSubMenu = document.querySelector(
      '.submenu[open-status="opened"]'
    );
    const opnedSubMenuHeight = opnedSubMenu ? opnedSubMenu.offsetHeight : 0;

    if (openStatus === 'closed' || !openStatus) {
      openSubMenu(submenu, spreadHeight, totalDuration);
      if (opnedSubMenu) {
        closeSubMenu(opnedSubMenu, opnedSubMenuHeight, totalDuration);
      }
    }
    if (openStatus === 'opened') {
      closeSubMenu(submenu, spreadHeight, totalDuration);
    }
  });
}

function openSubMenu(submenu, spreadHeight, totalDuration) {
  submenu.setAttribute('open-status', 'openning');
  createAnimation({
    from: 0,
    to: spreadHeight,
    totalDuration: totalDuration,
    duration: 10,
    onChange: function (value) {
      submenu.style.height = value + 'px';
    },
    onEnd: function (value) {
      submenu.style.height = 'auto';
      submenu.setAttribute('open-status', 'opened');
    },
  });
}

function closeSubMenu(submenu, spreadHeight, totalDuration) {
  submenu.setAttribute('open-status', 'openning');
  createAnimation({
    from: spreadHeight,
    to: 0,
    totalDuration: totalDuration,
    duration: 10,
    onChange: function (value) {
      submenu.style.height = value + 'px';
    },
    onEnd: function (value) {
      submenu.style.height = 0;
      submenu.setAttribute('open-status', 'closed');
    },
  });
}
