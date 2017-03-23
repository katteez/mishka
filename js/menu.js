var btnMenu = document.querySelector(".main-menu__button");

btnMenu.addEventListener("click", function (event) {
  var btnCloseMenu = document.querySelector(".main-menu__button--close");
  var btnOpenMenu = document.querySelector(".main-menu__button--open");
  var menu = document.querySelectorAll(".main-menu__list");

  event.preventDefault();
  if (btnCloseMenu && menu) {
    menu.forEach(function (menuList) {
      menuList.classList.add("main-menu__list--hide");
    });
    btnMenu.classList.remove("main-menu__button--close");
    btnMenu.classList.add("main-menu__button--open");
  }

  if (btnOpenMenu) {
    menu.forEach(function (menuList) {
      menuList.classList.remove("main-menu__list--hide");
    });
    btnMenu.classList.remove("main-menu__button--open");
    btnMenu.classList.add("main-menu__button--close");
  }
});
