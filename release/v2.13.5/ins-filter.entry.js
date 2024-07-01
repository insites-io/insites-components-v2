import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsFilter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insFilterApply = createEvent(this, "insFilterApply", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.selectedCustom = false;
        this.currentFilter = "All";
        this.isAll = true;
        this.temp = {
            from: "",
            to: "",
            range: "All"
        };
        this.hasLoad = undefined;
        this.label = "Filter:";
        this.withDateFilter = false;
        this.dateTitle = "Date Period";
        this.defaultDate = "";
        this.dateFrom = "";
        this.dateTo = "";
        this.dateOpt = [
            'All',
            'Today',
            'This Week',
            'Last Week',
            'This Month',
            'Last Month',
            'This Year',
            'Last Year',
            'Custom'
        ];
        this.dateFilterState = undefined;
        this.selectedRange = "All";
    }
    cancelDateFilter() {
        this.closeDateFilter();
        this.fromPicker.value = this.temp.from;
        this.fromInput.value = this.temp.from;
        this.toPicker.value = this.temp.to;
        this.toInput.value = this.temp.to;
        this.fromPicker.maxDate = this.temp.to;
        this.toPicker.minDate = this.temp.from;
        this.selectedRange = this.temp.range;
        if (this.temp.range === "All") {
            this.isAll = true;
        }
        else
            this.isAll = false;
        if (this.temp.range.includes('Custom')) {
            this.selectedCustom = true;
        }
        else
            this.selectedCustom = false;
    }
    async closeDateFilter() {
        this.dateFilterState = false;
    }
    async getDate() {
        return this.getLocDate();
    }
    datePickerChanged(e) {
        let name = e.detail.name;
        let date = e.detail.date_string;
        this[`${name}Input`].value = date;
        if (name === "from") {
            this.toPicker.minDate = date;
        }
        else {
            this.fromPicker.maxDate = date;
        }
        if (this.fromInput.value && this.toInput.value) {
            this.isAll = false;
            this.selectedRange = this.customFormat();
        }
    }
    async onFilterHandler() {
        let insFilterItems = this.insFilterEl.querySelectorAll('ins-filter-item');
        let selections = {};
        for (let i = 0; i < insFilterItems.length; i++) {
            let selected = await insFilterItems[i].getSelected();
            selections[selected.name] = selected.option;
        }
        if (this.withDateFilter) {
            selections[this.dateTitle] = this.getLocDate();
            if (selections[this.dateTitle] != "All") {
                selections[this.dateTitle].currentFilter = this.selectedRange;
            }
        }
        this.insFilterApply.emit(selections);
    }
    toggleDateFilter() {
        this.dateFilterState = !this.dateFilterState;
        let insFilter = document.getElementsByTagName('ins-filter-item');
        for (let i = 0; i > insFilter.length; i++) {
            insFilter[i].closeFilter();
        }
    }
    async dateOptEHandler(option, settingDefault) {
        this.selectedRange = option;
        this.selectedCustom = false;
        if (option.toLowerCase() == 'all') {
            this.isAll = true;
            this.fromInput.value = "";
            this.fromPicker.value = "";
            this.fromPicker.maxDate = "";
            this.toInput.value = "";
            this.toPicker.value = "";
            this.toPicker.minDate = "";
        }
        else {
            if (option.toLowerCase() === 'custom')
                this.isAll = false;
            let from = new Date();
            let to = new Date();
            let curr = new Date();
            if (option.toLowerCase() == 'this week') {
                let first = curr.getDate() - (curr.getDay() - 1); // First day is the day of the month - the day of the week
                let last = first + 6; // last day is the first day + 6
                let toDate = new Date();
                from = new Date(curr.setDate(first));
                to = new Date(toDate.setDate(last));
            }
            else if (option.toLowerCase() == 'last week') {
                let beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
                let beforeOneWeek2 = new Date(beforeOneWeek);
                let day = beforeOneWeek.getDay();
                let diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);
                from = new Date(beforeOneWeek.setDate(diffToMonday));
                to = new Date(beforeOneWeek2.setDate(diffToMonday + 6));
            }
            else if (option.toLowerCase() == 'this month') {
                from = new Date(from.getFullYear(), from.getMonth(), 1);
                to = new Date(from.getFullYear(), from.getMonth() + 1, 0);
            }
            else if (option.toLowerCase() == 'last month') {
                from.setDate(1);
                from.setMonth(from.getMonth() - 1);
                to = new Date(from.getFullYear(), from.getMonth() + 1, 0);
            }
            else if (option.toLowerCase() == 'this year') {
                from = new Date(from.getFullYear(), 0, 1);
                to = new Date(from.getFullYear(), 11, 31);
            }
            else if (option.toLowerCase() == 'last year') {
                from = new Date(from.getFullYear() - 1, 0, 1);
                to = new Date(from.getFullYear(), 11, 31);
            }
            else if (option.toLowerCase() == 'custom' && !this.isAll) {
                if (settingDefault && this.dateFrom && this.dateTo) {
                    from = new Date(this.dateFrom);
                    to = new Date(this.dateTo);
                }
                else {
                    from = new Date(this.fromInput.value);
                    to = new Date(this.toInput.value);
                }
            }
            this.isAll = false;
            this.fromPicker.maxDate = to;
            this.fromPicker.value = from;
            this.toPicker.minDate = from;
            this.toPicker.value = to;
            this.fromInput.value = await this.fromPicker.formatDate(from);
            this.toInput.value = await this.toPicker.formatDate(to);
            if (option === 'Custom') {
                this.selectedRange = this.customFormat();
            }
            if (settingDefault) {
                this.temp.from = this.fromInput.value;
                this.temp.to = this.toInput.value;
                this.temp.range = this.selectedRange;
            }
        }
    }
    customFormat() {
        if (!this.isAll) {
            this.selectedCustom = true;
            let filter = this.getLocDate();
            return `Custom (${filter.from} to ${filter.to})`;
        }
        return 'All';
    }
    getLocDate() {
        let from = this.fromInput.value;
        let to = this.toInput.value;
        if (from && to)
            return { from, to };
        return 'All';
    }
    addClickOutside() {
        window.addEventListener("click", e => {
            let target = e.target;
            let closest = target.closest(".filter__date");
            if (closest !== this.dateFilterEl) {
                this.cancelDateFilter();
            }
        });
    }
    componentWillLoad() {
        this.filterItem = this.insFilterEl.querySelectorAll('ins-filter-item').length;
        this.setDefaultDate();
    }
    componentDidLoad() {
        if (this.withDateFilter) {
            this.dateFilterEl = this.insFilterEl.querySelector('.filter__date');
            this.addClickOutside();
            this.initDatePickerInput('from');
            this.initDatePickerInput('to');
            this.dateOptEHandler(this.currentFilter, true);
        }
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insFilterEl);
        }
    }
    initDatePickerInput(prop) {
        this[`${prop}Picker`] = this.insFilterEl
            .querySelector(`.${prop} ins-date-time`);
        this[`${prop}Input`] = this.insFilterEl
            .querySelector(`.ins-date-${prop}`);
    }
    setDefaultDate() {
        if (this.defaultDate) {
            let arr = this.dateOpt.map(item => item.toLowerCase());
            let arrSearch = arr.indexOf(this.defaultDate.toLowerCase());
            if (arrSearch >= 0) {
                this.currentFilter = this.dateOpt[arrSearch];
                this.selectedRange = this.currentFilter;
            }
        }
        else if (this.dateFrom && this.dateTo) {
            this.currentFilter = 'Custom';
            this.selectedRange = 'Custom';
            this.isAll = false;
        }
    }
    updatePickers(e, range) {
        let date = e.target.value;
        this[`${range}Picker`].value = date;
        if (range === "from") {
            this.toPicker.minDate = date;
        }
        else {
            this.fromPicker.maxDate = date;
        }
        if (this.fromInput.value && this.toInput.value) {
            this.isAll = false;
            this.selectedRange = this.customFormat();
        }
    }
    applyDateFilter() {
        this.temp.from = this.fromInput.value;
        this.temp.to = this.toInput.value;
        this.temp.range = this.selectedRange;
        this.onFilterHandler();
        this.closeDateFilter();
    }
    render() {
        return (h("div", { key: '589c02946f784b27fe63f6430f6cba02e09ba220', class: "filter" }, h("span", { key: 'd69906089c60a98dd7485cbf9f5a415c80e2bab8', class: "filter__label" }, this.label), h("div", { key: 'e30cd83c02312ccf3db94762bc428ca34bdea1e2', class: "filter__btn-container" }, h("slot", { key: 'f0d753c60ade396b236c46dc4c52a8c07926a34c' }), this.withDateFilter ?
            h("div", { class: "filter__date ins-filter-datepicker-wrap" }, h("div", { class: "date-filter", onClick: () => this.toggleDateFilter() }, h("span", { class: "date-filter__text" }, this.dateTitle, ": "), h("span", { class: "date-filter__option" }, this.selectedRange), h("i", { class: "fas icon-caret-down" })), h("div", { class: this.dateFilterState ? 'date-range active' : 'date-range' }, h("div", { class: "date-range__opt-container" }, this.dateOpt.map((option) => h("div", { onClick: () => this.dateOptEHandler(option) }, h("div", { class: `date-range__tab
                        ${option === this.selectedRange
                    || (this.selectedCustom && option === 'Custom')
                    ? 'active-tab'
                    : ''}` }, option)))), h("div", { class: "from input-wrap" }, this.dateFrom, h("ins-date-time", { mode: "datepicker", name: "from", inline: true, value: this.dateFrom })), h("div", { class: "to input-wrap" }, this.dateTo, h("ins-date-time", { mode: "datepicker", name: "to", inline: true, value: this.dateTo })), h("div", { class: "date-range__action" }, h("label", { class: "ins-label" }, "From"), h("input", { type: "date", class: "ins-date-from", onChange: (e) => this.updatePickers(e, 'from') }), h("span", { class: "d-spacer" }, "\u00A0 - \u00A0"), h("label", { class: "ins-label" }, "To"), h("input", { type: "date", class: "ins-date-to", onChange: (e) => this.updatePickers(e, 'to') }), h("div", { class: "date-range__cancel-apply" }, h("ins-button", { label: "cancel", size: "small", onClick: () => this.cancelDateFilter(), outlined: true }), h("ins-button", { label: "apply", size: "small", onClick: () => this.applyDateFilter(), solid: true })))))
            : '')));
    }
    get insFilterEl() { return getElement(this); }
};

export { InsFilter as ins_filter };

//# sourceMappingURL=ins-filter.entry.js.map