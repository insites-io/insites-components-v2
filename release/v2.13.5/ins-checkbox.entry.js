import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsCheckbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insCheck = createEvent(this, "insCheck", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.checked = undefined;
        this.disabled = undefined;
        this.value = undefined;
        this.trueValue = "";
        this.falseValue = "";
        this.label = undefined;
        this.name = "";
        this.tooltip = "";
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insCheckboxEl);
        }
    }
    onValueChangeHandler() {
        let toEmit = this.value;
        if (this.checked && this.trueValue) {
            toEmit = this.trueValue;
        }
        else if (!this.checked && this.falseValue) {
            toEmit = this.falseValue;
        }
        this.insValueChange.emit(toEmit);
    }
    onCheckHandler() {
        this.checked = !this.checked;
        this.insCheck.emit({
            name: this.name,
            checked: this.checked,
            value: this.value,
            trueValue: this.trueValue,
            falseValue: this.falseValue
        });
        this.onValueChangeHandler();
    }
    async updateCheckState(state) {
        this.checked = state;
    }
    async setValue(value, trueValue, falseValue) {
        this.value = value;
        this.trueValue = trueValue;
        this.falseValue = falseValue;
        this.onValueChangeHandler();
    }
    async getValue() {
        return {
            value: this.value,
            trueValue: this.trueValue,
            falseValue: this.falseValue
        };
    }
    render() {
        return (h("div", { key: '3f943fb31e98655c1d1f21f64500fc904e8e97ed', class: "ins-checkbox-wrap ins-radio-checkbox" }, h("label", { key: '4f809c576da427dd862d28b63c849cbea1dd0aa5' }, h("input", { key: 'eebd79e7881752e362158bbdfa04bb9b01349c0c', type: "checkbox", name: this.name ? this.name : '', disabled: this.disabled, class: "ripple-check", onChange: () => this.onCheckHandler(), checked: this.checked, value: this.value, "true-value": this.trueValue, "false-value": this.falseValue }), this.label
            ? h("span", { class: "ins-checkbox-radio-label" }, this.label)
            : ''), this.tooltip
            ? h("ins-input-tooltip", { content: this.tooltip })
            : ''));
    }
    get insCheckboxEl() { return getElement(this); }
};

export { InsCheckbox as ins_checkbox };

//# sourceMappingURL=ins-checkbox.entry.js.map