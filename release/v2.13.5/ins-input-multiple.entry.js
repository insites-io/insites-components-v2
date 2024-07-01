import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInputMultiple = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insInput = createEvent(this, "insInput", 7);
        this.insChange = createEvent(this, "insChange", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.label = undefined;
        this.name = undefined;
        this.disabled = false;
        this.readonly = false;
        this.value = [];
        this.placeholder = undefined;
        this.tooltip = "";
        this.hasError = false;
        this.errorMessage = "";
    }
    componentWillLoad() {
        if (!Array.isArray(this.value)) {
            this.value = this.isJSON(this.value);
        }
    }
    componentWillUpdate() {
        if (!Array.isArray(this.value)) {
            this.value = this.isJSON(this.value);
        }
    }
    isJSON(value) {
        try {
            return JSON.parse(value);
        }
        catch (err) {
            return [];
        }
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insInputMultipleEl);
        }
    }
    async val() {
        return this.value;
    }
    async getValue() {
        return this.value;
    }
    async setValue(value) {
        this.value = value;
        this.insValueChange.emit(this.value);
    }
    onfocusHandler() {
        this.insInputMultipleEl.querySelector('.ins-input-multiple').classList.add('active');
    }
    onblurHandler() {
        this.insInputMultipleEl.querySelector('.ins-input-multiple').classList.remove('active');
    }
    onremoveHandler(index) {
        let value = this.value;
        value.splice(index, 1);
        this.value = [];
        this.value = value;
    }
    onclickContainer(event) {
        if (event.target.classList.contains('ins-input-multiple-container')) {
            event.target.querySelector('input').focus();
        }
    }
    oninputHandler(event) {
        let value = this.value;
        let eventValue = event.target.value;
        if (event.keyCode === 13 && eventValue.trim() && !this.readonly) {
            this.updateValue(value, eventValue);
            setTimeout(() => { this.insInputMultipleEl.querySelector('input').focus(); }, 200);
        }
    }
    onaddHandler(event) {
        let value = this.value;
        let eventValue = event.target.previousSibling.value;
        if (eventValue.trim() && !this.readonly) {
            this.updateValue(value, eventValue);
            setTimeout(() => { this.insInputMultipleEl.querySelector('input').focus(); }, 200);
        }
    }
    updateValue(value, eventValue) {
        this.value = [];
        this.value = value;
        this.value.push(eventValue);
        eventValue = "";
        this.insInput.emit({
            value: this.value
        });
        this.insValueChange.emit(this.value);
    }
    componentDidUpdate() {
        this.insChange.emit({ value: this.value });
        // this.insInputMultipleEl.querySelector('input').focus();
    }
    render() {
        return (h("div", { key: 'a2d26c19eba242853babd9d22892151ad6084a5f', class: `ins-form-field-wrap ins-input-multiple
        ${this.disabled ? 'disabled' : ''}
        ${this.readonly ? 'readonly' : ''}
        ${this.hasError ? 'has-error' : ''}` }, this.label || this.tooltip ?
            h("label", { class: "ins-form-label" }, this.label, this.tooltip
                ? h("ins-input-tooltip", { content: this.tooltip })
                : '')
            : '', h("div", { key: 'e048b0f40f5a3b637bac48cf796b85cdc22aa305', class: "ins-input-multiple-container", onClick: event => this.onclickContainer(event) }, Array.isArray(this.value) ?
            this.value.map((item, index) => {
                return (h("div", { class: "ins-input-multiple-choice" }, h("span", null, item), !this.readonly && !this.disabled ?
                    h("span", { class: "icon-close", onClick: () => this.onremoveHandler(index) }) : ''));
            }) : '', h("div", { key: 'f1cef5ec16b3af9916464c4778bfea3dc8a14eb6', class: `ins-input-multiple-text ${(this.readonly || this.disabled) && this.value.length ? 'has-value-readonly' : ''}` }, h("input", { key: '16569584ea8480405c7dc8ac6263db948f1bd0fc', type: "text", readonly: this.readonly, disabled: this.disabled, placeholder: this.placeholder, onFocus: () => this.onfocusHandler(), onBlur: () => this.onblurHandler(), onKeyUp: event => this.oninputHandler(event) }), h("span", { key: '16d42b98b85e2b35fedab630156c2514b5db603b', class: "icon-add", title: "Click to add or press enter", onClick: event => this.onaddHandler(event) }))), h("span", { key: 'abf4c6f61aa75d622b27a781499568dafad28909', class: "error-message" }, this.errorMessage)));
    }
    get insInputMultipleEl() { return getElement(this); }
};

export { InsInputMultiple as ins_input_multiple };

//# sourceMappingURL=ins-input-multiple.entry.js.map