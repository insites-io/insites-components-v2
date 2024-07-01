import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsInputSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insInputSelectOptionClicked = createEvent(this, "insInputSelectOptionClicked", 7);
        this.label = 'Option';
        this.value = '';
        this.disabled = false;
        this.default = false;
        this.activated = false;
        this.hidden = false;
    }
    insInputSelectOptionClickHandler() {
        if (!this.disabled) {
            this.insInputSelectOptionClicked.emit({
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
        return (h("div", { key: '0e9131612cb3902a4070e6bce8800d32190b63d1', class: `
        ins-select-option-wrap
        ${!this.value ? 'no-value' : ''}
        ${this.activated ? 'selected' : ''}
        ${this.hidden ? 'hidden' : ''}
        ${this.disabled ? 'disabled' : ''} `, onClick: () => this.insInputSelectOptionClickHandler() }, this.label));
    }
};

export { InsInputSelectOption as ins_input_select_option };

//# sourceMappingURL=ins-input-select-option.entry.js.map