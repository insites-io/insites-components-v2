
(function(namespace,resourcesUrl){"use strict";
(function(Context, resourcesUrl){Context.formatUrl=(e=>e.toLowerCase().replace(/ +(?= )/g,"").replace(/- | - | -| /gi,"-").replace(/-+(?=)/g,"-")),Context.addRippleEffect=((e,t)=>{let l=t.getBoundingClientRect(),a=t.querySelector(".ripple-wave");a||((a=document.createElement("span")).className="ripple-wave",a.style.height=a.style.width=Math.max(l.width,l.height)+"px",t.appendChild(a)),a.classList.remove("show");let s=e.pageY-(l.top+window.scrollY)-a.offsetHeight/2,o=e.pageX-l.left-a.offsetWidth/2;return a.style.top=s+"px",a.style.left=o+"px",a.classList.add("show"),setTimeout(()=>{t.contains(a)&&t.removeChild(a)},1250),!1});
})(x,r);
})("insites");