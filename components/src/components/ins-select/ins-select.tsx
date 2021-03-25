import { h, Component, Prop, Element, Method, Event, EventEmitter, Listen } from "@stencil/core";

@Component({ tag: 'ins-select' })
export class InsSelect {
  @Element() insSelectEl: HTMLElement;
  @Event() insValueChange: EventEmitter;
  @Event() insOptionSelect: EventEmitter;
  @Event({
    bubbles: false
  }) insClose: EventEmitter;

  // Dynamic Events
  @Event() insSubmit: EventEmitter;
  @Event() insSearch: EventEmitter;
  @Event() insLoadMore: EventEmitter;

  // Lifecycle
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  // Input Controllers
  @Prop({ mutable: true }) name: string;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) value: any;
  @Prop({ mutable: true }) placeholder: string = "";
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) readonly: boolean = false;
  @Prop({ mutable: true }) searchable: boolean = false;
  @Prop({ mutable: true }) hasError: boolean = false;
  @Prop({ mutable: true }) errorMessage: string = "";

  // Multiple Mode
  @Prop({mutable: true}) multiple: boolean = false;

  // Buttonise Mode
  @Prop({mutable: true}) button: boolean = false;
  @Prop({mutable: true}) small: boolean = false;

  // Static Controllers
  @Prop({ mutable: true }) dropUp: boolean = false;
  @Prop({ mutable: true }) selected_values: any = [];
  activated: boolean = false;
  labelOfValue = ""; tempSearch = "";
  inputValueEl; optionsWrapEl; mainWrapEl;

  // Dynamic Controllers
  @Prop({ mutable: true }) initializing: boolean = false;
  @Prop({ mutable: true }) infiniteScroll: boolean = false;
  @Prop({ mutable: true }) dynamicSearch: boolean = false;
  @Prop({ mutable: true }) withDynamicOption: boolean = false;
  @Prop({ mutable: true }) withDynamicOptionValidate: boolean = false;
  @Prop({ mutable: true }) dynamicHasError: boolean = false;
  @Prop({ mutable: true }) dynamicErrorMessage: string = "";
  @Prop({ mutable: true }) dynamicPlaceholder: string;
  @Prop({ mutable: true }) buttonLabel: string = "Add";

  @Prop({mutable: true}) tooltip: string = "";

  dynamicInputEl; scrollWrapEl;
  loading: boolean = false;
  searching: boolean = false;

  scrollHandler = () => {
    let target = this.scrollWrapEl.scrollHeight - 200;
    let pos = this.scrollWrapEl.scrollTop + this.scrollWrapEl.clientHeight;
    if (pos >= target && !this.loading){
      this.insLoadMore.emit();
      this.loading = true;
      this.setLoadingState(true);
      this.disableNoResult();
    }
  }

  initInfiniteScroll(){
    let action = this.infiniteScroll ? "add" : "remove";
    this.scrollWrapEl = this.searchEl(".scroll-wrap");
    this.scrollWrapEl[`${action}EventListener`]('scroll', this.scrollHandler);
  }

  componentWillLoad(){
    this.checkDropUp();

    if (this.multiple && this.button){
      console.warn('ins-select button does not yet support multiple selection, falling back to standard multiple select.');
      this.button = false;
    }

    if (this.multiple && !this.value){
      this.value = [];
    } else if (typeof this.value === 'string' && this.multiple){
      this.value = this.isJSON(this.value)
    }

    if (!this.placeholder && this.searchable){
      this.placeholder = "Please select or type to search for an option";
    }
  }

  componentDidLoad(){
    this.bindEls();
    this.initOutsideClick();
    this.initSearchInput();
    this.initValue();
    this.initDynamicOption();
    this.initInfiniteScroll();
    this.checkForOptions();

    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insSelectEl);
    }
  }

  componentDidUpdate(){
    this.bindEls();
    this.initSearchInput();
    this.initDynamicOption();
    this.initInfiniteScroll();
    this.checkForOptions();
  }

  isJSON(value) {
    try { return JSON.parse(value) }
    catch(err) { return [] }
  }

  searchEl(selector){
    return this.insSelectEl.querySelector(selector) as any;
  }

  bindEls(){
    this.mainWrapEl = this.searchEl('.ins-select-wrap');
    this.inputValueEl = this.searchEl('.ins-select-value-input');
    this.optionsWrapEl = this.searchEl('.ins-select-options-wrap');
  }

  initOutsideClick(){
    window.addEventListener('click', event => {
      let clickedEl = event.target as any;
      let closestEl = clickedEl.closest('ins-select');

      if (closestEl !== this.insSelectEl){
        if (this.activated) {
          this.collapseSection();
        }
      }
    });
  }

  initSearchInput(){
    if (this.searchable && this.inputValueEl){
      this.inputValueEl.addEventListener('keyup',
        e => this.searchOptions(e));
    }
  }

  initValue(){
    if (!this.value || !this.value.length){
      this.setInsSelectDefaultValue();
    } else {
      this.setSelectedFromValue();
    }
  }

  setMultipleDefault(){
    let tempDefaults = [], tempValues = []
    this.loopThroughOptions(option => {
      if (option.default){
        option.activated = true;
        tempDefaults.push(option);
        tempValues.push(option.value);
      }
    });

    if (tempDefaults.length){
      this.value = tempDefaults;
      this.selected_values = tempValues;
    }
  }

  setDefault(){
    let defaultOption = this.searchEl('ins-select-option[default]');
    if (!defaultOption) return;
    defaultOption.activated = true;
    this.labelOfValue = defaultOption.label;
    this.value = defaultOption.value;
  }

  @Method()
  async setInsSelectDefaultValue(){
    if (this.multiple){
      this.setMultipleDefault();
    } else this.setDefault();
  }

  setMultipleValue(val, options){
    let values = [], selections = []
    this.loopThroughOptions(option => {
      option.activated = false;
      if (val.includes(option.value)){
        option.activated = true;
        values.push(option.value);
        selections.push(option);
      }
    }, options);

    this.value = selections;
    this.selected_values = values;
  }

  setSelected(val, options){
    this.loopThroughOptions(option => {
      option.activated = false;
      if (val === option.value) {
        option.activated = true;
        this.labelOfValue = option.label;
        this.updateValueEls(option);
        this.checkForOptions();
      }
    }, options);
  }

  updateValueEls(option){
    if (this.inputValueEl){
      this.inputValueEl.value = option.label;
    }

    if (this.button && !this.label){
      let valueEl = this.searchEl('.ins-select-label-wrap span');
      valueEl.innerHTML = option.label;
    }
  }

  @Method()
  async reset() {
    let options = await this.getAllOptions();
    if (!options.length) return false;

    if (this.multiple) {
      this.resetMultipleValue(options);
    } else this.resetSelected(options);
  }

  resetSelected(options) {
    this.loopThroughOptions(o => o.activated = false, options);
    this.labelOfValue = "";
    this.value = "";
  }

  resetMultipleValue(options){
    this.loopThroughOptions(o => o.activated = false, options);
    this.value = [];
    this.selected_values = [];
  }

  @Method()
  async setSelectedFromValue(value?){
    let options = await this.getAllOptions();
    if (!options.length) return false;

    let val = value || this.value;
    if (this.multiple) {
      this.setMultipleValue(val, options);
    } else this.setSelected(val, options);
  }

  updateSelectedForMultiple(){
    this.value.forEach(item => {
      this.loopThroughOptions(option => {
        if (option.value === item.value && !option.activated){
          option.activated = true;
          return true;
        }
      });
    });
  }

  updateSelected(){
    this.loopThroughOptions(option => {
      if (option.value === this.value){
        option.activated = true;
        this.labelOfValue = option.label;
        this.inputValueEl.value = option.label;
        return true;
      }
    });
  }

  @Method()
  async updateSelectedOptions(){
    if (!this.value) return false;
    if (this.multiple){
      this.updateSelectedForMultiple()
    } else this.updateSelected();
  }

  initDynamicOption(){
    if (!this.withDynamicOption) return false;
    this.dynamicInputEl = this.searchEl('input[data-dynamic]');
  }

  defaultValidate(value){
    if (value){
      this.dynamicInputEl.classList.remove('invalid');
      this.insSubmit.emit(value);
      this.dynamicInputEl.value = '';
      this.collapseSection();

    } else this.dynamicInputEl.classList.add('invalid');
  }

  dynamicOptionHandler(e) {
    e.stopPropagation();
    let value = this.dynamicInputEl.value;
    if (this.withDynamicOptionValidate){
      this.insSubmit.emit(value);
    } else this.defaultValidate(value);
  }

  @Method()
  async resetDynamicOption() {
    this.collapseSection();
    this.dynamicInputEl.value = '';
    this.dynamicHasError = false;
  }

  checkDropUp(){
    let pos = this.insSelectEl.getBoundingClientRect();
    if ((window.innerHeight - pos.bottom) < 65) {
      this.dropUp = true;
    }
  }

  loopThroughOptions(cb, opts?){
    let options = opts || this.insSelectEl.querySelectorAll('ins-select-option');
    for (let i = 0; i < options.length; i++){
      if (cb(options[i])) break;
    }
  }

  buttoniseClick(e){
    e.preventDefault();
    if (this.button){
      let validTarget = true;

      if (e.target.classList.contains('ins-select-option-wrap')){
        validTarget = false;
      }

      this.activated && validTarget
        ? this.collapseSection()
        : this.expandSection();
    }
  }

  searchOptions(event){
    let keyword = event.target.value;
    this.tempSearch = keyword;
    this.disableNoResult();
    if (!this.activated) this.expandSection();

    if (this.dynamicSearch) {
      this.dynamicSearchHandler(keyword, event);
    } else this.staticSearch(keyword);
  }

  dynamicSearchHandler(keyword, event){
    if ((event.which === 13 || keyword === "") &&
    !this.searching && !this.loading) {
      this.setSearchingState(true);
      this.disableNoResult();
      this.insSearch.emit(keyword);
    }
  }

  @Method()
  async setSearchingState(state){
    this.searching = state;
    this.inputValueEl.readonly = state;
    if (this.optionsWrapEl){
      this.optionsWrapEl.classList[state? 'add' : 'remove']('searching');
    } else return false
  }

  @Method()
  async setLoadingState(state){
    this.loading = state;
    if (this.optionsWrapEl){
      this.optionsWrapEl.classList[state? 'add':'remove']('loading');
    } else return false
  }

  staticSearch(keyword){
    if (!keyword) {
      this.showHiddenOptions();
      return this.checkForOptions();
    }

    let hasResult = false;
    this.loopThroughOptions(option => {
      option.hideOption();

      let result = option.label.toLowerCase()
        .indexOf(keyword.toLowerCase());

      if (result >= 0){
        option.showOption();
        hasResult = true;
      }
    });

    if (!hasResult) this.enableNoResult();
    else this.checkForOptions();
  }

  @Method()
  async enableNoResult(){
    if (this.optionsWrapEl){
      this.optionsWrapEl.classList.add('no-result');
    } else return false
  }

  @Method()
  async disableNoResult(){
    if (this.optionsWrapEl){
      this.optionsWrapEl.classList.remove('no-result');
    } else return false
  }

  @Listen('insSelectOptionClicked')
  InsSelectOptionClickedHandler(event: CustomEvent){
    let clickedOption = event.target as any;
    if (this.multiple){
      this.multipleInputHandler(clickedOption);
    } else this.defaultInputHandler(clickedOption, event.detail);
  }

  multipleInputHandler(clickedOption){
    let checkSelections = this.value.find(el => {
      return el === clickedOption
    });

    if (!checkSelections){
      clickedOption.activated = true;
      this.value.push(clickedOption);
      this.emitEvent('add');
    }
  }

  defaultInputHandler(clickedOption, e){
    this.loopThroughOptions(option => option.activated = false);
    clickedOption.activated = true;
    this.collapseSection();
    this.showHiddenOptions();
    this.labelOfValue = e.label;
    this.insValueChange.emit(e.value);
    this.updateValueEls(clickedOption);
    this.value = e.value;
  }

  async checkForOptions(){
    let options = await this.getAllOptions();

    if (!options.length){
      this.mainWrapEl.classList.add("no-options");
      return false;
    }

    let hasOption = false;
    this.loopThroughOptions(option => {
      if (!option.activated && !option.hidden) {
        hasOption = true;
        return true;
      }
    }, options);

    let action = hasOption ? "remove" : "add";
    this.mainWrapEl.classList[action]("no-options");
    return hasOption;
  }

  emitEvent(event_type){
    if (this.multiple) {
      this.emitForMultiple(event_type);
    } else this.insValueChange.emit(this.value);
  }

  emitForMultiple(event_type){
    let selected = this.value.map(item => item.value);
    let selectedOptions = this.value.map(item => {
      return {
        label: item.label,
        value: item.value
      }
    });

    this.insOptionSelect.emit({
      event_type, selected, selectedOptions
    });

    this.insValueChange.emit(selected);
    this.selected_values = selected;
  }

  @Method()
  async getAllOptions(){
    return this.insSelectEl.querySelectorAll('ins-select-option');
  }

  showHiddenOptions(){
    this.optionsWrapEl.classList.remove('no-result');
    this.loopThroughOptions(option => option.showOption());
  }

  @Method()
  async expandSection() {
    if (!this.readonly && !this.disabled && !this.initializing) {
      this.activated = true;
      this.mainWrapEl.classList.add("activated");

      if (this.searchable && this.inputValueEl)
        this.inputValueEl.focus();
    }
  }

  @Method()
  async collapseSection() {
    this.activated = false;
    this.mainWrapEl.classList.remove("activated");
    if (this.tempSearch) this.showHiddenOptions();
    this.tempSearch = "";

    if (!this.multiple && this.searchable){
      if (this.button) this.inputValueEl.value = "";
      else this.inputValueEl.value = this.labelOfValue;
    }

    if (this.withDynamicOption)
      this.dynamicInputEl.classList.remove('invalid');

    this.insClose.emit();
  }

  removeItem(option){
    if (!this.disabled && !this.readonly){
      let i = this.value.findIndex(el => {
        return el === option
      });

      if (i > -1) {
        this.value[i].activated = false;
        this.value.splice(i, 1);
        this.emitEvent('remove');
      }
    }
  }

  renderNoLabelForButtonised(){
    return (
      <div class={`ins-select-label-wrap ${!this.disabled? 'ripple' : ''}`}
        onClick={e => this.buttoniseClick(e)}>

        <span>{this.labelOfValue ? this.labelOfValue : this.placeholder}</span>
        <i class="icon-caret-down"></i>
      </div>
    )
  }

  renderLabelForButtonised(){
    if (!this.label) return this.renderNoLabelForButtonised();
    return (
      <label class={`ins-select-label-wrap
        ${this.disabled ? '' : 'ripple'}`}
        onClick={e => this.buttoniseClick(e)}>

        { this.label } :
        <span>
          { this.labelOfValue
            ? this.labelOfValue
            : this.placeholder }
        </span>

        <i class="icon-caret-down"></i>
      </label>
    )
  }

  renderLabelWrap(){
    if (!this.label && !this.button) return "";
    if (this.button && !this.multiple){
      return this.renderLabelForButtonised()
    }

    return (
      <label class="ins-select-label-wrap">
        {this.label}

        { this.tooltip
          ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
          : ''
        }
      </label>
    )
  }

  renderCaret(){
    if (this.initializing) return "";
    return (<i class="icon-caret-down"></i>)
  }

  renderSingleValue(){
    return (
      <div class="ins-select-value-wrap"
        onClick={() => this.expandSection()}>
        { this.renderCaret() }
        <input class="ins-select-value-input" value={this.labelOfValue}
          readonly={this.readonly || !this.searchable || this.initializing}
          placeholder={this.placeholder} disabled={this.disabled} />
      </div>
    )
  }

  renderItem(item){
    return (
      <div class="multiple-item-wrap">
        <span>{item.label}</span>
        <span class="icon-close"
          onClick={() => this.removeItem(item)}>
        </span>
      </div>
    )
  }

  renderSelections(){
    if (!this.value.length && this.searchable) return "";
    if (this.value.length) return (
      this.value.map(item => this.renderItem(item))
    );

    return (
      <div class="multiple-placeholder">
        { this.placeholder ? this.placeholder : "Select" }
      </div>
    )
  }

  renderSearchWrapForMultiple(){
    if (!this.searchable) return "";
    return(
      <div>
        <input class="ins-select-value-input" value={this.tempSearch}
          readonly={this.readonly} disabled={this.disabled}
          placeholder={this.value.length
            ? "Type here to search for options"
            : this.placeholder} />
      </div>
    )
  }

  renderValueWrapForMultiple(){
    return (
      <div class={`ins-select-value-wrap multiple
        ${this.value.length ? "has-value": ""}`}
        onClick={() => this.expandSection()}>

        { this.renderCaret() }
        { this.renderSelections() }
        { this.renderSearchWrapForMultiple() }
      </div>
    )
  }

  renderValueWrap(){
    if (this.multiple){
      return this.renderValueWrapForMultiple();
    }

    if (!this.button && !this.multiple){
      return this.renderSingleValue()
    }

    return "";
  }

  renderOptionsWrap(){
    return (
      <div class={`ins-select-options-wrap
        ${this.multiple ? 'multiple' : ''}
        ${this.withDynamicOption ? 'with-dynamic-option' : ''}`}>

        { this.renderCloseBtnWrap() }

        <div class="scroll-wrap">
          { this.renderSearchWrapForButtonized() }

          <div class="no-result-text">No result found</div>
          <div class="no-more-options">No options available</div>

          <div class="ins-select-slot-wrap">
            <slot />
          </div>

          <div class="spinner-wrap">
            <div class="spinner"></div>
          </div>
        </div>

        { this.renderDynamicOptionWrap() }
      </div>
    )
  }

  renderCloseBtnWrap(){
    if (this.button) return "";
    return (
      <div class="done-wrap" onClick={() => this.collapseSection()}>
        Close Options
      </div>
    )
  }

  renderDynamicOptionWrap(){
    if (!this.withDynamicOption) return "";
    return (
      <div class="dynamic-option-wrap">
        <div class="dynamic-option-input-wrap">
          <input class={this.dynamicHasError ? "invalid" : ""}
            placeholder={this.dynamicPlaceholder} data-dynamic />

          { this.dynamicHasError
          ? <div class="error-message">
              { this.dynamicErrorMessage }
            </div>
          : "" }
        </div>
        <button type="button" onClick={e => this.dynamicOptionHandler(e)}>
            {this.buttonLabel}
        </button>
      </div>
    );
  }

  renderSearchWrapForButtonized(){
    if (this.button && this.searchable && !this.multiple){
      return (
        <div class="ins-select-options-searchbar">
          <input class="ins-select-value-input blue"
            onKeyUp={event => this.searchOptions(event)}
            placeholder="Search options" name={ this.name } />

          <i class="icon-search"></i>
        </div>
      )
    } return "";
  }

  renderErrorWrap(){
    if (!this.hasError) return ""
    return (
      <div class="ins-form-error">
        {this.errorMessage}
      </div>
    )
  }

  renderHiddenFields(){
    let value = this.multiple
      ? this.selected_values
      : this.value;

    return (
      <input type ="hidden"
        name={this.name}
        value={value} />
    )
  }

	render() {
    return (
      <div class={`ins-select-wrap
        ${this.readonly ? 'readonly' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.hasError ? 'is-invalid' : ''}
        ${this.small ? 'small' : ''}
        ${this.initializing ? 'initializing' : ''}
        ${this.button && !this.multiple ? 'buttonise' : ''}`}>

        { this.renderHiddenFields() }
        { this.renderLabelWrap() }
        { this.renderValueWrap() }
        { this.renderErrorWrap() }
        { this.renderOptionsWrap() }

        <div class="main-spinner-wrap">
          <div class="spinner"></div>
        </div>
      </div>
    );
	}
}
