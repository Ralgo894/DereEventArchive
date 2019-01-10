var sidePageCount = 2;

var touchStartX, touchStartY, touchMoveX, touchMoveY;

window.addEventListener('resize', changeWindowSize(), false);

window.addEventListener('touchstart', e => {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
}, false);
window.addEventListener('touchmove', e => {
  touchMoveX = event.changedTouches[0].pageX;
  touchMoveY = event.changedTouches[0].pageY;
}, false);
window.addEventListener('touchend', e => {

}, false);

function changeWindowSize() {
  var slideContainer = document.getElementById('pageContainer');
  var pages = document.getElementsByClassName('page');

  slideContainer.style.width = window.parent.screen.width * sidePageCount + 'px';

  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width + 'px';
    pages[i].style.height = window.parent.screen.height + 'px';
  }
}
changeWindowSize();
