import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClick = createEvent(this, "insClick", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.activeOption = "";
        this.options = "";
        this.size = 'normal';
        this.color = 'blue';
        this.disabled = undefined;
        this.activeIndex = 0;
        this.buttonOptions = [];
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insButtonGroupEl);
        }
    }
    async getActiveOption() {
        return {
            index: this.activeIndex,
            label: this.buttonOptions[this.activeIndex]
        };
    }
    async setActiveOption(option) {
        if (this.buttonOptions.indexOf(option) !== -1) {
            this.activeIndex = this.buttonOptions.indexOf(option);
        }
    }
    activeIndexHandler() {
        let list = Array.from(this.insButtonGroupEl.querySelectorAll('button'));
        list.forEach((element) => {
            element.classList.remove('active');
        });
        list[this.activeIndex].classList.add('active');
    }
    buttonActionHandler(action, label, index) {
        this.activeIndex = index;
        this.insClick.emit({ action, label, index });
    }
    componentWillLoad() {
        if (this.options) {
            this.options.split(',').map((item) => {
                this.buttonOptions.push(item.trim());
            });
        }
        if (this.buttonOptions.indexOf(this.activeOption) !== -1) {
            this.activeIndex = this.buttonOptions.indexOf(this.activeOption);
        }
    }
    render() {
        return (h("div", { key: '36e86515cb830155f99463811ec067ff937c895c', class: `ins-button-group ${this.size}` }, this.buttonOptions.map((item, index) => {
            return (h("button", { type: "button", disabled: this.disabled, onClick: () => this.buttonActionHandler('buttonItemClick', item, index), class: `${this.activeIndex === index ? 'active' : ''} ${this.color}` }, item));
        })));
    }
    get insButtonGroupEl() { return getElement(this); }
    static get watchers() { return {
        "activeIndex": ["activeIndexHandler"]
    }; }
};

export { InsButtonGroup as ins_button_group };

//# sourceMappingURL=ins-button-group.entry.js.map