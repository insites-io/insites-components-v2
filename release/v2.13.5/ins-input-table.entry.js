import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInputTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.insInput = createEvent(this, "insInput", 7);
        this.hasLoad = undefined;
        this.label = undefined;
        this.tableHeaders = [];
        this.tooltip = undefined;
        this.readonly = undefined;
        this.disabled = undefined;
        this.hasError = undefined;
        this.errorMessage = undefined;
        this.addButtonIcon = "icon-plus";
        this.removeButtonIcon = "icon-minus";
        this.addButtonColor = "blue";
        this.removeButtonColor = "blue";
        this.data = [{}];
    }
    componentWillLoad() {
        if (typeof this.tableHeaders === "string") {
            try {
                this.tableHeaders = JSON.parse(this.tableHeaders);
            }
            catch (_a) { }
        }
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insInputTableEl);
        }
        this.updateColumnWidth();
    }
    componentDidUpdate() {
        this.updateColumnWidth();
    }
    updateColumnWidth() {
        this.columnWidth = !this.readonly && !this.disabled ?
            `width: calc(${100 / (this.tableHeaders.length)}% - ${80 / (this.tableHeaders.length)}px)` :
            `width: ${100 / (this.tableHeaders.length)}%`;
        const els = this.insInputTableEl.querySelectorAll('.ins-input-table_column');
        for (const key in els) {
            const el = els[key];
            if (el && el.setAttribute)
                el.setAttribute("style", this.columnWidth);
        }
    }
    async setValue(value) {
        this.data = value;
        return await value;
    }
    async getValue() {
        return await this.data;
    }
    inputHander(event) {
        let childEl = event.target;
        let childIndex = 0;
        if (childEl.parentNode.previousSibling) {
            childEl = childEl.parentNode;
            do {
                childEl = childEl.previousSibling;
                childIndex++;
            } while (childEl.previousSibling);
        }
        else {
            childIndex = 0;
        }
        let parentEl = event.target.parentNode.parentNode;
        let parentIndex = 0;
        if (parentEl.previousSibling) {
            do {
                parentEl = parentEl.previousSibling;
                parentIndex++;
            } while (parentEl.previousSibling);
        }
        else {
            parentIndex = 0;
        }
        this.data[parentIndex][this.tableHeaders[childIndex].name] = event.target.value;
        this.insInput.emit(this.data);
    }
    insClickHander(event) {
        let action = "remove";
        if (!event.target.previousSibling)
            action = "add";
        let parentEl = event.target.parentNode.parentNode;
        let parentIndex = 0;
        if (parentEl.previousSibling) {
            do {
                parentEl = parentEl.previousSibling;
                parentIndex++;
            } while (parentEl.previousSibling);
        }
        else {
            parentIndex = 0;
        }
        let updatedData = JSON.parse(JSON.stringify(this.data));
        if (action === "remove") {
            updatedData.splice(parentIndex, 1);
            if (!updatedData.length)
                updatedData = [this.emptyValue()];
        }
        else {
            if (parentIndex === updatedData.length) {
                updatedData.push(this.emptyValue());
            }
            else {
                updatedData.splice(parentIndex + 1, 0, this.emptyValue());
            }
        }
        this.data = updatedData;
        this.insInput.emit(this.data);
    }
    updateValue(els) {
        const inputEls = [];
        for (const key in els) {
            const el = els[key];
            if (typeof el === "object")
                inputEls.push(el);
        }
        if (els.length) {
            let counter = 0;
            for (const item of this.data) {
                for (const header of this.tableHeaders) {
                    els[counter].value = item[header.name];
                    els[counter].parentNode.classList.remove('is-invalid');
                    if (this.hasError && !item[header.name])
                        els[counter].parentNode.classList.add('is-invalid');
                    counter++;
                }
            }
        }
    }
    emptyValue() {
        let empty = {};
        for (const header of this.tableHeaders) {
            empty[header.name] = null;
        }
        return empty;
    }
    componentDidRender() {
        for (const key in this.data) {
            if (!Object.keys(this.data[key]).length)
                this.data[key] = this.emptyValue();
        }
        this.updateValue(this.insInputTableEl.querySelectorAll('input'));
    }
    render() {
        return (h("div", { key: 'da0d9b4dacd63009750c1c316679399a12d529f2', class: `ins-input-table ${this.hasError ? 'has-error' : ''}` }, h("div", { key: '22ae85fdf1baf07afc9f61b2aecbfe5e3811ab0d', class: "ins-input-table_label" }, this.label, this.tooltip
            ? h("ins-input-tooltip", { content: this.tooltip })
            : ''), h("div", { key: 'aaa4ec9bde2091da97a214d1897d214d9d00541f', class: "ins-input-table_header" }, this.tableHeaders.map((item) => {
            return (h("div", { class: "table-header ins-input-table_column" }, item.label));
        })), h("div", { key: '504eb9f5ad4dc3fd4e6296fbf2e32f4323ac0ba4' }, this.data.map((item) => {
            return (h("div", { class: "ins-input-table_row" }, this.tableHeaders.map((header, index) => {
                return (h("div", { class: `ins-input-table_column ins-form-field-wrap` }, h("label", { class: "ins-form-label" }, header.label), h("input", { class: "ins-form-field", key: index, value: item[header.name], disabled: this.disabled, readonly: this.readonly, onInput: e => this.inputHander(e) })));
            }), !this.readonly && !this.disabled ?
                h("div", { class: "ins-input-table_buttons" }, h("ins-button", { type: "button", icon: this.addButtonIcon, color: this.addButtonColor, label: "" }), h("ins-button", { type: "button", icon: this.removeButtonIcon, color: this.removeButtonColor, label: "" })) : ''));
        })), this.hasError ?
            h("div", { class: "ins-form-error" }, this.errorMessage)
            : ''));
    }
    get insInputTableEl() { return getElement(this); }
};

export { InsInputTable as ins_input_table };

//# sourceMappingURL=ins-input-table.entry.js.map