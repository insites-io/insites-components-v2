import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsFilterItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insSelect = createEvent(this, "insSelect", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.name = 'Category Label';
        this.options = ["Category 1", "Category 2", "Category 3"];
        this.selected = undefined;
        this.dropDownState = false;
    }
    optionsUpdate() {
        this.setOptions();
    }
    async closeFilter() {
        this.dropDownState = false;
    }
    async getSelected() {
        return {
            name: this.name,
            option: this.currentFilter
        };
    }
    toggleDropDown() {
        this.dropDownState = !this.dropDownState;
    }
    addClickOutside() {
        window.addEventListener("click", e => {
            let target = e.target;
            let closest = target.closest(".filter-item__button");
            if (closest !== this.optionsWrapEl) {
                this.closeFilter();
            }
        });
    }
    componentWillLoad() {
        this.setOptions();
    }
    componentDidLoad() {
        this.optionsWrapEl = this.el.querySelector('.filter-item__button');
        this.addClickOutside();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.el);
        }
    }
    setOptions() {
        if (typeof this.options === 'string') {
            if (this.isJSON(this.options)) {
                this._options = JSON.parse(this.options);
            }
            if (!Array.isArray(this._options)) {
                this._options = ['All'];
            }
        }
        else
            this._options = this.options;
        if (this._options) {
            if (this.selected && this._options.includes(this.selected)) {
                this.currentFilter = this.selected;
            }
            else
                this.currentFilter = this._options[0];
        }
    }
    filterHandler(option) {
        if (this.currentFilter !== option) {
            this.insSelect.emit({
                name: this.name,
                option
            });
            this.currentFilter = option;
            this.closeFilter();
        }
    }
    isJSON(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    render() {
        return (h("div", { key: 'b3971bf5bc4913c8e4a9ab3488b2b9b9768653f6', class: "filter-item" }, h("div", { key: '163c8a0ad9a67e622cef3ee1b2374dd9293952b2', class: "filter-item__button", onClick: () => this.toggleDropDown() }, h("span", { key: '5d72a7ab14d2ce86ab92dd5a68b9e193b3da44a7', class: "filter-item__button--text" }, this.name, ": "), h("span", { key: '733c80976cdafb7bddea9c9951ba7b3a9775b7da', class: "filter-item__button--option" }, this.currentFilter, h("i", { key: '7589ad3ec6e14cec2abd32c6783089f098315209', class: "fas icon-caret-down" }))), h("div", { key: '9c4113a82625c8313ed5d2c37eeda4fef9cdc3d7', class: `filter-item__options ${this.dropDownState ? 'active' : ''}` }, this._options.map((option) => h("div", { class: this.currentFilter === option ? 'selected' : '', "data-val": option, onClick: () => this.filterHandler(option) }, option)))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "options": ["optionsUpdate"]
    }; }
};

export { InsFilterItem as ins_filter_item };

//# sourceMappingURL=ins-filter-item.entry.js.map