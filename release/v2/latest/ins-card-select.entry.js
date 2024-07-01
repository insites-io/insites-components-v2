import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const insCardSelectCss = "ins-card-select .ins-card-select-wrap{margin-bottom:20px}ins-card-select .ins-card-select-label-wrap{font-family:var(--ins-font-family);font-size:12px;font-weight:600;color:var(--ins-color-ink);display:block;line-height:1.4;min-height:20px}ins-card-select .ins-card-select-wrap.disabled .ins-card-select-label-wrap{color:var(--ins-color-ink40)}ins-card-select .ins-form-error{display:block;font-size:12px;font-family:var(--ins-font-family);line-height:16px;color:var(--ins-color-negative);margin-bottom:20px}ins-card-select .ins-card-select-option-wrap{margin:0 -12px;margin-bottom:4px;width:calc(100% + 24px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap}ins-card-select .ins-card-select-option-wrap>div{width:calc(100% + 24px);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap}ins-card-select .ins-card-select-wrap.is-invalid .ins-card-select-label-wrap{color:var(--ins-color-negative)}ins-card-select .ins-card-select-wrap.is-invalid .ins-card-select-option-wrap{margin-bottom:0}";

const InsCardSelect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.insInput = createEvent(this, "insInput", 7);
        this.label = undefined;
        this.value = undefined;
        this.disabled = undefined;
        this.readonly = undefined;
        this.hasError = undefined;
        this.errorMessage = undefined;
        this.multiple = undefined;
        this.tooltip = undefined;
    }
    async InsCardSelectOptionClickedHandler(event) {
        if (!this.disabled && !this.readonly) {
            let el = event.target;
            if (!this.multiple) {
                this.value = event.detail.value;
                for (let item of this.cardOptions) {
                    item.deactivate();
                }
                el.activate();
            }
            else {
                this.value = [];
                await el.toggle();
                for (let item of this.cardOptions) {
                    if (item.activated) {
                        this.value.push(item.value);
                    }
                }
            }
            this.insInput.emit({ value: this.value });
        }
    }
    async setValue(value) {
        if (!this.multiple) {
            for (let item of this.cardOptions) {
                if (item.value === value) {
                    item.activate();
                }
                else {
                    item.deactivate();
                }
            }
        }
        else {
            if (Array.isArray(value)) {
                for (let item of this.cardOptions) {
                    item.deactivate();
                    if (value.indexOf(item.value) !== -1) {
                        item.activate();
                    }
                }
            }
        }
    }
    async getValue() {
        return this.value;
    }
    componentDidLoad() {
        this.cardOptions = this.insCardSelectEl.querySelectorAll('ins-card-select-option');
        if (!this.multiple && this.value)
            this.setValue(this.value);
        if (this.multiple)
            this.value = [];
        this.didLoad.emit();
    }
    render() {
        return (h("div", { key: '3597a7ac58afcc530da37ac2546455cd8e3fd6d7', class: `ins-card-select-wrap
        ${this.hasError ? ' is-invalid' : ''}
        ${this.disabled ? ' disabled' : ''}
        ${this.readonly ? ' readonly' : ''}` }, h("label", { key: '4237cf0023329252ca1e7a86860fcf8325833dd0', class: "ins-card-select-label-wrap" }, this.label, this.tooltip
            ? h("ins-input-tooltip", { content: this.tooltip })
            : ''), h("div", { key: '36ef838abc10b9f684af4dc40fad3a38a66b2237', class: "ins-card-select-option-wrap" }, h("slot", { key: 'b86d275a89000de77e1618ea33d16c804d43b4df' })), this.errorMessage && this.hasError ? h("div", { class: "ins-form-error" }, this.errorMessage) : ''));
    }
    get insCardSelectEl() { return getElement(this); }
};
InsCardSelect.style = insCardSelectCss;

export { InsCardSelect as ins_card_select };

//# sourceMappingURL=ins-card-select.entry.js.map