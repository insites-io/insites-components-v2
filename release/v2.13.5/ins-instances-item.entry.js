import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInstancesItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routeInstance = createEvent(this, "routeInstance", 7);
        this.activeSubItem = createEvent(this, "activeSubItem", 7);
        this.logoLink = "";
        this.instance = "";
        this.instanceLink = "";
        this.withSubItem = false;
        this.subItemState = undefined;
    }
    routeInstanceHandler() {
        this.routeInstance.emit({
            instance: this.instance,
            logoLink: this.logoLink,
            withSubItem: this.withSubItem
        });
        this.subItemState = true;
    }
    emitActiveSubItem() {
        this.activeSubItem.emit();
        this.subItemState = false;
    }
    render() {
        return (h("div", { key: 'a90eb92714e9bfa446c7784194be5137cded4686', class: `ins-instances-item-wrap ${this.subItemState ? 'sub-item-active' : ''}` }, h("a", { key: '70f85f72c92e84e6848a4a4754a4020dcde76bb6', href: this.instanceLink, onClick: () => this.routeInstanceHandler(), class: "ins-instances-item" }, h("div", { key: '92f5243faab2fe6818fe5fb59cf9f3cca0e5b5de', class: "logo-wrap" }, h("img", { key: 'bf6e847ae47fbad77eb73c1e83003caadf071cd5', src: this.logoLink ? this.logoLink : '' })), h("span", { key: 'f5e39379dd7dde024e9adf2b495f65d33728aa20', class: "instance-label" }, this.instance ? this.instance : 'Label'), h("i", { key: 'b7378a11488f05341e35215c63d495655a042919', class: "icon-chevron-right" })), this.withSubItem ? (h("div", { class: "instance-sub-item__container" }, h("a", { onClick: () => this.emitActiveSubItem() }, h("i", { class: "fas icon-chevron-left" }), h("span", null, this.instance)), h("slot", null))) : ("")));
    }
    get el() { return getElement(this); }
};

export { InsInstancesItem as ins_instances_item };

//# sourceMappingURL=ins-instances-item.entry.js.map