import { r as registerInstance, h, g as getElement } from './index-5ef45688.js';

const InsNotificationsItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.eventType = undefined;
        this.heading = undefined;
        this.duration = undefined;
        this.desc = undefined;
        this.icon = undefined;
        this.status = undefined;
        this.link = undefined;
        this.linkLabel = undefined;
    }
    render() {
        return (h("div", { key: '47384aa7fb7a1b1cd9978d6170e9771f1b1707b0', class: "ins-notifications-item-wrap" }, h("div", { key: 'b122b5b5fc9cf81b256d3b2f8c372e77ff4c2e19', class: 'ins-niw-status-wrap ' + this.status }, h("i", { key: 'b3125cc15f1b6333860fffddc770ae38c98419d5', class: this.icon })), h("h2", { key: '65b473e3bdbca036606aacd7e98a19054b0ef92d' }, this.eventType), this.heading ?
            h("h3", null, this.heading) : '', h("p", { key: 'f4c4ee62eb783e04f97d0a80e44a676d8c50f68a', class: "ins-niw-ago-wrap" }, this.duration), this.desc ?
            h("p", null, this.desc, this.link ?
                h("a", { href: this.link }, this.linkLabel) : '') : this.link ?
            h("p", null, h("a", { href: this.link, class: "link-only" }, this.linkLabel)) : ''));
    }
    get InsNotificationsItemEl() { return getElement(this); }
};

export { InsNotificationsItem as ins_notifications_item };

//# sourceMappingURL=ins-notifications-item.entry.js.map