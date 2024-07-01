import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInfoTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.noWrap = false;
        this.heading = undefined;
        this.loadingScreen = false;
        this.loaderTitle = "Just a moment";
        this.loaderMessage = "We are processing your request";
        this.loaderIcon = "processing";
        this.tableData = [];
        this.emptyValue = '-';
        this.textOverflow = 'ellipsis';
        this.renderHtml = false;
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insInfoTableEl);
        }
    }
    renderTableItems(item) {
        let myValue, myKey;
        for (let key in item) {
            myKey = key;
            myValue = item[key];
        }
        return (h("div", { class: "ift-row" }, h("div", { class: `ift-cell ift-label ${this.textOverflow === "ellipsis" ? 'overflow-ellipsis' : ''}` }, this.renderHtml ? h("div", { class: "ift-html", innerHTML: myKey })
            : myKey ? myKey : this.emptyValue), h("div", { class: `ift-cell ift-content ${this.textOverflow === "ellipsis" ? 'overflow-ellipsis' : ''}` }, this.renderHtml ? h("div", { class: "ift-html", innerHTML: myValue ? myValue : this.emptyValue })
            : myValue ? myValue : this.emptyValue)));
    }
    buildInfoTable() {
        return (h("div", { class: "ift-table-content" }, this.heading ? h("div", { class: "ift-table-wrap__title" }, this.heading) : '', h("div", { class: "ift-table" }, this.tableData.length ?
            this.tableData.map(this.renderTableItems.bind(this))
            :
                h("div", { class: "ift-row" }, h("div", { class: "ift-cell no-data" }, "No Data")))));
    }
    render() {
        return (h("div", { key: 'bc42bdffcdb8766ae6f499156b8ffeef9022ac69', class: `ift-table-wrap ${this.noWrap ? 'no-wrap' : ''}` }, this.loadingScreen ?
            h("div", { class: `loading-screen` }, h("ins-loader", { "state-title": this.loaderTitle, "state-message": this.loaderMessage, "state-icon": this.loaderIcon }))
            : this.buildInfoTable()));
    }
    get insInfoTableEl() { return getElement(this); }
};

export { InsInfoTable as ins_info_table };

//# sourceMappingURL=ins-info-table.entry.js.map