var sidePageCount = 2;

window.addEventListener('resize', changeWindowSize(), false);


function changeWindowSize() {
  var slideContainer = document.getElementById('slideContainer');
  var pages = document.getElementsByClassName('page');

  slideContainer.style.width = window.parent.screen.width * sidePageCount + 'px';

  for (var i = 0; pages[i]; i++) {
    pages[i].style.width = window.parent.screen.width + 'px';
    pages[i].style.height = window.parent.screen.height + 'px';
  }
}

changeWindowSize();
