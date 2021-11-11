var layoutEl = document.getElementById('layout');
var layout;
function updateLayoutValues() {
  const opts = {
    maxRatio: 3 / 2,
    minRatio: 9 / 16,
    fixedRatio: false,
    alignItems: 'center',
    bigPercentage: 0.8,
    bigFixedRatio: false,
    bigMaxRatio: 3 / 2,
    bigMinRatio: 9 / 16,
    bigFirst: true,
    scaleLastRow: true,
    smallMaxWidth: Infinity,
    smallMaxHeight: Infinity,
    bigMaxWidth: Infinity,
    bigMaxHeight: Infinity,
    bigAlignItems: 'center',
    smallAlignItems: 'center',
  };
  layout = initLayoutContainer(layoutEl, opts).layout;
}
updateLayoutValues();

function addElement() {
  var el = document.createElement('div');

  OT.initPublisher(
    el,
    {
      resolution: '1280x720',
    },
    function (err) {
      layout();
    }
  );

  // This controlls how to focus on one video. Much like pinning a view.
  // In this example we are using the double click action.
  el.addEventListener('dblclick', function () {
    if (el.classList.contains('OT_big')) {
      el.classList.remove('OT_big');
    } else {
      el.classList.add('OT_big');
    }
    layout();
  });
  layoutEl.appendChild(el);
  layout();
}

function removeElement() {
  layoutEl.firstChild.classList.remove('ot-layout');
  setTimeout(function () {
    layoutEl.removeChild(layoutEl.firstChild);
    layout();
  }, 200);
}

var resizeTimeout;
window.onresize = function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    layout();
  }, 20);
};
