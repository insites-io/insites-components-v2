import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insInput = createEvent(this, "insInput", 7);
        this.insBlur = createEvent(this, "insBlur", 7);
        this.insIconClick = createEvent(this, "insIconClick", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.invalidHexColor = "";
        this.hasLoad = undefined;
        this.placeholder = "";
        this.value = "";
        this.label = "";
        this.name = "";
        this.field = 'text';
        this.fieldId = "";
        this.errorMessage = "";
        this.maxlength = "";
        this.min = "";
        this.max = "";
        this.step = "";
        this.required = false;
        this.icon = "";
        this.iconEvent = false;
        this.iconTitle = "";
        this.disabled = false;
        this.readonly = false;
        this.hasError = false;
        this.activated = false;
        this.unitRight = "";
        this.unitLeft = "";
        this.tooltip = "";
    }
    async setValue(value) {
        this.value = value;
        this.insValueChange.emit(this.value);
    }
    async getValue() {
        return this.value;
    }
    componentDidLoad() {
        this.adjustInputPadding();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.el);
        }
    }
    adjustInputPadding() {
        let input = this.el.querySelector('input');
        if (this.unitRight) {
            let rightEl = this.el.querySelector('.unit-right');
            let padding = rightEl.offsetWidth + 20;
            if (this.icon)
                padding = padding + 20;
            input.style.paddingRight = padding + 'px';
        }
        if (this.unitLeft) {
            let leftEl = this.el.querySelector('.unit-left');
            let padding = leftEl.offsetWidth + 16;
            input.style.paddingLeft = padding + 'px';
        }
    }
    validateMinMax(value, type = "input") {
        if (this.min !== "" && value !== "") {
            let min = Number(this.min);
            if (value < min)
                value = min;
        }
        if (this.max !== "" && value !== "") {
            let max = Number(this.max);
            if (value > max)
                value = max;
        }
        this.value = value;
        if (type === "blur") {
            let el = this.el.querySelector('.ins-form-field');
            el.value = value;
        }
    }
    onInputHandler(event) {
        let value = event.target.value;
        let keyCode = event.which || event.keyCode;
        if (this.field === "number")
            this.validateMinMax(value);
        this.insInput.emit({ value, keyCode });
    }
    insBlurHandler(event) {
        let value = event.target.value;
        let keyCode = event.which || event.keyCode;
        if (this.field === "number")
            this.validateMinMax(value, "blur");
        this.insBlur.emit({ value, keyCode });
        this.deactivateLabel();
        if (this.field === 'color')
            this.validateHexColor(value);
    }
    inputChanged(ev) {
        let val = ev.target && ev.target.value;
        this.value = val;
        this.insValueChange.emit(this.value);
    }
    onIconClickHandler() {
        if (this.iconEvent) {
            this.insIconClick.emit({
                target: this.el,
                value: this.value
            });
        }
    }
    activateLabel() {
        if (!this.readonly && !this.disabled) {
            this.activated = true;
        }
    }
    deactivateLabel() {
        this.activated = false;
    }
    colorHandler(e) {
        this.validateHexColor(e.target.value);
        this.onInputHandler(e);
        this.inputChanged(e);
    }
    validateHexColor(color) {
        if (!color)
            return this.invalidHexColor = "";
        const valid = color.match(/^#[0-9A-F]{6}$/i);
        if (valid)
            this.invalidHexColor = "";
        else
            this.invalidHexColor = "Invalid hex color.";
    }
    render() {
        return (h("div", { key: '12be0434f4d86469646faf086a49750550b76b61', class: `ins-input-wrap ins-form-field-wrap
        ${this.hasError || this.invalidHexColor ? 'is-invalid' : ''}
        ${this.icon ? "has-icon" : ""}
        ${this.field === 'color' ? "has-color" : ""}
        ${this.unitLeft ? "has-unit-left" : ""}
        ${this.unitRight ? "has-unit-right" : ""}` }, this.label || this.tooltip ?
            h("label", { htmlFor: this.name, class: `ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activated ? 'active' : ''}` }, this.label, this.tooltip
                ? h("ins-input-tooltip", { content: this.tooltip })
                : '')
            : '', h("div", { key: '6ae1f6adf573f6afde1446a4f7124e9bac0d5739', class: "input-wrap" }, this.unitLeft
            ? h("div", { class: "unit-left" }, this.unitLeft)
            : "", h("input", { key: 'ef2aeaea856b03d41b6b63cba0451e7b9c827387', class: "ins-form-field", id: this.fieldId ? this.fieldId : null, type: this.field !== 'color' ? this.field : 'text', name: this.name, placeholder: this.placeholder, required: this.required, onKeyUp: e => this.onInputHandler(e), onInput: this.inputChanged.bind(this), onFocus: () => this.activateLabel(), onBlur: e => this.insBlurHandler(e), disabled: this.disabled, maxlength: this.maxlength, readonly: this.readonly, min: this.min, max: this.max, step: this.step, value: this.value }), this.unitRight
            ? h("div", { class: "unit-right" }, this.unitRight)
            : "", this.icon ?
            h("i", { title: this.iconTitle, onClick: () => this.onIconClickHandler(), class: `icon-wrap
                ${this.label ? this.icon + ' with-label' : this.icon}
                ${this.iconEvent ? 'hover' : ''}` })
            : '', this.field === 'color' ?
            h("input", { type: "color", class: "ins-form-field color", value: this.value, disabled: this.disabled || this.readonly, onInput: e => this.colorHandler(e) })
            : ''), this.hasError || this.invalidHexColor ?
            h("div", { class: "ins-form-error" }, this.invalidHexColor ? this.invalidHexColor : this.errorMessage)
            : ''));
    }
    get el() { return getElement(this); }
};

export { InsInput as ins_input };

//# sourceMappingURL=ins-input.entry.js.map