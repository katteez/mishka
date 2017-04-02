var btnMenu = document.querySelector(".main-menu__button");
var btnCloseMenu = document.querySelector(".main-menu__button--close");
var btnOpenMenu = document.querySelector(".main-menu__button--open");
var menu = document.querySelectorAll(".main-menu__list");
var btnOpenCart = document.querySelectorAll(".js-to-cart");
var btnCloseCart = document.querySelector(".form__modal-button");
var popupCart = document.querySelector(".modal--add-to-cart");
var modalOverlay = document.querySelector(".modal-overlay");
var mapContainer = document.getElementById("map");

/********** Открытие/закрытие меню **********/
var closeMenu = function () {
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.add("main-menu__list--hide");
  }
  btnMenu.classList.remove("main-menu__button--close");
  btnMenu.classList.add("main-menu__button--open");
};

var openMenu = function () {
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("main-menu__list--hide");
  }
  btnMenu.classList.remove("main-menu__button--open");
  btnMenu.classList.add("main-menu__button--close");
};

var enableJsMenu = function () {
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("main-menu__list--no-js");
  }
  btnMenu.classList.remove("main-menu__button--no-js");
};

enableJsMenu();
if (btnCloseMenu && menu) {
  closeMenu();
}

btnMenu.addEventListener("click", function (event) {
  btnCloseMenu = document.querySelector(".main-menu__button--close");
  btnOpenMenu = document.querySelector(".main-menu__button--open");
  menu = document.querySelectorAll(".main-menu__list");

  event.preventDefault();
  if (btnCloseMenu && menu) {
    closeMenu();
  }

  if (btnOpenMenu) {
    openMenu();
  }
});

/******* Модальное окно "Добавление товара в корзину" *******/
if (btnOpenCart && popupCart && btnCloseCart && modalOverlay) {
  for (var i = 0; i < btnOpenCart.length; i++){
    btnOpenCart[i].addEventListener("click", function (event) {
      event.preventDefault();
      popupCart.classList.add("modal--show");
      modalOverlay.classList.add("modal-overlay--show");
    });
  }
  btnCloseCart.addEventListener("click", function (event) {
    event.preventDefault();
    popupCart.classList.remove("modal--show");
    modalOverlay.classList.remove("modal-overlay--show");
  });
  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      if (popupCart.classList.contains("modal--show")) {
        popupCart.classList.remove("modal--show");
        modalOverlay.classList.remove("modal-overlay--show");
      }
    }
  });
}

/********** Карта **********/
if (mapContainer) {
  window.onload = function () {
    var mapOptions = {
      zoom: 16,
      center: new google.maps.LatLng(59.9362, 30.3216)
    }
    var map = new google.maps.Map(mapContainer, mapOptions);
    var image = "img/icon-map-pin.svg";
    var myLatLng = new google.maps.LatLng(59.9362, 30.3216);
    var beachMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image
    });
  }
}
