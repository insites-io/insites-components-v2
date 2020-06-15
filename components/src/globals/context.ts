declare var Context: any;

Context.formatUrl = (e) => {
    return e.toLowerCase()
        .replace(/ +(?= )/g, '')
        .replace(/- | - | -| /gi, '-')
        .replace(/-+(?=)/g, '-');
};

Context.addRippleEffect = (startingPoint, target) => {

    let rect = target.getBoundingClientRect();
    let ripple = target.querySelector('.ripple-wave');

    if (!ripple) {
      ripple = document.createElement('span');
      ripple.className = 'ripple-wave';
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
      target.appendChild(ripple);
    }

    ripple.classList.remove('show');
    let top = startingPoint.pageY - (rect.top + window.scrollY) - ripple.offsetHeight / 2;

    let left = startingPoint.pageX - rect.left - ripple.offsetWidth / 2;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');

    setTimeout(() => {
      if (target.contains(ripple)){
        target.removeChild(ripple);
      }
    }, 1250);

    return false;
};
