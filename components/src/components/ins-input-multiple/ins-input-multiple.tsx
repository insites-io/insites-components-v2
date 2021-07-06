import { h, Component, Element, Prop, Method, Event, EventEmitter } from "@stencil/core";
@Component({ tag: 'ins-input-multiple' })

export class InsInputMultiple {
	@Element() insInputMultipleEl: HTMLElement;
	@Event() insInput: EventEmitter;
	@Event() insChange: EventEmitter;
	@Event() insValueChange: EventEmitter;
	@Event() didLoad: EventEmitter;
	@Prop() hasLoad: string;

	@Prop({mutable: true}) label: string;
	@Prop({mutable: true}) name: string;
	@Prop({mutable: true}) disabled: boolean = false;
	@Prop({mutable: true}) readonly: boolean = false;
	@Prop({mutable: true}) value: any = [];
  @Prop({mutable: true}) placeholder: string;
  @Prop({mutable: true}) tooltip: string = "";
	@Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) errorMessage: string = "";

  componentWillLoad(){
    if (!Array.isArray(this.value)){
      this.value = this.isJSON(this.value);
    }
  }

  componentWillUpdate(){
    if (!Array.isArray(this.value)){
      this.value = this.isJSON(this.value);
    }
  }

  isJSON(value) {
    try { return JSON.parse(value) }
    catch(err) { return [] }
  }

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputMultipleEl);
    }
  }

	@Method()
	async val() {
		return this.value;
	}

  @Method()
  async getValue(){
    return this.value
  }

	@Method()
	async setValue(value) {
		this.value = value;
    this.insValueChange.emit(this.value);
	}

	onfocusHandler() {
		this.insInputMultipleEl.querySelector('.ins-input-multiple').classList.add('active');
	}

	onblurHandler() {
		this.insInputMultipleEl.querySelector('.ins-input-multiple').classList.remove('active');
	}

	onremoveHandler(index) {
		let value = this.value;
		value.splice(index, 1);
		this.value = [];
		this.value = value;
	}

	onclickContainer(event) {
		if (event.target.classList.contains('ins-input-multiple-container')) {
			event.target.querySelector('input').focus();
		}
	}

	oninputHandler(event) {
		let value = this.value;
    let eventValue = event.target.value;

		if (event.keyCode === 13 && eventValue.trim() && !this.readonly) {
			this.updateValue(value, eventValue);
		}
  }

  onaddHandler(event) {
		let value = this.value;
		let eventValue = event.target.previousSibling.value;

		if (eventValue.trim() && !this.readonly) {
			this.updateValue(value, eventValue);
		}
	}

	updateValue(value, eventValue) {
		this.value = [];
		this.value = value;
		this.value.push(eventValue);
		eventValue = "";

		this.insInput.emit({
			value: this.value
    });

    this.insValueChange.emit(this.value);
  }

	componentDidUpdate() {
		this.insChange.emit({ value: this.value });
		this.insInputMultipleEl.querySelector('input').focus();
	}

	render() {
		return (
      <div class={`ins-form-field-wrap ins-input-multiple
        ${this.disabled ? 'disabled' : ''}
        ${this.readonly ? 'readonly' : ''}
        ${this.hasError ? 'has-error' : ''}`}>

        { this.label || this.tooltip ?
          <label class="ins-form-label">
            {this.label}

            {this.tooltip
              ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
              : ''
            }
          </label>
        : '' }

        <div class="ins-input-multiple-container"
          onClick={event => this.onclickContainer(event)}>

					{	Array.isArray(this.value) ?
						this.value.map((item, index) => {
							return (
								<div class="ins-input-multiple-choice">
									<span>{item}</span>
									{ !this.readonly && !this.disabled ?
										<span
											class="icon-close"
											onClick={() => this.onremoveHandler(index)}>
										</span> : ''
									}
								</div>
							)
						}) : ''
					}
					<div class={`ins-input-multiple-text ${(this.readonly || this.disabled) && this.value.length ? 'has-value-readonly' : ''}`}>
						<input
							type="text"
							readonly={this.readonly}
							disabled={this.disabled}
              placeholder={this.placeholder}
							onFocus={() => this.onfocusHandler()}
							onBlur={() => this.onblurHandler()}
							onKeyUp={event => this.oninputHandler(event)}>
						</input>
						<span
							class="icon-add"
							title="Click to add or press enter"
							onClick={event => this.onaddHandler(event)}>
						</span>
					</div>
				</div>

				<span class="error-message">
          {this.errorMessage}
        </span>
			</div>
		)
	}
}