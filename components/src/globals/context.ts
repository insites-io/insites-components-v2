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

Context.stripTags = (input) => {
  let allowed = '<a>,<abbr>,<acronym>,<address>,<article>,<aside>,<b>,<base>,<bdi>,<bdo>,<blockquote>,<br>,<caption>,<code>,<dd>,<del>,<details>,<dfn>,<dir>,<div>,<dl>,<dt>,<em>,<font>,<h1>,<h2>,<h3>,<h4>,<h5>,<h6>,<hr>,<i>,<ins>,<label>,<li>,<link>,<mark>,<menu>,<meter>,<nav>,<ol>,<p>,<pre>,<q>,<s>,<samp>,<section>,<small>,<span>,<strike>,<strong>,<sub>,<summary>,<sup>,<table>,<tbody>,<td>,<tfoot>,<th>,<thead>,<time>,<tr>,<tt>,<u>,<ul>,<wbr>';
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
  commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) => {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}