import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSidebar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insSidebarAction = createEvent(this, "insSidebarAction", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.baseURL = "https://components.insites.io/assets/images";
        this.reroute = false;
        this.hasLoad = undefined;
        this.fullLogo = undefined;
        this.iconLogo = undefined;
        this.minimised = false;
        this.noFooter = false;
    }
    componentWillLoad() {
        this.checkDeviceWidth();
        let hasFooter = this.insSidebarEl.querySelector('ins-sidebar-footer');
        if (!hasFooter) {
            this.noFooter = true;
        }
    }
    componentDidLoad() {
        this.sidebarItemEls = this.insSidebarEl.querySelectorAll('ins-sidebar-item');
        this.insRenderer = document.querySelector('ins-renderer');
        this.insHeaderUserEl = document.querySelector('ins-header-user');
        this.checkHash(true);
        window.onhashchange = async () => {
            await this.checkHash();
        };
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insSidebarEl);
        }
    }
    checkDeviceWidth() {
        const mq = window.matchMedia("(min-width: 1260px)");
        if (!mq.matches) {
            document.body.classList.add('no-transition');
            document.body.classList.add('mini');
            setTimeout(() => {
                document.body.classList.remove('no-transition');
            }, 1000);
        }
    }
    routePageHandler(event) {
        this.updateRoute(event.detail.crumbs, event.detail.redirect);
    }
    async updateRoute(crumbs, redirect) {
        let noRedirect = !redirect;
        if (this.reroute) {
            let queryStrings = window.location.hash.split("?")[1].split("&");
            queryStrings.forEach(item => {
                if (item.includes("reroute=")) {
                    crumbs[0].link = item.substring(8, item.length);
                }
                else if (item.includes("reroutelabel=")) {
                    crumbs[0].label = decodeURIComponent(item.substring(13, item.length));
                }
            });
            this.reroute = false;
        }
        await this.insRenderer.updateRoute(crumbs, noRedirect, true);
    }
    async goToMyProfilePage(deeplink) {
        let insHeaderUserEl = document.querySelector('ins-header-user');
        if (!deeplink)
            await this.hideSidebarItems();
        this.updateRoute([{
                link: insHeaderUserEl.profileLink,
                app: insHeaderUserEl.app,
                label: 'My Profile',
                withSubmenu: false
            }], false);
    }
    async hideSidebarItems() {
        for (let i = 0; i < this.sidebarItemEls.length; ++i) {
            await this.sidebarItemEls[i].deactivate();
        }
    }
    async activateSidebarFromCrumbs() {
        let currentCrumbs = window.localStorage.getItem('ins_breadcrumbs');
        let parsedCrumbs = JSON.parse(currentCrumbs);
        let reversed = parsedCrumbs.reverse();
        for (const crumb of reversed) {
            let currentHash = crumb.app
                ? crumb.formattedRoute
                : crumb.link;
            if (await this.matchHash(currentHash, true)) {
                break;
            }
        }
    }
    checkIfRoot(show) {
        let currentHash = window.location.hash;
        if (currentHash === "" || currentHash === "#/") {
            if (show)
                this.showLandingPage();
            return false;
        }
        return currentHash;
    }
    showLandingPage() {
        for (let i = 0; i < this.sidebarItemEls.length; i++) {
            if (this.sidebarItemEls[i].landingPage) {
                this.sidebarItemEls[i].routePageHandler("landing");
                break;
            }
        }
    }
    async matchHash(currentHash, deeplink) {
        for (let i = 0; i < this.sidebarItemEls.length; i++) {
            let formattedRoute = await this.sidebarItemEls[i].formatRoute();
            if (currentHash === formattedRoute) {
                await this.loadRoute(this.sidebarItemEls[i], deeplink);
                return true;
            }
            else if (formattedRoute
                && currentHash.includes(formattedRoute)
                && currentHash.includes("?reroute=")
                && this.sidebarItemEls[i].app) {
                this.reroute = true;
                await this.loadRoute(this.sidebarItemEls[i], deeplink);
                return true;
            }
        }
        return false;
    }
    async loadRoute(sidebarItem, deeplink) {
        if (!deeplink) {
            sidebarItem.routePageHandler();
        }
        else {
            sidebarItem.activate();
        }
        return true;
    }
    async checkHash(deeplink) {
        let route = this.checkIfRoot(true);
        if (route === "#/app/my-profile" ||
            (this.insHeaderUserEl && this.insHeaderUserEl.profileLink === route)) {
            await this.goToMyProfilePage(deeplink);
        }
        else if (route) {
            if (!await this.matchHash(route, false) && deeplink) {
                await this.activateSidebarFromCrumbs();
            }
        }
    }
    insSidebarFooterButtonEventHandler(event) {
        let tgt = event.target;
        if (tgt.attributes.open) {
            let open = tgt.attributes.open.value;
            let insSidebarItem = this.insSidebarEl
                .querySelector(`ins-sidebar-item[footer-link="${open}"]`);
            const mq = window.matchMedia("(min-width: 1260px)");
            if (mq.matches)
                insSidebarItem.showSubMenu();
        }
    }
    async deactivateSidebarItems() {
        for (let i = 0; i < this.sidebarItemEls.length; ++i) {
            await this.sidebarItemEls[i].deactivate();
        }
    }
    async minimise() {
        this.minimised = true;
    }
    async maximise() {
        this.minimised = false;
    }
    sidebarActionEventHandler(event) {
        this.insSidebarAction.emit(event);
    }
    getIcon() {
        return this.iconLogo ? this.iconLogo : `${this.baseURL}/insites_logo_icon.svg`;
    }
    getLogo() {
        return this.fullLogo ? this.fullLogo : `${this.baseURL}/Insites_logo.svg`;
    }
    render() {
        return (h("div", { key: 'cf888463f603ace42cf8368cea215afa072eb49a', class: `sidebar ${this.noFooter ? 'no-footer' : ''}` }, h("div", { key: '86f70c55ea6a581991da9bf187136fa6c422b442', class: "insites-logo-wrap" }, this.minimised
            ? h("img", { src: this.getIcon() })
            : h("img", { src: this.getLogo() })), h("div", { key: '5b4ecb82e879fb3985b9b331dd523f2b9cbe8c28', class: "sidebar-items-wrap" }, h("slot", { key: '440011d750b32c24fff0b03ca90a4d6a2f1147b3' }))));
    }
    get insSidebarEl() { return getElement(this); }
};

export { InsSidebar as ins_sidebar };

//# sourceMappingURL=ins-sidebar.entry.js.map