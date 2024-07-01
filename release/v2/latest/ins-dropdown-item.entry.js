import { r as registerInstance, h } from './index-5ef45688.js';

const InsDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = "";
        this.link = "";
        this.target = "_self";
        this.linkTitle = "";
        this.submenu = false;
    }
    renderSubmenu() {
        return (h("div", { class: "ins-dropdown-item submenu" }, h("div", { class: "ins-dropdown-item_label" }, this.label, h("i", { class: "icon-angle-right" })), h("div", { class: "ins-dropdown-item_submenu" }, h("div", { class: "ins-dropdown-item_submenu-card" }, h("slot", null)))));
    }
    render() {
        if (!this.label)
            return "";
        if (this.submenu)
            return this.renderSubmenu();
        return (h("a", { class: `ins-dropdown-item`, href: this.link, target: this.target, title: this.linkTitle }, this.label));
    }
};

export { InsDropdown as ins_dropdown_item };

//# sourceMappingURL=ins-dropdown-item.entry.js.map