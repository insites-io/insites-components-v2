import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insTabChange = createEvent(this, "insTabChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.tabs = [];
        this.activeTab = "";
        this.activeTabIndex = 0;
        this.insTabItems = [];
        this.insTabHeaders = [];
    }
    onchangeTabHandler(event, index) {
        if (!this.insTabItems[index].disabled &&
            !this.insTabItems[index].active) {
            this.setActiveTab(index);
            this.setActiveTabItem(index);
            this.insTabChange.emit({
                event: event,
                index: index,
                label: this.insTabHeaders[index].innerText.trim()
            });
        }
    }
    getTabItemsEl() {
        return this.insTabEl.querySelectorAll(":scope ins-tab-item");
    }
    getTabHeadersEl() {
        return this.insTabEl.querySelectorAll(":scope > .ins-tab > .ins-tab-headers > .ins-tab-header");
    }
    getDefaulTabLabel(index) {
        return `Tab ${index + 1}`;
    }
    getTabHeaders() {
        let tabHeaders = this.getTabHeadersEl();
        let headers = [];
        for (let i = 0; i < tabHeaders.length; i++) {
            let item = tabHeaders[i];
            headers.push(item);
        }
        return headers;
    }
    getTabItems() {
        let tabItems = this.getTabItemsEl();
        let options = [];
        for (let i = 0; i < tabItems.length; i++) {
            if (tabItems[i].closest('ins-tab') === this.insTabEl) {
                let item = tabItems[i];
                options.push(item);
            }
        }
        return options;
    }
    getActiveTabLabelIndex() {
        for (let i = 0; i < this.insTabItems.length; i++) {
            let item = this.insTabItems[i];
            if (item.active) {
                this.activeTab = item.label ?
                    item.label.value :
                    this.getDefaulTabLabel(i);
                this.activeTabIndex = i;
                break;
            }
        }
    }
    setActiveTab(index) {
        this.insTabHeaders.forEach(item => {
            item.classList.remove('active');
        });
        let el = this.insTabHeaders[index];
        if (el)
            el.classList.add('active');
    }
    setDisabledTabs() {
        let indexes = [];
        this.insTabItems.forEach((item, index) => {
            if (item.attributes.disabled) {
                indexes.push(index);
            }
        });
        this.insTabHeaders.forEach((item, index) => {
            if (indexes.indexOf(index) !== -1) {
                item.classList.add('disabled');
            }
            else {
                item.classList.remove('disabled');
            }
        });
    }
    setActiveTabItem(index) {
        this.insTabItems.forEach(item => {
            item.deactivate();
        });
        this.insTabItems[index].activate();
    }
    setScrollableHeaders() {
        let scrollWidth = 0;
        let insTabContainer = this.insTabEl.querySelector('.ins-tab-headers');
        let scrollWidthContainer = insTabContainer.clientWidth;
        this.insTabHeaders.forEach(item => {
            scrollWidth += item.clientWidth;
        });
        if (scrollWidth > scrollWidthContainer) {
            insTabContainer.classList.add('scrollable');
        }
        else {
            insTabContainer.classList.remove('scrollable');
        }
    }
    setTabLabel(item, index) {
        return item.label ?
            item.label :
            this.getDefaulTabLabel(index);
    }
    setTabIcon(item) {
        return item.icon ?
            item.icon : '';
    }
    componentWillLoad() {
        this.insTabItems = this.getTabItems();
        this.getActiveTabLabelIndex();
    }
    componentDidLoad() {
        this.insTabHeaders = this.getTabHeaders();
        this.setActiveTab(this.activeTabIndex);
        this.setDisabledTabs();
        this.setActiveTabItem(this.activeTabIndex);
        this.setScrollableHeaders();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insTabEl);
        }
    }
    async activateTab(place) {
        let index = place - 1;
        this.insTabChange.emit({
            event: this.insTabItems[index],
            index: index,
            label: this.insTabHeaders[index].innerText.trim()
        });
        this.setActiveTab(index);
        this.setActiveTabItem(index);
    }
    tabItemDisableToggledHandler(event) {
        let tabIndex = this.insTabItems.indexOf(event.target);
        if (this.insTabHeaders[tabIndex]) {
            if (event.detail) {
                this.insTabHeaders[tabIndex].classList.add('disabled');
            }
            else {
                this.insTabHeaders[tabIndex].classList.remove('disabled');
            }
        }
    }
    checkForErrors(event) {
        let errorIndex = this.insTabItems.indexOf(event.target);
        if (this.insTabHeaders[errorIndex]) {
            if (event.detail) {
                this.insTabHeaders[errorIndex].classList.add('has-error');
            }
            else {
                this.insTabHeaders[errorIndex].classList.remove('has-error');
            }
        }
    }
    render() {
        return (h("div", { key: '0a0360b310cb205a0e4483ab7979a278e08d293a', class: "ins-tab" }, h("ul", { key: 'bd65ebf4f13a119147bd90b753489d3911a580df', class: "ins-tab-headers", onMouseOver: () => this.setScrollableHeaders() }, this.insTabItems.map((item, index) => {
            return (h("li", { class: `ins-tab-header ${item.hasError ? 'has-error' : ''}`, onClick: e => this.onchangeTabHandler(e, index) }, item.icon ? h("span", { class: `${item.icon}` }) : '', " ", item.icon && !item.label ? '' : h("span", null, this.setTabLabel(item, index))));
        })), h("slot", { key: '5f606f3766d3919d192d3a0942ad16c17ddc3244' })));
    }
    get insTabEl() { return getElement(this); }
};

export { InsTab as ins_tab };

//# sourceMappingURL=ins-tab.entry.js.map