import { h, Component, Element, Event, EventEmitter, Prop, State, Listen, Method } from "@stencil/core";
import flatpickr from "flatpickr";

@Component({ tag: 'ins-filter' })
export class InsFilter {
    @Element() insFilterEl: HTMLElement;
    @Event() insDateFilter: EventEmitter;
    @Event() insFilter: EventEmitter;
    @Event() didLoad: EventEmitter;
    @Prop() hasLoad: string;

    @Prop({ mutable: true }) withDateFilter: boolean = false;
    @Prop({ mutable: true }) dateTitle: any = "Date Period";
    @Prop({ mutable: true }) defaultDate: string = "";
    @Prop({ mutable: true }) dateFrom: string = "";
    @Prop({ mutable: true }) dateTo: string = "";
    @Prop({ mutable: true }) dateOpt: any = [
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

    @State() filterItem: any;
    @State() dateFilterState: any;
    @State() selectedCustom: boolean;
    @State() selectedRange: any;
    @State() isAll: boolean = false;
    @State() pickerInstance: any;

    @State() fromPickerInstance: any;
    @State() toPickerInstance: any;

    @State() currentFilter: any;

    @Method()
    async closeDateFilter() {
        this.dateFilterState = false;
    }

    @Listen('onFilter')
    async onFilterHandler() {
        let insFilterItems = this.insFilterEl.querySelectorAll('ins-filter-item') as any;
        let selections = {};

        for (let i = 0; i < insFilterItems.length; i++) {
            let selected = await insFilterItems[i].getSelected();
            selections[selected.name] = selected.option;
        }

        this.insFilter.emit(selections);
    }

    toggleDateFilter() {
        this.dateFilterState = !this.dateFilterState;

        let insFilter = document.getElementsByTagName('ins-filter-item');
        for (let i = 0; i > insFilter.length; i++) {
            insFilter[i].closeFilter();
        }
    }

    dateOptEHandler(option) {

        this.selectedRange = option;
        this.selectedCustom = false;

        let from = new Date();
        let to = new Date();
        let curr = new Date();

        if (option.toLowerCase() == 'all') {

            this.isAll = true;
            this.fromPickerInstance.clear();
            this.toPickerInstance.clear();

        } else {
            this.isAll = false;

            if (option.toLowerCase() == 'this week') {

                let first = curr.getDate() - (curr.getDay() - 1); // First day is the day of the month - the day of the week
                let last = first + 6; // last day is the first day + 6
                let toDate = new Date();

                from = new Date(curr.setDate(first));
                to = new Date(toDate.setDate(last));

            } else if (option.toLowerCase() == 'last week') {

                let beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000);
                let beforeOneWeek2 = new Date(beforeOneWeek);
                let day = beforeOneWeek.getDay();
                let diffToMonday = beforeOneWeek.getDate() - day + (day === 0 ? -6 : 1);

                from = new Date(beforeOneWeek.setDate(diffToMonday));
                to = new Date(beforeOneWeek2.setDate(diffToMonday + 6));

            } else if (option.toLowerCase() == 'this month') {
                from = new Date(from.getFullYear(), from.getMonth(), 1);
                to = new Date(from.getFullYear(), from.getMonth() + 1, 0);

            } else if (option.toLowerCase() == 'last month') {
                from.setDate(1);
                from.setMonth(from.getMonth() - 1);
                to = new Date(from.getFullYear(), from.getMonth() + 1, 0);

            } else if (option.toLowerCase() == 'this year') {

                from = new Date(from.getFullYear(), 0, 1);
                to = new Date(from.getFullYear(), 11, 31);

            } else if (option.toLowerCase() == 'last year') {

                from = new Date(from.getFullYear() - 1, 0, 1);
                to = new Date(from.getFullYear(), 11, 31);

            } else if (option.toLowerCase() == 'custom') {
                let filter = this.getDate() as any;
                from = new Date(filter.from);
                to = new Date(filter.to);
            }

            this.fromPickerInstance.set('defaultDate', from);
            this.toPickerInstance.set('defaultDate', to);
            if (option === 'Custom') this.selectedRange = this.customFormat();
        }
    }

