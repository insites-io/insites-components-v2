import { h, Component, Prop, Listen, EventEmitter, Event, Element, Method } from "@stencil/core";

@Component({
  tag: 'ins-card-select',
  styleUrl: "./ins-card-select.scss"
})

export class InsCardSelect {
  @Element() insCardSelectEl: HTMLElement;
  @Prop ({ mutable:true }) label: string;
  @Prop ({ mutable:true }) value: any;
  @Prop ({ mutable:true }) disabled: boolean;
  @Prop ({ mutable:true }) readonly: boolean;
  @Prop ({ mutable:true }) hasError: boolean;
  @Prop ({ mutable:true }) errorMessage: string;
  @Prop ({ mutable:true }) multiple: boolean;
  @Prop ({ mutable:true }) tooltip: string;

  // Lifecycle
  @Event() didLoad: EventEmitter;
  @Event() insInput: EventEmitter;
  cardOptions;

  @Listen('insCardSelectOptionClicked')
  async InsCardSelectOptionClickedHandler(event: CustomEvent) {
    if (!this.disabled && !this.readonly) {
      let el = event.target as any;

      if (!this.multiple) {
        this.value = event.detail.value;
        for (let item of this.cardOptions) {
          item.deactivate();
        }
        el.activate();
      } else {
        this.value = [];
        await el.toggle();

        for (let item of this.cardOptions) {
          if (item.activated) {
            this.value.push(item.value);
          }
        }
      }

      this.insInput.emit({ value: this.value });
    }
  }

  @Method() async setValue(value) {
    if (!this.multiple) {
      for (let item of this.cardOptions) {
        if (item.value === value) {
          item.activate();
        } else {
          item.deactivate();
        }
      }
    } else {
      if (Array.isArray(value)) {
        for (let item of this.cardOptions) {
          item.deactivate();
          if (value.indexOf(item.value) !== -1) {
            item.activate();
          }
        }
      }
    }
  }

  @Method() async getValue() {
    return this.value;
  }

  componentDidLoad() {
    this.didLoad.emit();
    this.cardOptions = this.insCardSelectEl.querySelectorAll('ins-card-select-option');

    if (!this.multiple && this.value) this.setValue(this.value);
  }

  render() {
    return (
      <div class={`ins-card-select-wrap
        ${this.hasError ? ' is-invalid' : ''}
        ${this.disabled ? ' disabled' : ''}
        ${this.readonly ? ' readonly' : ''}`}>
          <label class="ins-card-select-label-wrap">{this.label}
            {this.tooltip
              ? <ins-input-tooltip content={this.tooltip}></ins-input-tooltip>
              : ''
            }
            </label>
          <div class="ins-card-select-option-wrap">
            <slot />
          </div>

          {this.errorMessage && this.hasError ? <div class="ins-form-error">{this.errorMessage}</div> : ''}
      </div>
    )
  }
}
