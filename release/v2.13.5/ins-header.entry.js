import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.supportLink = undefined;
        this.hasMenuToggle = true;
        this.sidebarMini = undefined;
        this.hasSidebar = undefined;
        this.insAdminEl = undefined;
        this.insNotificationsEl = undefined;
        this.insSidebarEl = undefined;
        this.fullScreenState = undefined;
    }
    componentWillLoad() {
        this.sidebarMini = false;
        this.fullScreenState = false;
        this.insAdminEl = document.querySelector('body');
        this.insNotificationsEl = document.querySelector('ins-notifications');
        this.insSidebarEl = document.querySelector('ins-sidebar');
    }
    componentDidLoad() {
        let $this = this;
        this.insNavEl = document.querySelector('.full-width-navs');
        window.onresize = function () {
            $this.toggleMinimise();
        };
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insHeaderEl);
        }
    }
    toggleMinimise() {
        const mq = window.matchMedia("(max-width: 1260px)");
        if (mq.matches) {
            if (this.insAdminEl)
                this.insAdminEl.classList.add('mini');
            if (!this.sidebarMini && this.insSidebarEl) {
                this.sidebarMini = true;
                this.insSidebarEl.minimise();
            }
        }
        else if (this.sidebarMini) {
            this.toggleSidebar();
        }
    }
    async toggleSidebar() {
        if (this.hasClass(this.insNavEl, 'active')) {
            this.insNavEl.classList.remove('active');
            this.insHeaderEl.querySelector('.ellipsis').classList.remove('active');
        }
        this.sidebarMini = !this.sidebarMini;
        if (this.insSidebarEl) {
            this.sidebarMini
                ? this.insSidebarEl.minimise()
                : this.insSidebarEl.maximise();
        }
        this.insAdminEl.classList.add('loading');
        setTimeout(() => {
            this.insAdminEl.classList.remove('loading');
        }, 450);
        if (this.insAdminEl) {
            this.insAdminEl.classList.toggle('mini');
        }
        let insAdminEl = document.querySelector('body');
        let submenuWrapEls = document.querySelectorAll('ins-sidebar-item');
        let footerMenus = document.querySelectorAll('ins-sidebar-footer-menu');
        if (insAdminEl.className.includes('mini')) {
            for (let i = 0; i < submenuWrapEls.length; ++i) {
                let submenuWrap = submenuWrapEls[i];
                submenuWrap.hideSubMenu();
            }
            for (let i = 0; i < footerMenus.length; ++i) {
                let footerMenu = footerMenus[i];
                footerMenu.hideMenu();
            }
        }
    }
    async toggleNav() {
        if (!this.hasClass(this.insAdminEl, 'mini')) {
            this.toggleSidebar();
        }
        this.insNavEl.classList.toggle('active');
        this.insHeaderEl.querySelector('.ellipsis').classList.toggle('active');
    }
    toggleFullScreen() {
        let doc = document;
        if (this.fullScreenState) {
            if (doc.cancelFullScreen) {
                doc.cancelFullScreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
        }
        else {
            let el = doc.documentElement;
            let rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
            rfs.call(el);
        }
        this.fullScreenState = !this.fullScreenState;
    }
    toggleNotifications() {
        this.insNotificationsEl.toggleNotificationshandler();
    }
    checkURL(url) {
        if (url.includes('https://')) {
            return url;
        }
        else if (url.includes('http://')) {
            return url;
        }
        else {
            return `//${url}`;
        }
    }
    goToSupportLink() {
        window.open(this.checkURL(this.supportLink));
    }
    hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    render() {
        return (h("div", { key: 'f50163e729625bc7f844b39edd6e5e26c138b999', class: "ins-header-wrap" }, this.insSidebarEl && this.hasMenuToggle ?
            h("button", { id: "insSidebarToggler", class: "burger", onClick: () => this.toggleSidebar() }, h("span", null), h("span", null), h("span", null)) : '', h("div", { key: 'd4b8677de9b96929f808cb43abda7a7b8d62e3d0', class: "full-width-navs" }, h("div", { key: '0baec5f81855ce6012f2ac92a6e27039e5e5a6fb', class: "ins-header-buttons" }, h("button", { key: '113b9857680533b74c1ecb0ee34f6a96440f2549', class: "icon-nav", onClick: () => this.toggleFullScreen() }, this.fullScreenState ?
            h("i", { class: "icon-minimize-1", title: "Minimise View" }) :
            h("i", { class: "icon-maximize", title: "Maximise View" })), this.supportLink ?
            h("button", { class: "icon-nav", onClick: () => this.goToSupportLink() }, h("i", { class: "icon-support-1", title: "Open Support Page" }))
            : '', this.insNotificationsEl ?
            h("button", { class: "icon-nav", onClick: () => this.toggleNotifications() }, h("i", { class: "icon-notification-1", title: "Open Notifications" }))
            : ''), h("slot", { key: 'ddaf170883ff7d54dff97e21a8f5730bba53349f' })), h("div", { key: '76a04f7104413bc5ced33f7b1205c0e13bbe3977', class: "minified-navs" }, h("button", { key: '642305fabb0c57d7d64dea93c18f69273bd58272', id: "insHeaderToggler", class: "ellipsis", onClick: () => this.toggleNav() }, h("span", { key: '3a41a46cb4e27f540b10d12913ff7f377b1ab7e9' }), h("span", { key: '144508f79f04ecd66f46619809386b76ac45fcdf' }), h("span", { key: '9d38462bcfc8bf0b615a199b2d7f7eb3333f2dc8' })))));
    }
    get insHeaderEl() { return getElement(this); }
};

export { InsHeader as ins_header };

//# sourceMappingURL=ins-header.entry.js.map