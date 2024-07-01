import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsRenderer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.route = {
            label: "", link: ""
        };
        this.rerouting = false;
        this.breadcrumbs = [];
        this.hasLoad = undefined;
        this.insBreadCrumbsEl = undefined;
        this.link = undefined;
        this.disableBreadcrumbs = false;
        this.app = false;
        this.label = undefined;
    }
    async updateRoute(newRoutes, noRedirect = false, iframe) {
        if (newRoutes && newRoutes.length) {
            let last = newRoutes.length - 1;
            this.route = newRoutes[last];
            this.updateBreadcrumbs(newRoutes, noRedirect);
            this.updateElements();
            if (this.route.app) {
                if (!noRedirect || iframe) {
                    this.insRendererFrameEl.contentWindow.location.replace(this.route.link);
                }
            }
        }
    }
    updateElements() {
        if (this.route.app)
            this.wrapEl.classList.add('app');
        else
            this.wrapEl.classList.remove('app');
        if (!this.disableBreadcrumbs || (this.disableBreadcrumbs && this.route.app)) {
            this.titleWrapEl.style.display = 'block';
            this.titleEl.innerHTML = this.route.label;
        }
        else if (this.disableBreadcrumbs) {
            this.titleWrapEl.style.display = 'none';
        }
        if (this.breadcrumbs.length > 1 && !this.disableBreadcrumbs) {
            let divEl = document.createElement('div');
            divEl.className = "ins-breadcrumbs";
            let ulEl = document.createElement('ul');
            for (let i = 0; i < this.breadcrumbs.length; i++) {
                let spanEl = document.createElement('span');
                spanEl.className = `crumb-label ${this.breadcrumbs[i].withSubmenu ? '' : 'has-link'}`;
                spanEl.textContent = this.breadcrumbs[i].label;
                spanEl.addEventListener('click', () => this.routePageHandler(this.breadcrumbs[i], i));
                let arrowEl = document.createElement('span');
                arrowEl.className = "arrow-right";
                let liEl = document.createElement('li');
                liEl.appendChild(spanEl);
                liEl.appendChild(arrowEl);
                ulEl.appendChild(liEl);
            }
            divEl.appendChild(ulEl);
            this.breadcrumbsEl.innerHTML = "";
            this.breadcrumbsEl.appendChild(divEl);
        }
    }
    formatUrl(e) {
        return e.toLowerCase()
            .replace(/ +(?= )/g, '')
            .replace(/- | - | -| /gi, '-')
            .replace(/-+(?=)/g, '-');
    }
    componentWillLoad() {
        if (this.link) {
            this.route = {
                label: this.label ? this.label : 'Default Page',
                app: this.app,
                link: this.link
            };
        }
    }
    async resizeIframe() {
        this.insRendererFrameEl.style.height = this.insRendererFrameEl.contentWindow.document.body.scrollHeight + 'px';
        this.insRendererFrameEl.style.opacity = '1';
    }
    async updateRouteLabel(value) {
        this.route.label = value;
    }
    componentDidLoad() {
        this.getElements();
        this.bindIframeListener();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insRendererEl);
        }
    }
    getElements() {
        this.wrapEl = this.insRendererEl.querySelector('.ins-renderer-wrap');
        this.titleWrapEl = this.insRendererEl.querySelector('.ins-renderer-wrap__title');
        this.titleEl = this.insRendererEl.querySelector('.ins-renderer-wrap__title-span');
        this.breadcrumbsEl = this.insRendererEl.querySelector('.ins-breadcrumbs-wrap');
    }
    bindIframeListener() {
        this.insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame');
        if (this.insRendererFrameEl) {
            this.iframeURLChange(this.insRendererFrameEl, e => {
                // if (this.route.app){
                if (navigator.appName == 'Microsoft Internet Explorer') {
                    window.frames.document.execCommand('Stop');
                }
                else {
                    window.frames.stop();
                }
                if (e.includes("?reroute=")) {
                    this.rerouting = true;
                    let queryStrings = e.split("?")[1].split("&");
                    queryStrings.forEach(item => {
                        if (item.includes("reroute=")) {
                            let route = item.substring(8, item.length);
                            this.insRendererFrameEl.contentWindow.location.replace(route);
                        }
                        else if (item.includes("reroutelabel=")) {
                            let reroutelabel = decodeURIComponent(item.substring(13, item.length));
                            if (reroutelabel) {
                                let header = this.insRendererEl.querySelector('.ins-renderer-wrap__title-span');
                                header.innerHTML = reroutelabel;
                            }
                        }
                    });
                }
                else if (!this.rerouting) {
                    this.insRendererFrameEl.contentWindow.location.replace(e);
                }
                else
                    this.rerouting = false;
                // }
            });
        }
    }
    iframeURLChange(iframe, callback) {
        let lastDispatched = null;
        let dispatchChange = function () {
            let newHref = iframe.contentWindow.location.href;
            if (newHref !== lastDispatched) {
                callback(newHref);
                lastDispatched = newHref;
            }
        };
        let unloadHandler = function () {
            setTimeout(dispatchChange, 0);
        };
        function attachUnload() {
            iframe.contentWindow.removeEventListener("unload", unloadHandler);
            iframe.contentWindow.addEventListener("unload", unloadHandler);
        }
        iframe.addEventListener("load", function () {
            attachUnload();
            dispatchChange();
        });
        attachUnload();
    }
    updateBreadcrumbs(newRoutes, noRedirect) {
        if (!this.disableBreadcrumbs) {
            this.breadcrumbs = newRoutes;
            let parsedCrumbs = JSON.stringify(newRoutes);
            window.localStorage.setItem('ins_breadcrumbs', parsedCrumbs);
            let lastCrumb = JSON.parse(parsedCrumbs).pop();
            if (!lastCrumb.app && !lastCrumb.withSubmenu) {
                if (!noRedirect) {
                    document.location.hash = lastCrumb.link;
                }
            }
        }
    }
    routePageHandler(crumb, index) {
        let count = this.breadcrumbs.length;
        let lastCrumb = (count - 1) === index;
        if (!crumb.withSubmenu && !lastCrumb) {
            this.breadcrumbs.splice((index + 1), count);
            let newRef = JSON.parse(JSON.stringify(this.breadcrumbs));
            this.updateRoute(newRef, false, false);
        }
    }
    renderBreadcrumbs() {
        if (this.breadcrumbs.length > 1) {
            return (h("div", { class: "ins-breadcrumbs" }, h("ul", null, this.breadcrumbs.map((crumb, index) => {
                return (h("li", null, h("span", { class: `crumb-label ${crumb.withSubmenu ? '' : 'has-link'}`, onClick: () => this.routePageHandler(crumb, index) }, crumb.label), h("span", { class: "arrow-right" })));
            }))));
        }
        return "";
    }
    render() {
        return (h("div", { key: 'bdb0463e0d6b1ecf1fe17f23e679b2750edefecf', class: `ins-renderer-wrap content ${this.route.app ? "app" : ""}` }, h("h1", { key: '7fa776128281a08b4c3a06d6b72f7cde2713b47f', class: "ins-renderer-wrap__title" }, h("span", { key: '8efcbcc817d159a42c7a30dbf0a4743ab177c0ba', class: "ins-renderer-wrap__title-span" }, this.route.label ? this.route.label : "")), h("div", { key: '6bc2734172005b08e10c17f70b2fe9f88cc71f53', class: "ins-breadcrumbs-wrap" }, this.renderBreadcrumbs()), h("div", { key: '4448a2ed12d5b6a8503ce9d2f023a8b9cdaef41d', class: "ins-renderer__iframe-wrap" }, h("iframe", { key: '69a81a8daef013c7df24a8347ffc7912a7c4729b', id: "insRendererFrame", width: "100%", frameborder: "0", marginheight: "0", marginwidth: "0" })), h("div", { key: 'f5aba67c5021b64516103c7f61fcac3ac397ea57', class: "ins-renderer__slot-wrap" }, h("slot", { key: '5e2a8527f7431e324f1ec8a78b175f41dd243bb7' }))));
    }
    get insRendererEl() { return getElement(this); }
};

export { InsRenderer as ins_renderer };

//# sourceMappingURL=ins-renderer.entry.js.map