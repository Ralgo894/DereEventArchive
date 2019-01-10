var horizonPageMax = 3;
var verticalPageMax = 2;
var horizonPageCount = 0;
var verticalPageCount = 0;

var mainHorizonPageCount = 0;
var optionVerticalPageCount = -1;

var horizonSlideFlag = true;
var verticalSlideFlag = true;

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
  event.preventDefault();
  if (horizonSlideFlag && touchStartX > (touchMoveX + 50)) {
    slidePage('<');
  }
  else if (horizonSlideFlag && (touchStartX + 50) < touchMoveX) {
    slidePage('>');
  }
  else if (verticalSlideFlag && touchStartY > (touchMoveY + 50)) {
    slidePage('^');
  }
  else if (verticalSlideFlag && (touchStartY + 50) < touchMoveY) {
    slidePage('v');
  }
  checkNextSlideFlag();
}, false);

function changeWindowSize() {
  var slideContainer = document.getElementById('pageWrapper');
  var pages = document.getElementsByClassName('page');

  slideContainer.style.width = window.parent.screen.width * horizonPageMax + 'px';

  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width + 'px';
    pages[i].style.height = window.parent.screen.height + 'px';
  }
}
changeWindowSize();

function slidePage(mode) {
  // mode = フリックの向き
  if (mode == '>') {
    horizonPageCount--;
    if (horizonPageCount < 0) horizonPageCount = 0;
  }
  else if (mode == '<') {
    horizonPageCount++;
    if (horizonPageCount > (horizonPageMax - 1)) horizonPageCount = horizonPageMax - 1;
  }
  else if (mode == 'v') {
    verticalPageCount--;
    if (verticalPageCount < 0) verticalPageCount = 0;
  }
  else if (mode == '^') {
    verticalPageCount++;
    if (verticalPageCount > (verticalPageMax - 1)) verticalPageCount = verticalPageMax - 1;
  }

  var x = '-' + (window.parent.screen.width * horizonPageCount);
  var y = '-' + (window.parent.screen.height * verticalPageCount);

  var pageWrapper = document.getElementById('pageWrapper');
  pageWrapper.style.transform = 'translate(' + x + 'px,' + y + 'px)';
}

function checkNextSlideFlag() {
  horizonSlideFlag = (() => {
    if (verticalPageCount != optionVerticalPageCount) return true;
    return false;
  })();
  verticalSlideFlag = (() => {
    if (horizonPageCount == mainHorizonPageCount) return true;
    return false;
  })();
}
