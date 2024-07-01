import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsHeaderUser = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routePage = createEvent(this, "routePage", 7);
        this.name = 'User';
        this.logoutLabel = 'Logout';
        this.profileLabel = 'My Profile';
        this.logoutLink = '';
        this.profileLink = '#/my-profile';
        this.app = undefined;
        this.formattedRoute = undefined;
        this.dropDownState = undefined;
    }
    toggleDropDown() {
        this.dropDownState = !this.dropDownState;
    }
    async renderMyProfile() {
        let newRoute = {
            link: this.profileLink,
            app: this.app,
            label: 'My Profile',
            withSubmenu: false
        };
        let currentCrumbs = JSON.parse(window.localStorage.getItem('ins_breadcrumbs'));
        let insRendererEl = parent.document.querySelector('ins-renderer');
        if (currentCrumbs[currentCrumbs.length - 1].label !== 'My Profile') {
            currentCrumbs.push(newRoute);
            insRendererEl.updateRoute(currentCrumbs, true, true);
        }
    }
    async routePageHandler() {
        this.deactivateRoutes();
        this.toggleDropDown();
        await this.routeMyProfile();
    }
    routePageHandlerMobile() {
        this.routePageHandler();
        let insHeaderEl = document.querySelector('ins-header');
        insHeaderEl.toggleNav();
    }
    deactivateRoutes() {
        let allSidebarItems = document.querySelectorAll('ins-sidebar-item');
        for (let i = 0; i < allSidebarItems.length; i++) {
            allSidebarItems[i].deactivate();
        }
    }
    formatRoute() {
        this.formattedRoute = this.profileLink;
        if (this.app) {
            this.formattedRoute = '#/app/my-profile';
        }
    }
    componentWillLoad() {
        this.formatRoute();
        this.insRendererEl = document.querySelector('ins-renderer');
    }
    async routeMyProfile() {
        await this.insRendererEl.updateRoute([{
                link: this.profileLink,
                app: this.app,
                label: 'My Profile',
                withSubmenu: false
            }], false, this.app);
    }
    render() {
        return (h("div", { key: '1109eb880b27e7dd8365c6f2d42ebc35806ecbbf', class: this.dropDownState ? 'ins-header-user-wrap active' : 'ins-header-user-wrap' }, h("div", { key: '81779238d4b30d6accc74744adb2a8d049bcd2da', class: "ins-header-desktop-view" }, h("button", { key: '12ff4ddc5f9db63875e8ae3cec9832ef563e4b40', class: "btn-nav ins-huw-toggle" }, this.name, h("i", { key: '89fe81749db384acfcf4c246f214c83d92fa5ef5', class: "toggle-icon icon-keyboard-arrow-up" }), h("i", { key: 'b283b74be61374114fa089494ed019a087462622', class: "toggle-icon icon-keyboard-arrow-down" })), h("div", { key: '2e26fec58b08c411bdd6634e459c1737d7b6021d', class: "ins-header-user-options" }, h("ins-card", { key: '149055da85c487047a274fbf7a795e354d2fa914', steady: true }, h("ul", { key: 'b6870cb065c0c7216b3d92a309619d6b0681b8c6' }, h("li", { key: '672c6c34c357042608530c41d7d28cb0a55eb86b' }, h("a", { key: '46a736e64160a3d888aa9831108538ed77681771', id: "myProfile", href: this.formattedRoute, onClick: () => this.routePageHandler() }, h("i", { key: '1fd8781a2078e78f1c33db21a46226b3b5b77c88', class: "icon-person" }), " ", this.profileLabel)), h("slot", { key: 'c95ddd42dc1625d45d2adf9b3b308cd53204394b' }), h("li", { key: '6843545ce61879a8b71e36242f43d066d519fb21' }, h("a", { key: '122e366d85216ce016fac840c1060b3b34bec195', href: this.logoutLink, onClick: () => this.toggleDropDown() }, h("i", { key: '398303f397d30b6119413e138c4fa93b0ea3541e', class: "icon-exit-to-app" }), " ", this.logoutLabel)))))), h("div", { key: '0dc2f3eb3558f569b7a5e2573721c52f8dc090d6', class: "ins-header-mobile-view" }, h("div", { key: '89d70738adb97426738abddfa6861f769aee6470', class: "ins-header-mobile-view__user" }, h("i", { key: '9727903588a0647b4bc94cc8e76f144bd3be709f', class: "icon-user-1" }), h("a", { key: 'd0011878fe5a9a66b2f06a079128e4681acf837a', id: "myProfile", href: this.formattedRoute, onClick: () => this.routePageHandlerMobile() }, this.name)), h("div", { key: 'b5bc2d35309b39c73a0ec2636a3371efbb240cac', class: "ins-header-mobile-view__options" }, h("slot", { key: '45cb0f165209f38a48857b7d1017c0936b6dae09' })), h("div", { key: '40a3de8d5ed505c63ad30acc2d0b489570baccfa', class: "ins-header-mobile-view__logout" }, h("i", { key: 'b436498fa080585e238713d04014d44d5666cf63', class: "icon-logout-1" }), h("a", { key: '4ae63e9b9e63bf01004aa75f3a793d9608ef6cfe', href: this.logoutLink }, this.logoutLabel)))));
    }
};

export { InsHeaderUser as ins_header_user };

//# sourceMappingURL=ins-header-user.entry.js.map