var userData = {
  "playerName": "プロデューサー",
  "playerRank": 200,
  "eventData": [
    {
      "type": "item",
      "name": "",
      "subName": "",
      "burst": "",
      "start": "",
      "end": "",
      "memoryUse": [
        {
          "mode": "stamina",
          "count": 0
        },
        {
          "mode": "stamina",
          "count": 0
        }
      ],
      "memoryGet": [
        {
          "mode": "point",
          "count": 0
        },
        {
          "mode": "point",
          "count": 0
        }
      ],
      "log": [
        {
          "type": "recovery",
          "mode": "stone",
          "stamina": 10,
          "count": 4,
          "time": 1547226697812
        },
        {
          "type": "use",
          "mode": "stamina",
          "count": 4,
          "time": 1547226814353
        }
      ],
      "imageUrl": "https://hidamarirhodonite.kirara.ca/spread/100614.png",
      "imageId": "100614"
    }
  ]
};
userData = (() => {
  var data;
  try {
    data = JSON.parse(localStorage.getItem('DEA_userData'));
  }
  catch (e) {
    data = userData;
  }
  if (!data || data.length == 0) {
    data = userData;
  }
  return data;
})();

var needRecoveryStone = [
  {"rank": 1, "stone": 12},
  {"rank": 4, "stone": 11},
  {"rank": 12, "stone": 10},
  {"rank": 23, "stone": 9},
  {"rank": 38, "stone": 8},
  {"rank": 59, "stone": 7},
  {"rank": 86, "stone": 6},
  {"rank": 130, "stone": 5},
  {"rank": 198, "stone": 4},
  {"rank": 315, "stone": 3}
]

var modeChangeIcons = {
  "use": [
    '<span class="iconBottle"></span>',
    '<span class="iconAward"></span>'
  ],
  "get": [
    '<span class="iconAward"></span>',
    '<span class="iconHeart"></span>'
  ]
}

var xPageMax, yPageMax;
var xPageCount = 0;
var yPageCount = 0;

var mainXPageCount = 0;

var eventOffset = 1;
var nowEvent = yPageCount - eventOffset;
// var nowEvent = yPageCount;

var touchStartX, touchStartY, touchMoveX, touchMoveY;

let lastTouch = 0;

var memoryUseTouchTime1, memoryUseTouchTime2;
var memoryUseTimer1, memoryUseTimer2;
var memoryGetTouchTime1, memoryGetTouchTime2;
var memoryGetTimer1, memoryGetTimer2;

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
  // ダブルタップズーム回避
  (() => {
    const now = window.performance.now();
    if (now - lastTouch <= 500) {
      event.preventDefault();
    }
    lastTouch = now;
  })();

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

function formatTime(date, format) {
  format = format.replace(/YYYY/, date.getFullYear());
  format = format.replace(/MM/, zeroPadding(date.getMonth() + 1, 2));
  format = format.replace(/DD/, zeroPadding(date.getDate(), 2));
  format = format.replace(/hh/, zeroPadding(date.getHours(), 2));
  format = format.replace(/mm/, zeroPadding(date.getMinutes(), 2));
  format = format.replace(/ss/, zeroPadding(date.getSeconds(), 2));
  return format;
}

function zeroPadding(str, count) {
  var herd = new Array(count + 1).join('0');
  return (herd + str).slice(0 - count);
}


function saveData() {
  localStorage.setItem('DEA_userData', JSON.stringify(userData));
  console.log(userData);
}

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

    changeBackImage();
  }
  else if (mode == '^') {
    yPageCount++;
    if (yPageCount > (yPageMax - 1)) yPageCount = yPageMax - 1;

    changeBackImage();
  }

  nowEvent = yPageCount - eventOffset;

  var pageWrapper = document.getElementById('pageWrapper');
  var x = '-' + (window.parent.screen.width * xPageCount);
  var y = '-' + (window.parent.screen.height * yPageCount);
  pageWrapper.style.transform = 'translate(' + x + 'px,' + y + 'px)';

  var background = document.getElementById('background');
  var bx = '-' + ((background.clientWidth - window.parent.screen.width) / (xPageMax - 1) * xPageCount);
  background.style.transform = 'translateX(' + bx + 'px)';
}

