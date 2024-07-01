import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsTextarea = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insInput = createEvent(this, "insInput", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.placeholder = undefined;
        this.name = undefined;
        this.label = undefined;
        this.value = undefined;
        this.errorMessage = undefined;
        this.maxlength = "";
        this.counter = "";
        this.hasError = false;
        this.readonly = false;
        this.disabled = false;
        this.required = false;
        this.tooltip = "";
        this.activeLabel = undefined;
        this.charCount = "0";
    }
    async getValue() {
        return this.value;
    }
    async setValue(value) {
        this.value = value;
        this.insValueChange.emit(this.value);
    }
    onTextareaHandler(event) {
        let x = event.which || event.keyCode;
        this.value = event.target.value;
        this.insInput.emit({
            value: event.target.value,
            keyCode: x
        });
        this.insValueChange.emit(event.target.value);
    }
    activateLabel() {
        this.activeLabel = true;
    }
    deactivateLabel() {
        this.activeLabel = false;
    }
    charCounter() {
        let current = this.value.length;
        let max = this.maxlength ? `/ ${this.maxlength}` : "";
        return `${current}${max}`;
    }
    componentWillUpdate() {
        if (this.counter)
            this.charCount = this.charCounter();
    }
    componentWillLoad() {
        if (this.counter) {
            let max = +this.maxlength;
            if (this.counter === "decreasing" && max) {
                this.charCounter = () => {
                    let left = max - (this.value ? this.value.length : 0);
                    return `${left} characters left`;
                };
            }
            this.charCount = this.charCounter();
        }
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insTextareaEl);
        }
    }
    render() {
        return (h("div", { key: '615c7fe8a8f494018c59c4a521c8dfd93377ecd6', class: `ins-textarea-wrap ins-form-field-wrap ${this.hasError ? 'is-invalid' : ''}` }, h("div", { key: '21becf4ad53f60646e612816afbfdb3662b66b71', class: `ins-ta ${this.counter ? 'with-counter' : ''}` }, this.label || this.tooltip ?
            h("label", { class: `ins-form-label
              ${this.disabled ? 'disabled' : ''}
              ${this.activeLabel ? 'active' : ''}` }, this.label, this.tooltip
                ? h("ins-input-tooltip", { content: this.tooltip })
                : '')
            : '', h("textarea", { key: '65d3a867a2adc448fe4e9b957aa6989098145759', class: "ins-textarea-field ins-form-field", name: this.name, onKeyUp: e => this.onTextareaHandler(e), onFocus: () => this.activateLabel(), onBlur: () => this.deactivateLabel(), placeholder: this.placeholder, value: this.value, disabled: this.disabled, readonly: this.readonly, required: this.required, maxlength: this.maxlength }), this.hasError ?
            h("div", { class: "ins-form-error" }, this.errorMessage)
            : '', this.counter ?
            h("div", { class: "ins-textarea-counter" }, this.charCount)
            : '')));
    }
    get insTextareaEl() { return getElement(this); }
};

export { InsTextarea as ins_textarea };

//# sourceMappingURL=ins-textarea.entry.js.map