import { h, Component, Element, Prop, Method, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-input-multiple' })

export class InsInputMultiple {
	@Element() insInputMultipleEl: HTMLElement;
	@Event() insInput: EventEmitter;
  @Event() insChange: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

	@Prop({mutable: true}) label: string;
	@Prop({mutable: true}) name: string;
	@Prop({mutable: true}) disabled: boolean = false;
	@Prop({mutable: true}) readonly: boolean = false;
	@Prop({mutable: true}) value: any = [];
	@Prop({mutable: true}) temp: string;
	@Prop({mutable: true}) removeDuplicates: boolean = false;

	@Prop({mutable: true}) hasError: boolean = false;
  @Prop({mutable: true}) errorMessage: string = "";

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputMultipleEl);
    }
  }

	@Method() // Discuss with mark re this as this is a redundant feature of component.value
	async val() {
		return this.value;
	}

	@Method() // Discuss with mark re this as this is a redundant feature of component.value = value
	async setValue(value) {
		this.value = value;
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
			this.value = [];
			this.value = value;
			this.value.push(eventValue);
			eventValue = "";

			this.insInput.emit({
				value: this.value
			});
		}
	}

	componentDidUpdate() {
		if (!Array.isArray(this.value)) {
			this.value = [];
		}

		this.insChange.emit({
			value: this.value
		});
		this.insInputMultipleEl.querySelector('input').focus();
	}

	render() {
		return (
			<div class={`ins-input-multiple ${this.disabled ? 'disabled' : ''} ${this.readonly ? 'readonly' : ''} ${this.hasError ? 'has-error' : ''}`}>
				<label>{this.label}</label>
				<div class="ins-input-multiple-container" onClick={event => this.onclickContainer(event)}>
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
							onFocus={() => this.onfocusHandler()}
							onBlur={() => this.onblurHandler()}
							onKeyUp={event => this.oninputHandler(event)}>
						</input>
					</div>
				</div>
				<span class="error-message">{this.errorMessage}</span>
			</div>
		)
	}
}