    customFormat() {
        if (!this.isAll) {
            this.selectedCustom = true;
            let filter = this.getDate() as any;
            return `Custom (${filter.from} to ${filter.to})`;
        } return 'All'
    }

    @Method()
    async getDate() {
        let from = this.fromPickerInstance.selectedDates;
        let to = this.toPickerInstance.selectedDates;

        console.log('from', from);
        console.log('to', to);

        if (from && to) {
            return {
                from: flatpickr.formatDate(from[0], 'Y-m-d'),
                to: flatpickr.formatDate(to[0], 'Y-m-d')
            }
        }
        return 'All';
    }

    componentWillLoad() {
        this.filterItem = this.insFilterEl.querySelectorAll('ins-filter-item').length;
    }

    componentDidLoad() {
        this.initInsFilterDatePicker('from');
        this.initInsFilterDatePicker('to');
        this.setDefaultDate();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]){
          let func = window["Insites"].methods[this.hasLoad];
          if (func) func(this.insFilterEl);
        }
    }

    initInsFilterDatePicker(prop) {
        let inputEl = this.insFilterEl.querySelector(`.${prop} input.ins-filter-datepicker-input`);
        let wrapper = this.insFilterEl.querySelector(`.input-wrap.${prop}`) as any;

        this[`${prop}PickerInstance`] = flatpickr(inputEl, {
            inline: true,
            dateFormat: 'Y-m-d',
            onChange: this.onPickHandler.bind(this),
            appendTo: wrapper
        });
    }

    setDefaultDate() {

        if (this.defaultDate) {

            let arr = this.dateOpt.map(item => item.toLowerCase());
            let arrSearch = arr.indexOf(item => item === this.defaultDate.toLowerCase());

            if (arrSearch >= 0) {
                this.currentFilter = this.dateOpt[arrSearch];
                this.dateOptEHandler(this.currentFilter)
            }

        } else if (this.dateFrom && this.dateTo) {

            let from = new Date(this.dateFrom);
            let to = new Date(this.dateTo);

            if (to > from) {
                this.isAll = false;
                this.pickerInstance.setDate
                this.currentFilter = this.customFormat();
                this.selectedRange = this.customFormat();
            }
        } else {
            this.currentFilter = this.dateOpt[0];
            this.dateOptEHandler(this.currentFilter);
        }
    }

    onPickHandler(selected_dates, value) {
        console.log('selected_dates', selected_dates);
        console.log('value', value);
    }

    render() {
        return (
            <div class="filter">
                <span class="filter__label">Filter:</span>
                <div class="filter__btn-container">

                    <slot></slot>

                    {this.withDateFilter ?

                        <div class="filter__date ins-filter-datepicker-wrap">

                            <div class="date-filter" onClick={() => this.toggleDateFilter()}>
                                <span class="date-filter__text">{this.dateTitle}: </span>
                                <span class="date-filter__option">{this.selectedRange}</span>
                                <i class="fas icon-caret-down"></i>
                            </div>

                            <div class={this.dateFilterState ? 'date-range active' : 'date-range'}>
                                <div class="date-range__opt-container">
                                    {this.dateOpt.map((option) =>
                                        <div id="tab-container" onClick={() => this.dateOptEHandler(option)}>
                                            <div class={`date-range__tab
                                                    ${option === this.selectedRange || (this.selectedCustom && option === 'Custom')
                                                    ? 'active-tab' : ''}`}>
                                                {option}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div class="from input-wrap">
                                    <input type="text" class="from ins-filter-datepicker-input" />
                                </div>
                                <div class="to input-wrap">
                                    <input type="text" class="to ins-filter-datepicker-input" />
                                </div>
                            </div>
                        </div>

                        : ''}
                </div>
            </div>
        )
    }
}
