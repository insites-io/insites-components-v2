(function(window, document) {
  "use strict";
  var rippleEls = document.querySelectorAll('.js-ripple');
  for (var i = 0; i < rippleEls.length; i++) {
    rippleEls[i].addEventListener('click', toggleRiple);
    rippleEls[i].addEventListener('animationend webkitAnimationEnd oanimationend MSAnimationEnd', toggleRiple);
  }

  function toggleRiple(e) {
    var $this = e.target;
    var $circle = $this.firstElementChild;

    if ($circle){
      var x = e.pageX - $this.parentElement.offsetLeft;
      var y = e.pageY - $this.parentElement.offsetTop;

      $circle.style.top = y + "px";
      $circle.style.left = x + "px";

      $this.classList.add("is-active");

      setTimeout(function() {
        e.target.classList.remove("is-active");
      }, 400);
    }
  };
})(window, document);
