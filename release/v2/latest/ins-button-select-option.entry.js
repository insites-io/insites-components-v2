import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsButtonSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insButtonSelectOptionClicked = createEvent(this, "insButtonSelectOptionClicked", 7);
        this.label = 'Option';
        this.value = '';
        this.disabled = false;
        this.default = false;
        this.activated = false;
        this.hidden = false;
    }
    insButtonSelectOptionClickHandler() {
        if (!this.disabled) {
            this.insButtonSelectOptionClicked.emit({
                value: this.value,
                label: this.label,
            });
        }
    }
    async activate() {
        this.activated = true;
    }
    async deactivate() {
        this.activated = false;
    }
    async hideOption() {
        this.hidden = true;
    }
    async showOption() {
        this.hidden = false;
    }
    render() {
        return (h("div", { key: '4c0df7f5b603520aed3f15734ad56790d5f70195', class: `
        ins-select-option-wrap
        ${this.activated ? 'selected' : ''}
        ${this.hidden ? 'hidden' : ''}
        ${this.disabled ? 'disabled' : ''} `, onClick: () => this.insButtonSelectOptionClickHandler() }, this.label));
    }
};

export { InsButtonSelectOption as ins_button_select_option };

//# sourceMappingURL=ins-button-select-option.entry.js.map