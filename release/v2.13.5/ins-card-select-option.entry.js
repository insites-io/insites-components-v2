import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const insCardSelectOptionCss = "@charset \"UTF-8\";ins-card-select-option{width:25%}@media screen and (max-width: 1023px){ins-card-select-option{width:50%}}@media screen and (max-width: 639px){ins-card-select-option{width:100%}}ins-card-select-option .ins-card-option-wrap{height:calc(100% - 24px);margin:12px;position:relative;padding:16px;background:var(--ins-color-white);border:1px solid var(--ins-border-color);border-radius:4px;cursor:pointer}ins-card-select-option .ins-card-option-wrap:hover{border:1px solid var(--ins-color-ink40);box-shadow:1px 1px 2px var(--ins-shadow-color)}ins-card-select-option .ins-card-option-wrap.selected{border:1px solid var(--ins-color-primary)}ins-card-select-option .ins-card-option-wrap.selected::before{width:24px;height:24px;line-height:24px;position:absolute;top:-8px;right:-8px;display:inline-block;font-size:10px;text-align:center;content:\"\";font-family:insites-20-fonticon !important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;z-index:101;color:var(--ins-color-white)}ins-card-select-option .ins-card-option-wrap.selected::after{background:var(--ins-color-primary);content:\"\";display:block;position:absolute;z-index:100;top:-8px;right:-8px;width:24px;height:24px;border-radius:50%}ins-card-select .ins-card-select-wrap.disabled .ins-card-option-wrap{pointer-events:none;background:var(--ins-color-disabled_readonly_bg);color:var(--ins-color-ink40)}ins-card-select .ins-card-select-wrap.disabled ins-card-select-option .ins-card-option-wrap.selected{color:var(--ins-color-ink);border-color:var(--ins-color-ink40)}";

const InsCardSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insCardSelectOptionClicked = createEvent(this, "insCardSelectOptionClicked", 7);
        this.value = '';
        this.disabled = false;
        this.default = false;
        this.activated = false;
        this.hidden = false;
    }
    insCardSelectOptionClickHandler() {
        this.insCardSelectOptionClicked.emit({
            value: this.value
        });
    }
    async activate() {
        this.activated = true;
    }
    async deactivate() {
        this.activated = false;
    }
    async toggle() {
        this.activated = !this.activated;
    }
    // @Method() async hideOption(){
    //   this.hidden = true;
    // }
    // @Method() async showOption(){
    //   this.hidden = false;
    // }
    // ${this.hidden ? 'hidden': ''}
    // ${this.disabled ? 'disabled': ''}
    render() {
        return (h("div", { key: '2c8f3c1b4df36efdd0f3267745545522e498a203', class: `
        ins-card-option-wrap
        ${!this.value ? 'no-value' : ''}
        ${this.activated ? 'selected' : ''}`, onClick: () => this.insCardSelectOptionClickHandler() }, h("slot", { key: 'a5190681f10e32ed41952fdcc2c12b100e18eed1' })));
    }
};
InsCardSelectOption.style = insCardSelectOptionCss;

export { InsCardSelectOption as ins_card_select_option };

//# sourceMappingURL=ins-card-select-option.entry.js.map