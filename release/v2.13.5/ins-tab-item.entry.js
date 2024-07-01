import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsTabItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insTabError = createEvent(this, "insTabError", 7);
        this.insTabDisableToggle = createEvent(this, "insTabDisableToggle", 7);
        this.active = undefined;
        this.label = "";
        this.icon = "";
        this.noPadding = undefined;
        this.disabled = undefined;
        this.hasError = undefined;
    }
    async deactivate() {
        this.active = false;
    }
    async activate() {
        this.active = true;
    }
    watchHandler() {
        this.insTabError.emit(this.hasError);
    }
    disabledWatcher() {
        this.insTabDisableToggle.emit(this.disabled);
    }
    render() {
        return (h("div", { key: '1419de954405f11ab4bfc584859fc2826a57220d', class: `${this.noPadding ? 'no-padding' : ''}${this.active ? ' active' : ''}` }, h("slot", { key: '05b75bfec4e2d1becd5bc67437c8d916cab52451' })));
    }
    get InsTabItemEl() { return getElement(this); }
    static get watchers() { return {
        "hasError": ["watchHandler"],
        "disabled": ["disabledWatcher"]
    }; }
};

export { InsTabItem as ins_tab_item };

//# sourceMappingURL=ins-tab-item.entry.js.map