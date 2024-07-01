import { r as registerInstance, h } from './index-5ef45688.js';

const InsNotifications = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showNotifications = undefined;
        this.insNotificationsitemsEl = undefined;
    }
    async toggleNotificationshandler() {
        this.showNotifications = !this.showNotifications;
        this.insNotificationsitemsEl.forEach(function (item, i) {
            setTimeout(function () {
                item.querySelector('.ins-notifications-item-wrap').className += " show";
            }, 100 * i);
        });
    }
    componentWillLoad() {
        this.insNotificationsitemsEl = document.querySelectorAll('ins-notifications-item');
    }
    render() {
        if (this.showNotifications) {
            return (h("div", null, h("ins-backdrop", null), h("div", { class: "ins-notifications-wrap" }, h("div", { class: "ins-nw-header" }, h("h1", null, "Notifications"), h("button", { class: "ins-nwh-close", onClick: () => this.toggleNotificationshandler() }, h("i", { class: "icon-close-1" }))), h("div", { class: "ins-nw-items-wrap" }, h("div", null, h("slot", null))))));
        }
        else {
            return (h("div", { class: "hide-slot" }, h("ins-backdrop", null), h("div", { class: "ins-notifications-wrap" }, h("div", { class: "ins-nw-header" }, h("h1", null, "Notifications"), h("button", { class: "ins-nwh-close", onClick: () => this.toggleNotificationshandler() }, h("i", { class: "icon-close-1" }))), h("div", { class: "ins-nw-items-wrap" }, h("div", null, h("slot", null))))));
        }
    }
};

export { InsNotifications as ins_notifications };

//# sourceMappingURL=ins-notifications.entry.js.map