import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsHeading = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insChange = createEvent(this, "insChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.change = "";
        this.label = "";
        this.name = "";
        this.backgroundColor = '#fff';
        this.level = 6;
        this.editable = false;
        this.withoutLine = false;
        this.maxlength = "";
        this.editMode = false;
        this.tempLabel = '';
    }
    checkLevel() {
        switch (this.level) {
            case 1: return (h("h1", null, this.label));
            case 2: return (h("h2", null, this.label));
            case 3: return (h("h3", null, this.label));
            case 4: return (h("h4", null, this.label));
            case 5: return (h("h5", null, this.label));
            case 6: return (h("h6", null, this.label));
        }
    }
    enterEditMode() {
        this.tempLabel = this.label;
        this.editMode = true;
    }
    leaveEditMode() {
        this.editMode = false;
    }
    updateTempLabel(e) {
        this.tempLabel = e.detail;
    }
    saveChanges() {
        if (this.tempLabel.trim()) {
            this.insChange.emit({
                name: this.name,
                old_label: this.label,
                new_label: this.tempLabel
            });
            this.label = this.tempLabel;
            this.editMode = false;
        }
        else
            this.leaveEditMode();
    }
    componentDidLoad() {
        if (this.label) {
            let labelWrapEl = this.insHeadingEl.querySelector('.label-wrap');
            labelWrapEl.style.backgroundColor = this.backgroundColor;
            if (this.editable) {
                let inputWrapEl = this.insHeadingEl.querySelector('.input-wrap');
                inputWrapEl.style.backgroundColor = this.backgroundColor;
            }
        }
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insHeadingEl);
        }
    }
    render() {
        return (h("div", { key: '4108edfef44222e39f8a86dc3e600495f7d82b73', class: `ins-heading-wrap
        ${this.withoutLine ? 'without-line' : ''}
        ${this.editMode ? 'editing' : ''} ` }, this.label ?
            h("div", { class: "label-wrap" }, this.checkLevel(), this.editable ?
                h("button", { class: "icon-edit", onClick: () => this.enterEditMode() })
                : '')
            : '', this.editable ?
            h("div", { class: "input-wrap" }, h("ins-input", { maxlength: this.maxlength, value: this.tempLabel, onInsValueChange: (e) => this.updateTempLabel(e) }), h("div", { class: "input-wrap-buttons" }, h("ins-button", { label: "CANCEL", size: "small", onInsClick: () => this.leaveEditMode() }), h("ins-button", { label: "SAVE", size: "small", onInsClick: () => this.saveChanges() })))
            : ''));
    }
    get insHeadingEl() { return getElement(this); }
};

export { InsHeading as ins_heading };

//# sourceMappingURL=ins-heading.entry.js.map