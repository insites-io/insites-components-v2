import { r as registerInstance, a as createEvent, h } from './index-5ef45688.js';

const InsStep = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insStepClick = createEvent(this, "insStepClick", 7);
        this.indicator = "";
        this.icon = "";
        this.description = "";
        this.active = false;
        this.complete = false;
        this.disabled = false;
        this.hasError = false;
    }
    render() {
        return (h("div", { key: '9803848a27537426889b1206e66f715621ee9970', class: `ins-step
        ${this.hasError ? 'has-error' : ''}
        ${this.active ? 'active' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.complete ? 'completed' : ''}`, onClick: () => this.disabled ? '' : this.insStepClick.emit() }, h("div", { key: '4b3bac57385722a28600d88a63e234e5de6648b1', class: "ins-step_progress-bar" }), h("div", { key: '789043b45744950fceeddd350386208991a8e399', class: "ins-step_details" }, h("div", { key: '9475fb64cb317cb607970a61e3a7589c078bf3db', class: `ins-step_indicator
            ${this.icon ? "ins-step_indicator-icon" : ""}` }, this.icon
            ? h("span", { class: this.icon })
            : h("span", null, this.indicator), this.icon
            ? h("i", { class: `complete-icon ${this.icon}` })
            : h("i", { class: "complete-icon icon-check" }), this.indicator || this.icon ? "" :
            h("div", { class: "ins-step_dot" })), this.description
            ? h("div", { class: "ins-step_description" }, this.description)
            : "")));
    }
};

export { InsStep as ins_step };

//# sourceMappingURL=ins-step.entry.js.map