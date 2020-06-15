import { r as registerInstance, c as createEvent, h, d as getElement } from './core-10939d33.js';

const InsInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.disabled = false;
        this.readonly = false;
        this.hasError = false;
        this.activated = false;
        this.oninput = createEvent(this, "oninput", 7);
        this.onblur = createEvent(this, "onblur", 7);
    }
    oninputHandler(event) {
        let x = event.which || event.keyCode;
        this.oninput.emit({
            value: event.target.value,
            keyCode: x
        });
    }
    onblurHandler(event) {
        let x = event.which || event.keyCode;
        this.onblur.emit({
            value: event.target.value,
            keyCode: x
        });
        this.deactivateLabel();
    }
    inputChanged(ev) {
        let val = ev.target && ev.target.value;
        this.value = val;
    }
    activateLabel() {
        if (!this.readonly && !this.disabled) {
            this.activated = true;
        }
    }
    deactivateLabel() {
        this.activated = false;
    }
    render() {
        return (h("div", { class: "ins-input-wrap" }, h("div", { class: `ins-sw-in ${this.hasError ? 'is-invalid' : ''}` }, this.label ?
            h("label", { htmlFor: this.name, class: `
                ${this.disabled ? 'disabled' : ''}
                ${this.activated ? 'active' : ''}` }, this.label)
            : '', h("div", { class: "input-wrap" }, h("input", { type: this.field, id: this.fieldId ? this.fieldId : null, name: this.name, placeholder: this.placeholder, value: this.value, required: this.required, onKeyUp: e => this.oninputHandler(e), onInput: this.inputChanged.bind(this), onFocus: () => this.activateLabel(), onBlur: e => this.onblurHandler(e), class: "ins-form-field", disabled: this.disabled, maxlength: this.maxlength, readonly: this.readonly, min: this.min, max: this.max, step: this.step }), this.icon ? h("i", { class: this.label ? this.icon + ' with-label' : this.icon }) : ''), this.hasError ?
            h("div", { class: "ins-form-error" }, this.errorMessage)
            : '')));
    }
    get el() { return getElement(this); }
};

export { InsInput as ins_input };
