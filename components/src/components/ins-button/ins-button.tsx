import { h, Component, Watch, Prop, Event, EventEmitter, Element, Method, State } from "@stencil/core";

@Component({ tag: "ins-button" })
export class InsButton {
  @Element() insButtonEl: HTMLElement;
  @Event() onClickInsButton: EventEmitter;
  @Event() onClickInsButtonOption: EventEmitter;

  @Prop({ mutable: true }) color: string = 'blue';
  @Prop({ mutable: true }) label: string = 'BUTTON';
  @Prop({ mutable: true }) icon: string = '';
  @Prop({ mutable: true }) size: string = 'normal';
  @Prop({ mutable: true }) data: string = '';
  @Prop({ mutable: true }) type: string = '';
  @Prop({ mutable: true }) options: string = '';

  @Prop({ mutable: true }) dropdown: boolean = false;
  @Prop({ mutable: true }) solid: boolean = false;
  @Prop({ mutable: true }) outlined: boolean = false;

  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop({ mutable: true }) cursor: string  = '';
  @Prop({ mutable: true }) textTransform: string  = '';
  @Prop({ mutable: true }) loading: boolean  = false;
  @Prop({ context: 'addRippleEffect' }) private addRippleEffect: any;

  @State() buttonOptions = []
  @State() toggleOption = false;
  @State() dropUp = false;

  btnOnClickHandler() {
    if (this.dropdown && this.buttonOptions.length){
      this.toggleOption = !this.toggleOption;
    } else {
      this.toggleOption = false;
      this.onClickInsButton.emit({
        label: this.label,
        data: this.data
      });
    }
  }

  optionOnClickHandler(option) {
    this.toggleOption = false;
    this.onClickInsButtonOption.emit({
      label: this.label, option
    });
  }

  @Watch('loading')
  watchLoaderHandler() {
    if(!this.loading) {
      let existingLabel = this.label;
      this.label = '';
      
      setTimeout(() => {
        this.label = existingLabel;
      }, 300);
    }
  }

  componentDidLoad() {
    let target;
    if (this.options){
      this.buttonOptions = this.options.split(',');
      target = this.insButtonEl.querySelector('.ins-button-options-wrap') as HTMLElement;
    } else {
      target = this.insButtonEl.querySelector('button') as HTMLElement;
    }

    this.insButtonEl.addEventListener('click', e => {
      if (!this.disabled && !this.loading) {
        this.addRippleEffect(e, target);
      }
    });

    this.closeMenu();
  }

  toggleOptions(){
    if(!this.disabled){

      this.dropUp = false;
      let pos = this.insButtonEl.getBoundingClientRect();
      if ((window.innerHeight - pos.bottom) < 90) {
        this.dropUp = true;
      }

      this.toggleOption = !this.toggleOption;
    }
  }

  closeMenu() {
    window.addEventListener('click', event => {
      let clickedEl = event.target as any;
      let closestEl = clickedEl.closest('ins-button');

      if (closestEl !== this.insButtonEl){
        if (this.toggleOption) {
          this.toggleOptions();
        }
      }
    })
  }

  render() {
    if (this.options){

      return (
        <div class="ins-button-options-wrap">
          <div class="button-wrap">
            <button
              type={this.type}
              disabled={this.disabled || this.loading ? true : false}
              onClick={() => this.btnOnClickHandler()}
              class={`ins-button ${this.disabled || this.loading ? '' : 'ripple'}
                ${this.loading ? 'is-loading' : ''}
                ${this.size ? 'size--' + this.size : ''}
                ${this.solid || this.loading ? 'solid' :''}
                ${this.outlined || (this.options && !this.solid)? 'outlined' :''}
                ${this.cursor ? 'cursor--' + this.cursor : ''}
                ${this.textTransform ? 'text-transform--' + this.textTransform : ''}
                ${this.color}
                ${this.label == '' && this.icon ? 'round' : ''}
                ${this.buttonOptions.length ? 'has-options':''}`
              }
            >
              {this.loading ?
                <div class={`spinner ${this.solid ? '' : this.color}`}></div> :
                <div>
                  {this.icon ? <i class={`btn__icon ${this.icon} ${this.label == '' ? 'action' : '' }`}></i> : ''}
                  <span class={`btn__label ${this.icon ? 'v-align' : ''}`}>
                    {this.label}
                  </span>
                </div>
              }
            </button>

            {this.buttonOptions.length
              ? <i class={`carets ${this.color}
                  icon-caret-${this.toggleOption ? 'up':'down'}
                  ${this.loading ? 'loading':''}
                  ${this.solid || this.loading ? 'solid' :''}`}
                  onClick={() => this.toggleOptions()}>
                </i>
              : ''
            }
          </div>
          <div class={` options-wrap

            ${this.dropUp ? 'drop-up' : ''}
            ${this.toggleOption ? 'show':'hide'}`}>

            <ul class={`option-wrap`}>

              {this.buttonOptions.map(option => {
                return (
                  <li class={`option
                    ${this.color}
                    ${this.solid ? 'solid' :''}
                    ${this.outlined ? 'outlined' :''}`}
                    onClick={() => this.optionOnClickHandler(option)}>

                    {option}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )

    } else {

      return (
        // ${ this.plain ? 'ripplePlain' : '' }
        <button
          type={this.type}
          disabled={this.disabled || this.loading ? true : false}
          onClick={() => this.btnOnClickHandler()}
          class={`ins-button ${this.disabled || this.loading ? '' : 'ripple'}
            ${this.loading ? 'is-loading' : ''}
            ${this.size ? 'size--' + this.size : ''}
            ${this.solid || this.loading ? 'solid' :''}
            ${this.outlined ? 'outlined' :''}
            ${this.cursor ? 'cursor--' + this.cursor : ''}
            ${this.textTransform ? 'text-transform--' + this.textTransform : ''}
            ${this.color}
            ${this.label == '' && this.icon ? 'round' : ''}`
          }
        >
          {this.loading ?
            <div class={`spinner ${this.solid ? '' : this.color}`}></div> :
            <div>
              {this.icon ? <i class={`btn__icon ${this.icon} ${this.label == '' ? 'action' : '' }`}></i> : ''}
              <span class={`btn__label ${this.icon ? 'v-align' : ''}`}>
                {this.label}
              </span>
            </div>
          }
        </button>
      );
    }
  }
}
