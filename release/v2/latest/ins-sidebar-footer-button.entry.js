import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSidebarFooterButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insSidebarFooterButtonEvent = createEvent(this, "insSidebarFooterButtonEvent", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.icon = '';
        this.open = '';
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insSidebarFooterButtonEl);
        }
    }
    async insSidebarFooterButtonOnClick(event) {
        this.insSidebarFooterButtonEvent.emit(event);
    }
    render() {
        if (this.icon) {
            return (h("div", { key: '4fc3d6881379342cf8b82c9433a52909897cbe02', class: "ins-sidebar-footer-item-wrap" }, h("button", { key: '813a8954dc8d18db318d2afe92f297bba050d912', class: "ins-sfiw-button", onClick: event => this.insSidebarFooterButtonOnClick(event) }, this.icon ?
                h("i", { class: `ins-sfiw-button-icon ${this.icon}` }) : '')));
        }
    }
    get insSidebarFooterButtonEl() { return getElement(this); }
};

export { InsSidebarFooterButton as ins_sidebar_footer_button };

//# sourceMappingURL=ins-sidebar-footer-button.entry.js.map