function changeBackImage() {
  nowEvent = yPageCount - eventOffset;

  var url = (() => {
    try {
      var u = userData.eventData[nowEvent].imageUrl;
      if (u != '') return 'url(' + u + ')';
    }
    catch (e) { }
    return 'url(image/bg.png)';
  })();

  var background = document.getElementById('background');
  background.style.backgroundImage = url;
}
changeBackImage();

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
  var page = me.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var display = page.querySelectorAll('.display p');
  var displayRight = display[1];
  var displayLeft = display[0];

  var flagRecovery = /^(?=.*page)(?=.*recovery).*$/.test(page.classList.value);
  var flagUse = /^(?=.*page)(?=.*use).*$/.test(page.classList.value);

  if (/^[0-9]+?$/.test(me.innerHTML)) {
    if (/^[0-9]+?$/.test(displayRight.innerHTML)) {
      displayRight.innerHTML = displayRight.textContent + me.textContent;
    }
    else {
      displayRight.innerHTML = me.textContent;
    }
  }
  else {
    if (me.innerHTML == 'C') {
      displayRight.innerHTML = '0';
    }
    else {
      displayRight.innerHTML = me.textContent;
      if (flagRecovery) {
        if (/<span>[0-9].+?<\/span>/.test(me.innerHTML)) {
          var stamina = +me.innerHTML.match(/<span>([0-9].+?)<\/span>/)[1];
          var useStone;
          for (var i = 0; needRecoveryStone[i]; i++) {
            if (i == needRecoveryStone.length - 1 || needRecoveryStone[i].rank <= userData.playerRank && userData.playerRank < needRecoveryStone[i + 1].rank) {
              useStone = stamina / 10 * needRecoveryStone[i].stone;
              break;
            }
          }
          displayLeft.innerHTML = '<span class="iconGem">&nbsp;x' + useStone + '</span>';
        }
        else {
          displayLeft.innerHTML = me.innerHTML + '&nbsp;x1';
        }
      }
    }
  }
  if (/^0+[0-9]+/.test(displayRight.innerHTML)) {
    displayRight.innerHTML = displayRight.innerHTML.match(/^0+(.+)$/)[1];
  }


}

function changeContainerMode(me) {
  var page = me.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var display = page.querySelectorAll('.display p');
  var displayLeft = display[0];

  var flagUse = /^(?=.*page)(?=.*use).*$/.test(page.classList.value);
  var flagGet = /^(?=.*page)(?=.*get).*$/.test(page.classList.value);

  var iconList = (() => {
    if (flagUse) return modeChangeIcons.use;
    if (flagGet) return modeChangeIcons.get;
    return modeChangeIcons.use;
  })();

  var nextIndex = iconList.indexOf(displayLeft.innerHTML) + 1;
  if (nextIndex >= iconList.length) nextIndex = 0;

  displayLeft.innerHTML = iconList[nextIndex];
}

function stretMemoryTimer(me) {
  var page = me.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var display = page.querySelectorAll('.display p');
  var displayRight = display[1];
  var displayLeft = display[0];

  var flagUse = /^(?=.*page)(?=.*use).*$/.test(page.classList.value);
  var flagGet = /^(?=.*page)(?=.*get).*$/.test(page.classList.value);

  var overwriteMemoryData = memoryType => {
    var data = {};
    data.mode = (() => {
      if (displayLeft.innerHTML == '<span class="iconBottle"></span>') return 'stamina';
      if (displayLeft.innerHTML == '<span class="iconAward"></span>') return 'item';
      return 'stamina';
    })();
    data.count = +displayRight.textContent;
    userData.eventData[nowEvent][memoryType][me.textContent - 1] = data;
  };

  if (flagUse) {
    if (me.textContent == 1) {
      memoryUseTouchTime1 = Date.now();
      memoryUseTimer1 = setTimeout(() => {
        console.log('長押し1');
        overwriteMemoryData('memoryUse');
      }, 1000);
    }
    else {
      memoryUseTouchTime2 = Date.now();
      memoryUseTimer2 = setTimeout(() => {
        console.log('長押し2');
        overwriteMemoryData('memoryUse');
      }, 1000);
    }
  }
  else if (flagGet) {
    if (me.textContent == 1) {
      memoryGetTouchTime1 = Date.now();
      memoryGetTimer1 = setTimeout(() => {
        console.log('長押し1');
        overwriteMemoryData('memoryGet');
      }, 1000);
    }
    else {
      memoryGetTouchTime2 = Date.now();
      memoryGetTimer2 = setTimeout(() => {
        console.log('長押し1');
        overwriteMemoryData('memoryGet');
      }, 1000);
    }
  }

  saveData();
}

