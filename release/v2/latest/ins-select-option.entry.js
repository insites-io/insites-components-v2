import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsSelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insSelectOptionClicked = createEvent(this, "insSelectOptionClicked", 7);
        this.label = 'Option';
        this.value = '';
        this.disabled = false;
        this.default = false;
        this.activated = false;
        this.hidden = false;
    }
    insSelectOptionClickHandler() {
        if (!this.disabled) {
            this.insSelectOptionClicked.emit({
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
        return (h("div", { key: 'da120591b1a8a4eadaff1c8e2901eaa967f5d1f3', class: `
        ins-select-option-wrap
        ${this.activated ? 'selected' : ''}
        ${this.hidden ? 'hidden' : ''}
        ${this.disabled ? 'disabled' : ''} `, onClick: () => this.insSelectOptionClickHandler() }, this.label));
    }
};

export { InsSelectOption as ins_select_option };

//# sourceMappingURL=ins-select-option.entry.js.map