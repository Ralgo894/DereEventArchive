var xPageMax, yPageMax;
var xPageCount = 0;
var yPageCount = 0;

var mainXPageCount = 0;

var touchStartX, touchStartY, touchMoveX, touchMoveY;

/* ==== */
fitty('.page.title .name');

window.addEventListener('resize', changeWindowSize(), false);

window.addEventListener('touchstart', e => {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
}, false);
window.addEventListener('touchmove', e => {
  e.preventDefault();
}, {passive: false});
window.addEventListener('touchend', e => {
  touchMoveX = event.changedTouches[0].pageX;
  touchMoveY = event.changedTouches[0].pageY;

  if (touchStartX > (touchMoveX + 50)) {
    slidePage('<');
  }
  else if ((touchStartX + 50) < touchMoveX) {
    slidePage('>');
  }
  else if (touchStartY > (touchMoveY + 50)) {
    if (xPageCount == mainXPageCount) slidePage('^');
  }
  else if ((touchStartY + 50) < touchMoveY) {
    if (xPageCount == mainXPageCount) slidePage('v');
  }
  changeBullet();
}, false);

/* ==== */

function changeWindowSize() {
  var pageContainer = document.getElementsByClassName('pageContainer');
  var pages = document.getElementsByClassName('page');

  for (var i = 0; pageContainer[i]; i++) {
    pageContainer[i].style.width = window.parent.screen.width * pageContainer[i].childElementCount + 'px';
  }

  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width + 'px';
    pages[i].style.height = window.parent.screen.height + 'px';
  }
}
changeWindowSize();

function countMaxPageCount() {
  var pageContainer = document.getElementsByClassName('pageContainer');
  var pageWrapper = document.getElementById('pageWrapper');
  xPageMax = pageContainer[yPageCount].childElementCount;
  yPageMax = pageWrapper.childElementCount;
}
countMaxPageCount();

function slidePage(mode) {
  countMaxPageCount();

  // mode = フリックの向き
  if (mode == '>') {
    xPageCount--;
    if (xPageCount < 0) xPageCount = 0;
  }
  else if (mode == '<') {
    xPageCount++;
    if (xPageCount > (xPageMax - 1)) xPageCount = xPageMax - 1;
  }
  else if (mode == 'v') {
    yPageCount--;
    if (yPageCount < 0) yPageCount = 0;
  }
  else if (mode == '^') {
    yPageCount++;
    if (yPageCount > (yPageMax - 1)) yPageCount = yPageMax - 1;
  }

  var x = '-' + (window.parent.screen.width * xPageCount);
  var y = '-' + (window.parent.screen.height * yPageCount);

  var pageWrapper = document.getElementById('pageWrapper');
  pageWrapper.style.transform = 'translate(' + x + 'px,' + y + 'px)';
}

function changeBullet() {
  countMaxPageCount();
  var bullets = document.getElementById('bullets');
  bullets.innerHTML = null;

  if (xPageMax == 1) return;

  for (var i = 0; i < xPageMax; i++) {
    var bullet = document.createElement('div');
    bullet.classList.add('bullet');
    if (i == xPageCount) bullet.classList.add('nowBullet');
    bullets.appendChild(bullet);
  }
}
changeBullet();

function writeNumber(me) {
  var numberDisplay = me.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('numberDisplay')[0];
  if (/^[0-9]+?$/.test(me.innerHTML)) {
    if (/^[0-9]+?$/.test(numberDisplay.innerHTML)) {
      numberDisplay.innerHTML = numberDisplay.textContent + me.textContent;
    }
    else {
      numberDisplay.innerHTML = me.textContent;
    }
  }
  else {
    if (me.innerHTML == 'c') {
      numberDisplay.innerHTML = '0';
    }
    else {
      numberDisplay.innerHTML = me.innerHTML;
    }
  }

  if (/^0+[0-9]+/.test(numberDisplay.innerHTML)) {
    numberDisplay.innerHTML = numberDisplay.innerHTML.match(/^0+(.+)$/)[1];
  }
}
