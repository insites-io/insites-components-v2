import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsToggleSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insToggle = createEvent(this, "insToggle", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.name = undefined;
        this.checked = undefined;
        this.value = undefined;
        this.trueValue = "";
        this.falseValue = "";
        this.label = undefined;
        this.disabled = undefined;
        this.enabledLabel = undefined;
        this.disabledLabel = undefined;
        this.tooltip = "";
    }
    async setValue(value, trueValue, falseValue) {
        this.value = value;
        this.trueValue = trueValue;
        this.falseValue = falseValue;
    }
    async updateCheckState(state) {
        this.checked = state;
        this.emitEvents();
    }
    async getValue() {
        return {
            value: this.value,
            trueValue: this.trueValue,
            falseValue: this.falseValue
        };
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insToggleSwitchEl);
        }
    }
    onCheckHandler() {
        this.checked = !this.checked;
        this.emitEvents();
    }
    emitEvents() {
        this.insToggle.emit({
            checked: this.checked,
            value: this.value
        });
        let toEmit = this.value;
        if (this.checked && this.trueValue) {
            toEmit = this.trueValue;
        }
        else if (!this.checked && this.falseValue) {
            toEmit = this.falseValue;
        }
        this.insValueChange.emit(toEmit);
    }
    constructLabel() {
        if (this.checked) {
            return this.enabledLabel ? this.enabledLabel : this.label;
        }
        return this.disabledLabel ? this.disabledLabel : this.label;
    }
    render() {
        return (h("div", { key: '90480455414c4b26e62824442bac4ebf90c0aa9c', class: `v-switch ${this.disabled ? 'disabled' : ''}` }, h("label", { key: '982460b71fc4297973690e921383c17cadaaa7c4', class: "ins-switch" }, h("input", { key: '8e58a35de39aef184719413db739331bd21e0b22', type: "checkbox", checked: this.checked, name: this.name, onChange: () => this.onCheckHandler(), disabled: this.disabled }), h("span", { key: '7c3869421434bbb95155b072413a271fb808b666', class: "ins-slider round" }, h("i", { key: '1821b9eb704ef72ca938f70ece2754ce604238bc' })), h("span", { key: '916e79475fff7b584459c90a082fcaf4d1788a47', class: "ins-label" }, this.constructLabel())), this.tooltip
            ? h("ins-input-tooltip", { content: this.tooltip })
            : ''));
    }
    get insToggleSwitchEl() { return getElement(this); }
};

export { InsToggleSwitch as ins_toggle_switch };

//# sourceMappingURL=ins-toggle-switch.entry.js.map