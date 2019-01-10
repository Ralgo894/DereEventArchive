var sidePageCount = 2;

window.addEventListener('resize', changeWindowSize(), false);


function changeWindowSize() {
  var wrapper = document.getElementsByClassName('wrapper')[0];
  var pages = document.getElementsByClassName('page');

  wrapper.style.width = window.parent.screen.width * sidePageCount * 2 + 'px';

  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width * 2 + 'px';
    pages[i].style.height = window.parent.screen.height * 2 + 'px';
  }
}

changeWindowSize();