function endMemoryTimer(me) {
  var page = me.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
  var display = page.querySelectorAll('.display p');
  var displayRight = display[1];
  var displayLeft = display[0];

  var flagUse = /^(?=.*page)(?=.*use).*$/.test(page.classList.value);
  var flagGet = /^(?=.*page)(?=.*get).*$/.test(page.classList.value);

  var writeMemory = memoryType => {
    displayRight.textContent = userData.eventData[nowEvent][memoryType][me.textContent - 1].count;
    displayLeft.innerHTML = (() => {
      if (userData.eventData[nowEvent][memoryType][me.textContent - 1].mode == 'stamina') return '<span class="iconBottle"></span>';
      if (userData.eventData[nowEvent][memoryType][me.textContent - 1].mode == 'item') return '<span class="iconAward"></span>';
      if (userData.eventData[nowEvent][memoryType][me.textContent - 1].mode == 'point') return '<span class="iconHeart"></span>';
      return '';
    })();
  };

  if (flagUse) {
    if (me.textContent == 1) {
      clearTimeout(memoryUseTimer1);
      if (memoryUseTouchTime1 + 800 > Date.now()) {
        writeMemory('memoryUse');
      }
    }
    else {
      clearTimeout(memoryUseTimer2);
      if (memoryUseTouchTime2 + 800 > Date.now()) {
        writeMemory('memoryUse');
      }
    }
  }
  else if (flagGet) {
    if (me.textContent == 1) {
      clearTimeout(memoryGetTimer1);
      if (memoryGetTouchTime1 + 800 > Date.now()) {
        writeMemory('memoryGet');
      }
    }
    else {
      clearTimeout(memoryGetTimer2);
      if (memoryGetTouchTime2 + 800 > Date.now()) {
        writeMemory('memoryGet');
      }
    }
  }
}

function addRank(me) {
  if (window.confirm('おめでとうございます')) {
    userData.playerRank++;
    me.getElementsByClassName('rank')[0].textContent = userData.playerRank;
    saveData();
  }
}

function changeEventOption(me) {
  var table = me.parentNode.parentNode.parentNode.parentNode;
  var inputs = table.querySelectorAll('input, select');
  var options = (() => {
    var data = [];
    for (var i = 0; inputs[i]; i++) {
      data.push(inputs[i].value);
    }
    return data;
  })();

  userData.eventData[nowEvent].type = options[0];
  userData.eventData[nowEvent].name = (() => {
    if (options[0] == 'item') return options[1];
    if (options[0] == 'groove') return 'LIVE Groove';
  })();
  userData.eventData[nowEvent].subName = (() => {
    if (options[0] == 'item') return '';
    if (options[0] == 'groove') {
      if (options[2] == 'vocal') return 'Vocal burst';
      if (options[2] == 'dance') return 'Dance burst';
      if (options[2] == 'visual') return 'Visual burst';
    }
  })();
  userData.eventData[nowEvent].burst = options[2];
  userData.eventData[nowEvent].start = (() => {
    if (new Date(options[3]) == 'Invalid Date') return '';
    return formatTime(new Date(options[3]), 'YYYY/MM/DD hh:mm');
  })();
  userData.eventData[nowEvent].end = (() => {
    if (new Date(options[4]) == 'Invalid Date') return '';
    return formatTime(new Date(options[4]), 'YYYY/MM/DD hh:mm');
  })();

  saveData();
}
