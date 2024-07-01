import { r as registerInstance, h } from './index-5ef45688.js';

const InsDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = "Dropdown";
        this.lined = false;
        this.link = "";
        this.target = "_self";
        this.linkTitle = "";
    }
    render() {
        return (h("div", { key: 'b5587b1ffc32d373628bd0b29a8a289e511d697e', class: `ins-dropdown ${this.lined ? "lined" : ""}` }, h("div", { key: '590c73a5ad0ce7b8d532e24a9ac1bd90b96505bb', class: "ins-dropdown_label" }, this.link
            ? h("a", { href: this.link, target: this.target, title: this.linkTitle }, this.label)
            : h("span", null, this.label), h("i", { key: 'affb7373d4496a5ec4a6b8502f732dfaf562aa62', class: "icon-angle-down" })), h("div", { key: 'eba408b9f6a592282c665134e9a0164092545c1f', class: "ins-dropdown_menu" }, h("div", { key: '4efcdeeca61662a196c97c795eb43333c702f77b', class: "ins-dropdown_menu-card" }, h("slot", { key: 'e5ae638272168c44ab19b385e9bab86c47c46db4' })))));
    }
};

export { InsDropdown as ins_dropdown };

//# sourceMappingURL=ins-dropdown.entry.js.map