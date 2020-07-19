import { h, Component, Prop, State, Listen, Element, Method, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-select' })
export class InsSelect {
  @Element() insSelectEl: HTMLElement;

  @Event() insValueChange: EventEmitter;
  @Event() insChange: EventEmitter;
  @Event() insSearch: EventEmitter;
  @Event() insSubmit: EventEmitter;
  @Event() insLoadMore: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @Prop({mutable: true}) label: string;
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) placeholder: string = "";
  @Prop({mutable: true}) buttonLabel: string = "Add";
  @Prop({mutable: true}) dynamicPlaceholder: string;
  @Prop({mutable: true}) disabled: boolean = false;
  @Prop({mutable: true}) readonly: boolean = false;
  @Prop({mutable: true}) button: boolean = false;
  @Prop({mutable: true}) small: boolean = false;
  @Prop({mutable: true}) searchable: boolean = false;
  @Prop({mutable: true}) multiple: boolean = false;
  @Prop({mutable: true}) value: any;
  @Prop({mutable: true}) selected_values: any = [];
  @Prop({mutable: true}) dropUp: boolean = false;
  @Prop({mutable: true}) withDynamicOption: boolean = false;
  @Prop({mutable: true}) dynamicSearch: boolean = false;
  @Prop({mutable: true}) infiniteScroll: boolean = false;
  @Prop({mutable: true}) initializing: boolean = false;

  @Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) errorMessage: string = "";

  // @State() value: any;
  @State() labelOfValue: any;
  @State() activated: boolean;
  @State() defaultHasBeenSet: boolean;
  @State() counter: number = 0;
  @State() insButtonEl: any;
  @State() noMoreOptions: boolean = false;

  loading: boolean = false;
  searching: boolean = false;
  insSelectOptionsWrap: any;
  tempSearch: string = "";

  @Method()
  async setLoadingState(state){
    this.loading = state;

    if (this.insSelectOptionsWrap){
      this.insSelectOptionsWrap.classList[state? 'add':'remove']('loading');
    } else return false
  }

  @Method()
  async setSearchingState(state){
    this.searching = state;
    if (this.insSelectOptionsWrap){
      this.insSelectOptionsWrap.classList[state? 'add':'remove']('searching');
    } else return false
  }

  // @Listen('onClickInsButton')
  onClickInsButtonHandler() {
    let dynamicOption = this.insSelectEl.querySelector('ins-input') as any;

    if (dynamicOption.value){
      dynamicOption.hasError = false;
      this.insSubmit.emit(dynamicOption.value);
      this.toggleInsSelectOptions();
      dynamicOption.value = '';
    } else {
      dynamicOption.hasError = true;
    }
  }

  @Listen('insSelectOptionClicked')
  async InsSelectOptionClickedHandler(event: CustomEvent){
    let clickedOption = event.target as any;
    let insSelectOptions = await this.getAllOptions();

    if (this.multiple){

      let checkSelections = this.value.find(el => {
        return el === clickedOption
      });

      if (!checkSelections){
        this.value.push(clickedOption);
        this.counter++;
      }

      if (insSelectOptions.length === this.value.length){
        this.noMoreOptions = true;
      }

    } else {

      for (let i = 0; i < insSelectOptions.length; i++){
        insSelectOptions[i].deactivate();
      }

      this.value = event.detail.value;
      this.labelOfValue = event.detail.label;

      if (insSelectOptions.length === 1){
        this.noMoreOptions = true;
      }
    }

    clickedOption.activate();
    if (!this.multiple){
      this.hideSelectOptions();
    }

    // this.toggleInsSelectOptions();
    this.emitEvent('add');
  }

  emitEvent(event_type){
    if (this.multiple) {
      let detail = []
      this.value.forEach(item => detail.push(item.value));
      this.selected_values = detail;
      this.insChange.emit({ event_type, selected: detail });
      this.insValueChange.emit(detail);
    } else {
      this.insValueChange.emit(this.value);
    }
  }

  closeMenu(){
    window.addEventListener('click', event => {
      let clickedEl = event.target as any;
      let closestEl = clickedEl.closest('ins-select');

      if (closestEl !== this.insSelectEl){
        if (this.activated) {
          this.showAllOptions()
          this.hideSelectOptions();
        }
      }
    })
  }

  @Method()
  async setValue(value){
    this.value = value;
    this.selected_values = value;
  }

  addSelectedValue(value) {
    this.selected_values.push(value);
  }

  showSelectOptions() {
    if (!this.readonly && !this.disabled && !this.initializing) {
      this.activated = true;
      this.toggleSelectOptionsWrap();

      if (this.searchable) {
        setTimeout(() => {
          let insSelectValueInput = this.insSelectEl.querySelector('.ins-select-value-input') as HTMLInputElement;
          if (insSelectValueInput) insSelectValueInput.focus();
        });
      }
    }
  }

  hideSelectOptions(){
    this.activated = false;
    this.tempSearch = "";
    this.toggleSelectOptionsWrap();
  }

  @Method()
  async toggleInsSelectOptions(){
    if (!this.readonly && !this.disabled){
      this.activated = !this.activated;
      this.toggleSelectOptionsWrap();
    }
  }

  checkDropUp(){
    this.dropUp = false;
    let pos = this.insSelectEl.getBoundingClientRect();
    if ((window.innerHeight - pos.bottom) < 65) {
      this.dropUp = true;
    }
  }

  toggleSelectOptionsWrap(){
    this.checkDropUp();

    if (this.activated) {
      this.expandSection();
    } else {
      this.collapseSection();
    }
  }

  @Method()
  async closeOptions(){
    this.activated = false;
    this.collapseSection();
  }

  @Method()
  async openOptions(){
    this.activated = true;
    this.checkDropUp();
    this.expandSection();
  }

  @Method()
  async collapseSection() {
    let element = this.insSelectEl.querySelector('.ins-select-options-wrap') as any;
    let sectionHeight = (element.scrollHeight > 400 ? 400 : element.scrollHeight);
    let elementTransition = element.style.transition;
    element.style.transition = '';
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    element.setAttribute('data-collapsed', 'true');
  }

  @Method()
  async expandSection() {
    let element = this.insSelectEl.querySelector('.ins-select-options-wrap') as any;
    let sectionHeight = (element.scrollHeight > 400 ? 400 : element.scrollHeight) + 2;
    if (element.getAttribute('data-collapsed') != 'false') {
      element.style.height = sectionHeight + 'px';
    }
    element.setAttribute('data-collapsed', 'false');
  }

  @Method()
  async enableNoResult(){
    if (this.insSelectOptionsWrap){
      this.insSelectOptionsWrap.classList.add('no-result');
    } else return false
  }

  @Method()
  async disableNoResult(){
    if (this.insSelectOptionsWrap){
      this.insSelectOptionsWrap.classList.remove('no-result');
    } else return false
  }

  async searchOptions(event){
    if (!this.activated){
      this.showSelectOptions();
    }

    this.disableNoResult();

    if (this.dynamicSearch) {
      if ((event.which === 13 || event.target.value === "") &&
         !this.searching && !this.loading) {
        this.insSearch.emit(event.target.value.toLowerCase());
        this.searching = true;
        this.setSearchingState(true);
        this.disableNoResult();
      }

    } else {
      let insSelectOptions = await this.getAllOptions();
      let hasResult = false;

      if (event.target.value){
        for (let i = 0; i < insSelectOptions.length; i++){
          insSelectOptions[i].hideOption();
          let result = insSelectOptions[i].label.toLowerCase().indexOf(event.target.value.toLowerCase());
          if (result >= 0){
            insSelectOptions[i].showOption();
            hasResult = true;
          }
        }
      }

      if (!hasResult){
        this.enableNoResult();
      }
      this.tempSearch = event.target.value;
    }
  }

  async showAllOptions(){
    let insSelectOptionsWrap = this.insSelectEl.querySelector('.ins-select-options-wrap');
    insSelectOptionsWrap.classList.remove('no-result');

    // if (!this.button){
    //   event.target.value = this.value ? this.value : '';
    // }

    let insSelectOptions = await this.getAllOptions();
    for (let i = 0; i < insSelectOptions.length; i++){
      insSelectOptions[i].showOption();
    }

    this.hideSelectOptions();
  }

  deleteItem(option){
    if (!this.disabled && !this.readonly){
      let checkIndex = this.value.findIndex(el => {
        return el === option
      });

      if (checkIndex > -1) {
        this.value[checkIndex].deactivate();
        this.value.splice(checkIndex, 1);
        this.counter--;

        this.emitEvent('remove');
      }

      this.noMoreOptions = false;
    }
  }

  isJSON(str) {
    let parsed;
    try {
      parsed = JSON.parse(str);
    } catch (e) {
      return [];
    }
    return parsed;
  }

  componentWillLoad(){

    if (this.multiple && this.button){
      console.warn('ins-select button does not yet support multiple selection, falling back to standard multiple select.');
    }

    if (this.multiple && !this.value){
      this.value = [];
    } else if (typeof this.value === 'string' && this.multiple){
      this.value = this.isJSON(this.value)
    }

    if (!this.value || !this.value.length){
      this.setInsSelectDefaultValue();
    } else {
      this.setSelectedFromValue();
    }

    if (!this.placeholder){
      this.placeholder = this.searchable ?
       "Please select or type to search for an option" : ""
    }

    this.closeMenu();
  }

  initScrollHandler(){
    let selector = this.withDynamicOption ? ".scroll-wrap" : ".ins-select-options-wrap";
    let scrollWrap = this.insSelectEl.querySelector(selector);
    scrollWrap.addEventListener('scroll', () => {
      if (scrollWrap.scrollTop + scrollWrap.clientHeight >= (scrollWrap.scrollHeight - 200)) {
        if (!this.loading && this.infiniteScroll){
          this.insLoadMore.emit();
          this.loading = true;
          this.setLoadingState(true);
          this.disableNoResult();
        }
      }

    });
  }

  initElObserver(){
    const io = new IntersectionObserver(el => {
      el.forEach(e => {
        if (e.intersectionRatio === 0 && this.activated){
          this.showAllOptions()
          this.hideSelectOptions();
        }
      });
    });

    io.observe(this.insSelectEl);
  }

  componentDidLoad(){
    if (this.withDynamicOption){
      this.insButtonEl = this.insSelectEl.querySelector('ins-button');
      this.insButtonEl.addEventListener('onClickInsButton', this.onClickInsButtonHandler.bind(this))
    }

    if (this.infiniteScroll){
      this.initScrollHandler();
    }

    this.insSelectOptionsWrap = this.insSelectEl.querySelector('.ins-select-options-wrap');

    this.initElObserver();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insSelectEl);
    }
  }

  @Method()
  async getAllOptions(){
    return this.insSelectEl.querySelectorAll('ins-select-option');
  }

  @Method()
  async setSelectedFromValue(value?){
    this.value = value ? value : this.value;
    let insSelectOptions = await this.getAllOptions();
    let tempMultipleValue = []

    if (insSelectOptions.length) {
      for (let i = 0; i < insSelectOptions.length; i++) {
        if (this.multiple) {

          this.value.forEach(val => {
            if (val === insSelectOptions[i].value){
              tempMultipleValue.push(insSelectOptions[i]);
              this.addSelectedValue(val);
              setTimeout(()=>{
                insSelectOptions[i].activate();
              }, 100);
              this.counter++;

              if (tempMultipleValue.length === insSelectOptions.length){
                this.noMoreOptions = true;
              }
            }
          });

        } else {

          if (this.value === insSelectOptions[i].value) {
            this.labelOfValue = insSelectOptions[i].label;
            setTimeout(() => {
              insSelectOptions[i].activate();
              if (insSelectOptions.length === 1){
                this.noMoreOptions = true;
              }
            }, 100);
            break;
          }

        }
      }

      if (this.multiple){
        this.value = tempMultipleValue;
      }
    } else {
      this.noMoreOptions = true;
    }
  }

  @Method()
  async setInsSelectDefaultValue(){
    let insSelectOptions = await this.getAllOptions();

    for (let i = 0; i < insSelectOptions.length; i++) {
      if (insSelectOptions[i].default) {
        if (this.multiple) {
          this.value.push(insSelectOptions[i]);
          setTimeout(()=>{
            insSelectOptions[i].activate();
          }, 100);
          this.counter++;

          if (this.value.length === insSelectOptions.length){
            this.noMoreOptions = true;
          }

        } else {
          this.value = insSelectOptions[i].value;
          this.labelOfValue = insSelectOptions[i].label;
          setTimeout(()=>{
            insSelectOptions[i].activate();
          }, 100)

          if (insSelectOptions.length === 1){
            this.noMoreOptions = true;
          }
          break;
        }
      }
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
        ? this.hideSelectOptions()
        : this.showSelectOptions();
    }
  }

	render() {
    return (
      <div class={
          `ins-select-wrap ins-form-field-wrap
          ${this.initializing ? 'initializing' : ''}
          ${this.activated ? 'activated' : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${this.small ? 'small' : ''}
          ${this.button && !this.multiple ? 'buttonise' : ''}
          ${this.insSelectEl.querySelectorAll('ins-select-option').length > 0 ? '' : 'no-options'}
          ${this.dropUp ? 'drop-up' : ''}
          ${this.hasError ? 'is-invalid' : ''} `}>

        { this.multiple ?
        <input type ="hidden"
          name={this.name}
          value={this.selected_values} />
        :
        <input type ="hidden"
          name={this.name}
          value={this.value} />
        }

        {this.label ?
        <label class={`ins-select-label-wrap ins-form-label
          ${this.button && !this.multiple && !this.disabled ? 'ripple' : ''}`}
          onClick={e => this.buttoniseClick(e)}>

          {this.label}{this.button && !this.multiple ? ':' : ''}
          {this.button && !this.multiple ?
          <span>{this.labelOfValue ? this.labelOfValue : this.placeholder}</span> : ''}

          <i class="icon-caret-down"></i>
        </label> : ''}

        {!this.label && this.button ?
        <div class={`ins-select-label-wrap ins-form-label
          ${this.button && !this.multiple && !this.disabled? 'ripple' : ''}`}
          onClick={e => this.buttoniseClick(e)}>
          {this.button && !this.multiple ?
          <span>{this.labelOfValue ? this.labelOfValue : this.placeholder}</span> : ''}

          <i class="icon-caret-down"></i>
        </div> : ''}

        {!this.button && !this.multiple ?
        <div class="ins-select-value-wrap"
          onClick={() => this.showSelectOptions()}>

          {this.initializing ? "" : <i class="icon-caret-down"></i>}

          <input class="ins-select-value-input green"
            onKeyUp={event => this.searchOptions(event)}
            value={this.labelOfValue}
            placeholder={this.placeholder}
            readonly={!this.searchable || this.readonly || this.initializing}
            disabled={this.disabled} />
        </div> : ''}

        {this.multiple ?
        <div class="ins-select-value-wrap multiple"
        onClick={() => this.showSelectOptions()}>

          {this.initializing ? "" : <i class="icon-caret-down"></i>}

          {this.value.length ? this.value.map(item => {
            return (
              <div class="multiple-item-wrap">
                <span>{item.label}</span>
                <span class="icon-close"
                  onClick={() => this.deleteItem(item)}>
                </span>
              </div>
            )
          }) : this.searchable ? ""
          : <div class="multiple-placeholder">{this.placeholder ? this.placeholder : "Select" }</div>}

          {(this.searchable && !this.value.length) || (this.searchable && this.activated) ?
          <div>
            <input class="ins-select-value-input red" readonly={this.readonly}
              placeholder={this.value.length ? "Type here to search for options" : this.placeholder}
              onKeyUp={event => this.searchOptions(event)} value={this.tempSearch}/>
          </div>
          : ''}
        </div> : ''}

        {this.hasError ?
          <div class="ins-form-error">
            {this.errorMessage}
          </div>
        : ''}

        <div class={`ins-select-options-wrap
          ${this.multiple ? 'multiple' : '' }
          ${this.noMoreOptions ? 'no-options' : ''}
          ${this.withDynamicOption ? 'with-dynamic-option' : '' }`}>

          <div class={`scroll-wrap`}>
            {this.button && !this.multiple && this.searchable ?
              <div class="ins-select-options-searchbar">
                <input class="ins-select-value-input blue"
                  name={this.name}
                  onKeyUp={event => this.searchOptions(event)}
                  placeholder="Search options" />

                <i class="icon-search"></i>
              </div>
            : ''}

            <p class="no-result-text">No result found</p>
            {this.noMoreOptions
             ? <p class="no-more-options">No options available</p>
             : ''}

            <div class="ins-select-slot-wrap">
              <slot />
            </div>

            <div class="spinner-wrap"><div class="spinner"></div></div>
          </div>

          {this.withDynamicOption ?
            <div class="dynamic-option-wrap">
              <ins-input field="text" placeholder={this.dynamicPlaceholder}></ins-input>
              <ins-button type="button" label={this.buttonLabel} solid></ins-button>
            </div>
          : ''}
        </div>

        { this.activated && !this.button

          ? <div class="done-wrap"
              onClick={() => this.hideSelectOptions()}>

              Close Options
            </div>

          : "" }

        <div class="main-spinner-wrap"><div class="spinner"></div></div>
      </div>
    );
	}
}
