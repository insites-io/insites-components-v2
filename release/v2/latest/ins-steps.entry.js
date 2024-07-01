import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsSteps = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClick = createEvent(this, "insClick", 7);
        this.indicator = "";
        this.inline = false;
        this.clickable = false;
        this.withValidation = false;
        this.complete = false;
    }
    insStepClicked(e) {
        if (!this.clickable)
            return false;
        let nextStep = e.target;
        for (let i = 0; i < this.steps.length; i++) {
            if (!this.withValidation)
                this.steps[i].active = false;
            if (this.steps[i] === nextStep) {
                if (this.withValidation) {
                    this.insClick.emit({
                        nextStep, currentStep: this.findActiveStep()
                    });
                }
                else
                    this.emitEvent(nextStep, i);
            }
        }
    }
    findActiveStep() {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].active)
                return this.steps[i];
        }
    }
    findActiveStepIndex() {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].active)
                return i;
        }
    }
    emitEvent(currentStep, i) {
        let previousStep = this.findActiveStep();
        this.steps[i].active = true;
        this.insClick.emit({
            start: i === 0,
            end: i === (this.steps.length - 1),
            previousStep, currentStep
        });
    }
    setIndicators() {
        if (this.indicator && this.indicator === "number") {
            for (let i = 0; i < this.steps.length; i++) {
                if (!this.steps[i].icon)
                    this.steps[i].indicator = i + 1;
            }
        }
    }
    async setComplete() {
        for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].active = false;
            this.steps[i].hasError = false;
            this.steps[i].complete = true;
        }
        return true;
    }
    setDefault() {
        let hasActive = false;
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].active) {
                hasActive = true;
                break;
            }
        }
        if (!hasActive)
            this.steps[0].active = true;
    }
    componentDidLoad() {
        this.steps = this.el.querySelectorAll('ins-step');
        this.setIndicators();
        if (this.complete)
            this.setComplete();
        else
            this.setDefault();
    }
    async setStep(i) {
        for (let l = 0; l < this.steps.length; l++) {
            this.steps[l].active = false;
        }
        let previousStep = this.findActiveStep();
        let next = i - 1;
        this.steps[next].active = true;
        return { previousStep, currentStep: this.steps[next] };
    }
    async finish() {
        for (let l = 0; l < this.steps.length; l++) {
            this.steps[l].complete = true;
            this.steps[l].active = false;
        }
        return true;
    }
    async next() {
        let current = this.findActiveStepIndex();
        let sum = current + 1;
        let end = (sum + 1) === this.steps.length;
        let previousStep = this.steps[current];
        previousStep.complete = true;
        previousStep.active = false;
        if (sum >= this.steps.length) {
            return {
                end,
                previousStep: this.steps[current - 1],
                currentStep: previousStep,
            };
        }
        this.steps[sum].active = true;
        return {
            end, previousStep, currentStep: this.steps[sum]
        };
    }
    async prev() {
        let current = this.findActiveStepIndex();
        let diff = current - 1;
        if (diff < 0)
            return {
                start: true,
                previousStep: this.steps[current + 1],
                currentStep: this.steps[current]
            };
        let previousStep = this.steps[current];
        previousStep.active = false;
        this.steps[diff].active = true;
        return {
            start: diff === 0,
            previousStep,
            currentStep: this.steps[diff]
        };
    }
    async getAllSteps() {
        return this.steps;
    }
    async reset() {
        let total = this.steps.length;
        for (let i = 0; i < total; i++) {
            this.steps[i].complete = false;
            this.steps[i].active = false;
            this.steps[i].hasError = false;
        }
        this.steps[0].active = true;
        return true;
    }
    render() {
        return (h("div", { key: 'e9b89a0cbf866de958d3342387e45b69458248e7', class: `ins-steps
        ${this.inline ? "ins-steps_inline" : ""}` }, h("slot", { key: '63a555d3154f344d899c9d295810aa1f3b0aa247' })));
    }
    get el() { return getElement(this); }
};

export { InsSteps as ins_steps };

//# sourceMappingURL=ins-steps.entry.js.map