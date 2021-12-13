import { h, Component, Element, Event, EventEmitter, Prop, State, Listen, Method } from "@stencil/core";

@Component({ tag: 'ins-filter' })
export class InsFilter {
  @Element() insFilterEl: HTMLElement;
  @Event() insFilterApply: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;
  @Prop({ mutable: true }) label: string = "Filter:";
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

  @State() dateFilterState: any;
  @State() selectedRange: any = "All";

  filterItem: any;
  selectedCustom: boolean = false;
  pickerInstance: any;
  currentFilter: any = "All";
  isAll: boolean = true;
  fromPicker: any;
  fromInput: any;
  toPicker: any;
  toInput: any;
  dateFilterEl: any;

  temp: any = {
    from: "",
    to: "",
    range: "All"
  }

  cancelDateFilter(){
    this.closeDateFilter();
    this.fromPicker.value = this.temp.from;
    this.fromInput.value = this.temp.from;
    this.toPicker.value = this.temp.to;
    this.toInput.value = this.temp.to;
    this.fromPicker.maxDate = this.temp.to;
    this.toPicker.minDate = this.temp.from;
    this.selectedRange = this.temp.range;

    if (this.temp.range === "All"){
      this.isAll = true;
    } else this.isAll = false;

    if (this.temp.range.includes('Custom')){
      this.selectedCustom = true;
    } else this.selectedCustom = false;
  }

  @Method()
  async closeDateFilter() {
    this.dateFilterState = false;
  }

  @Method()
  async getDate() {
    return this.getLocDate();
  }

  @Listen('insInput')
  datePickerChanged(e){
    let name = e.detail.name;
    let date = e.detail.date_string;
    this[`${name}Input`].value = date;

    if (name === "from"){
      this.toPicker.minDate = date;
    } else {
      this.fromPicker.maxDate = date;
    }

    if (this.fromInput.value && this.toInput.value){
      this.isAll = false;
      this.selectedRange = this.customFormat();
    }
  }

  @Listen('insSelect')
  async onFilterHandler() {
    let insFilterItems = this.insFilterEl.querySelectorAll('ins-filter-item') as any;
    let selections = {};

    for (let i = 0; i < insFilterItems.length; i++) {
      let selected = await insFilterItems[i].getSelected();
      selections[selected.name] = selected.option;
    }

    if (this.withDateFilter){
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

  async dateOptEHandler(option, settingDefault?: Boolean) {

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

    } else {
      if(option.toLowerCase() === 'custom')
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

      } else if (option.toLowerCase() == 'custom' && !this.isAll) {
        if (settingDefault && this.dateFrom && this.dateTo){
          from = new Date(this.dateFrom);
          to = new Date(this.dateTo);
        } else {
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
      let filter = this.getLocDate() as any;
      return `Custom (${filter.from} to ${filter.to})`;
    } return 'All'
  }

  getLocDate() {
    let from = this.fromInput.value;
    let to = this.toInput.value;

    if (from && to) return { from, to }
    return 'All';
  }

  addClickOutside(){
    window.addEventListener("click", e => {
      let target = e.target as any;
      let closest = target.closest(".filter__date")

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
    if (this.withDateFilter){
      this.dateFilterEl = this.insFilterEl.querySelector('.filter__date');
      this.addClickOutside();
      this.initDatePickerInput('from');
      this.initDatePickerInput('to');
      this.dateOptEHandler(this.currentFilter, true);
    }

    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]) {
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insFilterEl);
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

    } else if (this.dateFrom && this.dateTo){
      this.currentFilter = 'Custom';
      this.selectedRange = 'Custom';
      this.isAll = false;
    }
  }

  updatePickers(e, range) {
    let date = e.target.value;
    this[`${range}Picker`].value = date;

    if (range === "from"){
      this.toPicker.minDate = date;
    } else {
      this.fromPicker.maxDate = date;
    }

    if (this.fromInput.value && this.toInput.value){
      this.isAll = false;
      this.selectedRange = this.customFormat();
    }
  }

  applyDateFilter(){
    this.temp.from = this.fromInput.value;
    this.temp.to = this.toInput.value;
    this.temp.range = this.selectedRange;
    this.onFilterHandler();
    this.closeDateFilter();
  }

  render() {
    return (
      <div class="filter">
        <span class="filter__label">{this.label}</span>
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
                    <div onClick={() => this.dateOptEHandler(option)}>
                      <div class={`date-range__tab
                        ${option === this.selectedRange
                          || (this.selectedCustom && option === 'Custom')
                            ? 'active-tab'
                            : ''}`}>
                        {option}
                      </div>
                    </div>
                  )}
                </div>

                <div class="from input-wrap">
                  {this.dateFrom}
                  <ins-date-time mode="datepicker" name="from"
                    inline value={this.dateFrom}>
                  </ins-date-time>
                </div>

                <div class="to input-wrap">
                  {this.dateTo}
                  <ins-date-time mode="datepicker" name="to"
                    inline value={this.dateTo}>
                  </ins-date-time>
                </div>

                <div class="date-range__action">
                  <label class="ins-label">From</label>
                  <input type="date" class="ins-date-from"
                    onChange={(e) => this.updatePickers(e, 'from')} />

                  <span class="d-spacer">&nbsp; - &nbsp;</span>

                  <label class="ins-label">To</label>
                  <input type="date" class="ins-date-to"
                    onChange={(e) => this.updatePickers(e, 'to')} />

                  <div class="date-range__cancel-apply">
                    <ins-button label="cancel" size="small"
                      onClick={() => this.cancelDateFilter()} outlined />

                    <ins-button label="apply" size="small"
                      onClick={() => this.applyDateFilter()} solid />
                  </div>
                </div>

              </div>
            </div>

            : ''}
        </div>
      </div>
    )
  }
}
