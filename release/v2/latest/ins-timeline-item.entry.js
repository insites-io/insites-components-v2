import { r as registerInstance, h, g as getElement } from './index-5ef45688.js';

const InsTimelineItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icon = undefined;
        this.color = undefined;
        this.solid = false;
        this.heading = undefined;
        this.datetime = undefined;
        this.inline = true;
    }
    render() {
        return (h("div", { key: 'b454302f360467119c8295f9bdbe0f3fb7a38d0e', class: "ins-timeline-item-wrap" }, h("div", { key: '17b2cdb47d7be5afe3e8d0082a0181e41695b5a9', class: `ins-icon-wrap ${!this.icon ? 'no-icon' : ''} ${this.color ? this.color : ''} ${this.solid ? 'solid' : ''}` }, this.icon ? h("span", { class: this.icon }) : ''), h("div", { key: 'dd4420c9d34f6c59cd845939f0a74ab8163a670a', class: "ins-timeline-body" }, h("div", { key: 'bed93da2959d05e15c189a6fc945f7fe8747ba4b', class: `ins-timeline-content ${this.inline ? 'inline-content' : ''}` }, this.heading ?
            h("div", { class: "ins-timeline-heading" }, h("h6", null, this.heading))
            : '', h("slot", { key: 'a3f918b27213efc3775dce2bf7ed98ebf96c41a3', name: "content" }), this.datetime ?
            h("div", { class: "ins-timeline-datetime" }, h("p", null, this.datetime)) : ''), h("div", { key: 'e0ec1169bd22a1ad7c9ecd8489fc352e7cc1b8ee', class: `ins-timeline-actions ${this.inline ? 'inline-content' : ''}` }, h("slot", { key: 'a236f2a2bc76ec9f6d6e5a90f8ddb87a29c84fd7', name: "actions" })))));
    }
    get insTimelineItem() { return getElement(this); }
};

export { InsTimelineItem as ins_timeline_item };

//# sourceMappingURL=ins-timeline-item.entry.js.map