import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSidebarItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routePage = createEvent(this, "routePage", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.link = '';
        this.footerLink = '';
        this.icon = 'no-icon';
        this.app = false;
        this.withSubmenu = false;
        this.label = 'Label';
        this.landingPage = false;
        this.submenuVisible = undefined;
        this.isActive = undefined;
        this.formattedRoute = undefined;
        this.showTooltip = false;
    }
    async routePageHandler(e) {
        let redirect = false;
        if (e) {
            if (e === "landing")
                redirect = true;
            else
                e.preventDefault();
        }
        this.activate();
        let gettingCrumbs = true;
        let currentClosesEl = this.insSidebarItemEl.parentElement.closest('ins-sidebar-item');
        let crumbs = [];
        let crumb = {
            link: this.link,
            app: this.app,
            withSubmenu: this.withSubmenu,
            label: this.label,
            formattedRoute: this.formattedRoute
        };
        crumbs.push(crumb);
        while (gettingCrumbs) {
            if (currentClosesEl) {
                let crumb = {
                    link: currentClosesEl.link,
                    app: currentClosesEl.app,
                    withSubmenu: currentClosesEl.withSubmenu,
                    label: currentClosesEl.label,
                    formattedRoute: this.formattedRoute
                };
                crumbs.push(crumb);
                currentClosesEl = currentClosesEl.parentElement.closest('ins-sidebar-item');
            }
            else {
                gettingCrumbs = false;
            }
        }
        crumbs.reverse();
        this.toggleMenuNav();
        this.routePage.emit({ crumbs, redirect });
        // await this.hideSiblingsMenu();
        let body = document.querySelector('body');
        body.style.overflowY = null;
        if (this.app) {
            document.querySelector('body').style.overflowY = 'hidden';
        }
        const mq = window.matchMedia("(max-width: 1260px)");
        let menuBar = document.querySelector('ins-sidebar');
        if (mq.matches) {
            document.querySelector('body').classList.add('mini');
            menuBar.minimise();
        }
        return { crumbs };
    }
    toggleMenuNav() {
        let insHeaderEl = document.querySelector('ins-header'), menuNav = insHeaderEl.querySelector('.full-width-navs');
        if (this.hasClass(menuNav, 'active')) {
            insHeaderEl.toggleNav();
        }
    }
    hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    toggleSidebar() {
        let insAdminEl = document.querySelector('body');
        let menuBar = document.querySelector("ins-header");
        if (menuBar && insAdminEl.className.includes('mini')) {
            menuBar.toggleSidebar();
        }
    }
    async showSubMenu() {
        let insAdminEl = document.querySelector('body');
        if (this.withSubmenu && insAdminEl.className.includes('mini')) {
            await this.hideSiblingsMenu();
        }
        this.submenuVisible = true;
        this.toggleSidebar();
        return true;
    }
    async hideSubMenu() {
        this.submenuVisible = false;
        return true;
    }
    async activate() {
        await this.deactivateSiblings();
        let checkIfSubMenu = this.insSidebarItemEl.closest('.submenu-wrap');
        if (checkIfSubMenu) {
            let parent = checkIfSubMenu.closest('ins-sidebar-item');
            await parent.activateParent();
            const mq = window.matchMedia("(min-width: 1260px)");
            if (mq.matches)
                parent.showSubMenu();
        }
        return true;
    }
    async activateParent() {
        this.isActive = true;
        return true;
    }
    async deactivate() {
        this.isActive = false;
        return true;
    }
    async hideSiblingsMenu() {
        let submenuWrapEls = this.insSidebarItemEl.closest('ins-sidebar').querySelectorAll('ins-sidebar-item');
        for (let i = 0; i < submenuWrapEls.length; ++i) {
            await submenuWrapEls[i].hideSubMenu();
        }
    }
    async deactivateSiblings() {
        let submenuWrapEls = this.insSidebarItemEl.closest('ins-sidebar')
            .querySelectorAll('ins-sidebar-item');
        for (let i = 0; i < submenuWrapEls.length; ++i) {
            await submenuWrapEls[i].deactivate();
        }
        this.isActive = true;
        return true;
    }
    addRippleEffect(startingPoint, target) {
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
            if (target.contains(ripple)) {
                target.removeChild(ripple);
            }
        }, 1250);
        return false;
    }
    componentWillLoad() {
        this.formattedRoute = this.locFormatRoute();
    }
    componentDidLoad() {
        let target = this.insSidebarItemEl.querySelector('.ins-ripple-button');
        this.insSidebarItemEl.addEventListener('click', e => {
            e.stopPropagation();
            let tgt = e.target;
            let parent = tgt.parentNode;
            if (!parent.classList.contains('btn-nav')) {
                this.addRippleEffect(e, target);
            }
        });
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insSidebarItemEl);
        }
    }
    async formatRoute() {
        return this.locFormatRoute();
    }
    formatUrl(e) {
        return e.toLowerCase()
            .replace(/ +(?= )/g, '')
            .replace(/- | - | -| /gi, '-')
            .replace(/-+(?=)/g, '-');
    }
    locFormatRoute() {
        if (this.app) {
            let subItem = this.insSidebarItemEl.closest('ins-sidebar-item[with-submenu]');
            let formattedUrl = (subItem) ? `${subItem.label}/${this.label}` : this.label;
            formattedUrl = this.formatUrl(formattedUrl);
            return '#/app/' + formattedUrl;
        }
        return this.link;
    }
    mouseLeaveHandler() {
        let insAdminEl = document.querySelector('body');
        if (insAdminEl && insAdminEl.className.includes('mini')) {
            this.hideSubMenu();
        }
    }
    toggleTooltip(state) {
        this.showTooltip = state;
    }
    render() {
        if (this.withSubmenu) {
            return (h("div", { class: `ins-sidebar-item-wrap
          ${this.isActive ? 'active' : ''}
          ${this.showTooltip ? 'show-tooltip' : ''}
          ${this.icon ? '' : 'no-icon'}` }, h("div", { class: "ins-ripple-button" }, h("a", { onClick: () => this.showSubMenu(), class: "ins-ripple-link" }, h("i", { class: `fas ${this.icon}`, onMouseEnter: () => this.toggleTooltip(true), onMouseLeave: () => this.toggleTooltip(false) }), h("span", { class: "ins-sidebar-item-label" }, this.label), h("i", { class: "fas icon-chevron-right" }))), h("div", { class: "ins-sidebar-item-tooltip" }, this.label), h("div", { class: "relative-wrap" }, h("div", { class: `submenu-wrap ${this.submenuVisible ? 'is-active' : ''}`, onMouseLeave: () => this.mouseLeaveHandler() }, h("div", { class: "btn-nav-wrap" }, h("button", { class: "btn-nav", onClick: () => this.hideSubMenu() }, h("i", { class: "fas icon-chevron-left" }), h("span", null, this.label))), h("slot", null)))));
        }
        else {
            if (this.label !== "") {
                return (h("div", { class: `ins-sidebar-item-wrap
            ${this.isActive ? 'active' : ''}
            ${this.showTooltip ? 'show-tooltip' : ''}
            ${this.icon ? '' : 'no-icon'}` }, h("div", { class: "ins-ripple-button" }, this.app ?
                    h("a", { class: "ins-ripple-link", href: `${this.formattedRoute}` }, h("i", { class: `fas ${this.icon}`, onMouseEnter: () => this.toggleTooltip(true), onMouseLeave: () => this.toggleTooltip(false) }), h("span", { class: "ins-sidebar-item-label" }, this.label))
                    :
                        h("a", { class: "ins-ripple-link", href: this.link ? this.link : '' }, h("i", { class: `fas ${this.icon}` }), h("span", { class: "ins-sidebar-item-label" }, this.label))), h("div", { class: "ins-sidebar-item-tooltip" }, this.label)));
            }
        }
    }
    get insSidebarItemEl() { return getElement(this); }
};

export { InsSidebarItem as ins_sidebar_item };

//# sourceMappingURL=ins-sidebar-item.entry.js.map