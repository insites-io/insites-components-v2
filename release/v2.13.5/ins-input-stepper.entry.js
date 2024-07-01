import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsStepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insBlur = createEvent(this, "insBlur", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.label = "";
        this.name = "";
        this.step = "1";
        this.min = undefined;
        this.max = undefined;
        this.value = undefined;
        this.required = false;
        this.disabled = false;
        this.readonly = false;
        this.hasError = false;
        this.errorMessage = "";
        this.tooltip = "";
    }
    async getValue() {
        return this.value;
    }
    async setValue(value) {
        this.value = value;
        this.insValueChange.emit(this.value);
    }
    componentWillLoad() {
        this.value = this.validateInput(this.value);
    }
    componentDidLoad() {
        this.addClickOutside();
        this.bindEls();
    }
    componentWillUpdate() {
        this.value = this.validateInput(this.value);
    }
    componentDidUpdate() {
        this.bindEls();
    }
    bindEls() {
        this.labelEl = this.el.querySelector('.ins-form-label');
        this.inputEl = this.el.querySelector('.ins-input-stepper_input-wrap');
    }
    stepDown() {
        if (this.readonly || this.disabled)
            return false;
        let diff = +this.value - +this.step;
        let value = this.validateInput(diff);
        this.insValueChange.emit(value);
        this.value = value;
    }
    validateInput(input) {
        let num = +input;
        if (!num && num !== 0)
            return "0";
        if (this.min && num < +this.min)
            return this.min;
        if (this.max && num > +this.max)
            return this.max;
        return input;
    }
    stepUp() {
        if (this.readonly || this.disabled)
            return false;
        let sum = +this.value + +this.step;
        let value = this.validateInput(sum);
        this.insValueChange.emit(value);
        this.value = value;
    }
    activateLabel() {
        if (!this.readonly && !this.disabled) {
            this.active = true;
            if (this.labelEl)
                this.labelEl.classList.add('active');
            if (this.inputEl)
                this.inputEl.classList.add('active');
        }
    }
    deactivateLabel() {
        this.active = false;
        if (this.labelEl)
            this.labelEl.classList.remove('active');
        if (this.inputEl)
            this.inputEl.classList.remove('active');
    }
    // onInputHandler(event){
    //   let x = event.which || event.keyCode;
    //   this.insInput.emit({
    //     value: event.target.value,
    //     validated: this.value,
    //     keyCode: x
    //   });
    // }
    insBlurHandler(event) {
        let keyCode = event.which || event.keyCode;
        let value = this.validateInput(event.target.value);
        event.target.value = value;
        this.deactivateLabel();
        this.insBlur.emit({ value, keyCode });
        this.insValueChange.emit(+value);
        this.value = value;
    }
    addClickOutside() {
        window.addEventListener("click", e => {
            let target = e.target;
            let closest = target.closest("ins-input-stepper");
            if (closest !== this.el) {
                this.deactivateLabel();
            }
        });
    }
    render() {
        return (h("div", { key: '704e52e3111a427397ffe96780510729f072766b', class: `ins-input-stepper ins-form-field-wrap
        ${this.hasError ? 'is-invalid' : ''}
        ${this.readonly ? 'readonly' : ''}
        ${this.disabled ? 'disabled' : ''}` }, this.label || this.tooltip ?
            h("label", { htmlFor: this.name, class: `ins-form-label
              ${this.disabled ? 'disabled' : ''}` }, this.label, this.tooltip
                ? h("ins-input-tooltip", { content: this.tooltip })
                : '')
            : '', h("div", { key: '4bfe780d29dc4076de0d48d2d9daeaab2ca2825d', class: "ins-input-stepper_input-wrap", onClick: () => this.activateLabel() }, h("div", { key: 'b1e81764311b88d35a015c7d068e02f26b653c20', class: "ins-input-stepper_minus", onClick: () => this.stepDown() }, h("i", { key: '8a1ab5a9abab8d5cf5d8bdc696b0850446c89a2e', class: "icon-minus" })), h("div", { key: '49c8cd71ae989ab66d6c0ea586bc892e15194393', class: "ins-input-stepper_input" }, h("input", { key: 'a95b54d2e3fcfd278e41422fdc14feb457fc2c1a', type: "number", step: this.step, min: this.min, max: this.max, name: this.name, value: this.value, required: this.required, disabled: this.disabled, readonly: this.readonly, onFocus: () => this.activateLabel(), onBlur: e => this.insBlurHandler(e) })), h("div", { key: 'c56a6c64f29d569418d7eea1817d4a35d63e6ac9', class: "ins-input-stepper_plus", onClick: () => this.stepUp() }, h("i", { key: '7e454c90af92eee9ef2ca0af4697790e65b56b33', class: "icon-plus" }))), this.hasError ?
            h("div", { class: "ins-form-error" }, this.errorMessage)
            : ''));
    }
    get el() { return getElement(this); }
};

export { InsStepper as ins_input_stepper };

//# sourceMappingURL=ins-input-stepper.entry.js.map