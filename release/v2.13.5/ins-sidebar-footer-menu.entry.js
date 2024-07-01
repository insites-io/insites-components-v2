import { r as registerInstance, h } from './index-5ef45688.js';

const InsSidebarFooterMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icon = 'icon-settings-1';
        this.label = 'Settings';
        this.menuToggled = false;
    }
    async toggleMenu() {
        this.menuToggled = !this.menuToggled;
    }
    async hideMenu() {
        this.menuToggled = false;
    }
    async showMenu() {
        this.menuToggled = true;
    }
    mouseLeaveHandler() {
        let insAdminEl = document.querySelector('body');
        if (insAdminEl.className.includes('mini')) {
            this.hideMenu();
        }
    }
    render() {
        if (this.icon) {
            return (h("div", { key: 'f5e6ee218eb1f332d0764a40cdb8ca59310508e3', class: "ins-sidebar-footer-item-wrap" }, h("button", { key: '78153980b14514903495ed02c0843cfa52b93f2d', class: "ins-sfiw-button", onClick: () => this.toggleMenu() }, this.icon ?
                h("i", { class: `ins-sfiw-button-icon ${this.icon}` }) : ''), h("div", { key: '3a79ab27e71963e3217a8bd9b399d0c19ce9a181', class: `menu-item-wrap ${this.menuToggled ? 'visible' : ''} `, onMouseLeave: () => this.mouseLeaveHandler() }, h("button", { key: 'b35a8977b54ecc476af3267389a133def90109e6', class: "ins-sfiw-button-back", onClick: () => this.toggleMenu() }, h("i", { key: '9e369776ae0f66cdeefce08004531cddc2aea528', class: "fas icon-chevron-left" }), h("span", { key: '15c76ca274eea4f4061484f3f337dc9d41879735', class: "ins-sfiw-button-label" }, this.label ? this.label : 'Back')), h("slot", { key: 'ee7e112f51d3d888fa7a8049f0b55ec21a6c52ff' }))));
        }
    }
};

export { InsSidebarFooterMenu as ins_sidebar_footer_menu };

//# sourceMappingURL=ins-sidebar-footer-menu.entry.js.map