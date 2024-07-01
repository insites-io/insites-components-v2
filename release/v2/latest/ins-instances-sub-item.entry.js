import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsInstancesSubItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routeInstanceSubItem = createEvent(this, "routeInstanceSubItem", 7);
        this.instance = "";
        this.link = "";
    }
    routeInstanceSubItemHandler() {
        this.routeInstanceSubItem.emit({
            instance: this.instance,
            link: this.link
        });
    }
    render() {
        return (h("div", { key: 'd22c60d54a986564434572e1635446403fc57af8', class: "ins-instance-sub-item" }, h("a", { key: 'f192d939c182c8ecf6a4b174fed1f4443411bb83', href: this.link, onClick: () => this.routeInstanceSubItemHandler() }, h("span", { key: 'e0cd2aed69f7b2a43347eb7694517fc9d675699f', class: "instance-sub-item-label" }, this.instance ? this.instance : 'Label'))));
    }
};

export { InsInstancesSubItem as ins_instances_sub_item };

//# sourceMappingURL=ins-instances-sub-item.entry.js.map