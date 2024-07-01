import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsRadio = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insCheck = createEvent(this, "insCheck", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.localChecked = false;
        this.hasLoad = undefined;
        this.checked = undefined;
        this.disabled = undefined;
        this.value = undefined;
        this.staticValue = undefined;
        this.name = undefined;
        this.label = undefined;
        this.tooltip = "";
    }
    async setValue(value, static_value) {
        this.value = value;
        this.staticValue = static_value;
    }
    async setChecked() {
        this.localChecked = true;
        this.checked = true;
        this.onSelectHandler();
    }
    async getValue() {
        return this.staticValue ? this.staticValue : this.value;
    }
    componentWillLoad() {
        this.checkValue();
    }
    componentWillUpdate() {
        this.checkValue();
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insRadioEl);
        }
    }
    checkValue() {
        if (this.value === this.staticValue) {
            this.localChecked = true;
        }
        else if (this.checked) {
            this.localChecked = true;
        }
        else
            this.localChecked = false;
    }
    onSelectHandler() {
        this.insCheck.emit({
            name: this.name,
            value: this.value,
        });
        if (this.staticValue) {
            this.insValueChange.emit(this.staticValue);
        }
        else
            this.insValueChange.emit(this.value);
    }
    render() {
        return (h("div", { key: '9cfb6bd26ce7f40e30fa6fe554db7c63e06ba7d5', class: "ins-radio ins-radio-checkbox" }, h("label", { key: '0dd0629600dc98e97685f0ae93e69a91afd5e997' }, h("input", { key: '097f479e1b56cefced1b24eb8f9ca0ddb75b72da', class: "ripple-check radio", onChange: () => this.onSelectHandler(), type: "radio", value: this.staticValue ? this.staticValue : this.value, name: this.name, disabled: this.disabled, checked: this.localChecked }), this.label
            ? h("span", { class: "ins-checkbox-radio-label" }, this.label)
            : ''), this.tooltip
            ? h("ins-input-tooltip", { content: this.tooltip })
            : ''));
    }
    get insRadioEl() { return getElement(this); }
};

export { InsRadio as ins_radio };

//# sourceMappingURL=ins-radio.entry.js.map