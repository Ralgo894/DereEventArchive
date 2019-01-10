var sidePageCount = 2;

window.addEventListener('resize', changeWindowSize(), false);


function changeWindowSize() {
  var wrapper = document.getElementsByClassName('wrapper')[0];
  wrapper.style.width = window.parent.screen.width * sidePageCount + 'px';

  var pages = document.getElementsByClassName('page');
  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width + 'px';
    pages[i].style.height = window.parent.screen.height + 'px';
  }
}

changeWindowSize();
