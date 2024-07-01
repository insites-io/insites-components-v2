import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSidebarFooter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
    }
    componentDidLoad() {
        let items = this.InsSidebarFooter
            .querySelectorAll('.slot-wrapper .ins-sidebar-footer-item-wrap');
        for (let i = 0; i < items.length; i++) {
            items[i].style.width = `${100 / items.length}%`;
        }
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.InsSidebarFooter);
        }
    }
    async toggleSidebar() {
        let menuBar = document.querySelector("ins-header");
        if (menuBar)
            menuBar.toggleSidebar();
    }
    render() {
        return (h("div", { key: 'e36825130e1dc47519ed25bbcf68271a16e22744', class: "ins-sidebar-footer-wrap" }, h("ins-sidebar-footer-button", { key: 'f10d5b113bdb9294052d1463b57f034b6968d2ef', class: "ins-sidebar-footer-menu-toggle", icon: "icon-more-vertical", onClick: () => this.toggleSidebar() }), h("div", { key: 'e1e58359aad3b569726498f4e63a1753ee34d985', class: "slot-wrapper" }, h("slot", { key: 'b04e42619eee9b50e1e144ebe2c3dbcb8f70709e' }))));
    }
    get InsSidebarFooter() { return getElement(this); }
};

export { InsSidebarFooter as ins_sidebar_footer };

//# sourceMappingURL=ins-sidebar-footer.entry.js.map