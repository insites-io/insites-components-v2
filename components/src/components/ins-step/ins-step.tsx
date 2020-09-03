import { h, Component, Prop, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-step' })
export class InsStep {
  @Event() insClick: EventEmitter;

  @Prop({ mutable: true }) indicator: string = "";
  @Prop({ mutable: true }) icon: string = "";
  @Prop({ mutable: true }) description: string = "";
  @Prop({ mutable: true }) active: boolean = false;
  @Prop({ mutable: true }) complete: boolean = false;
  @Prop({ mutable: true }) hasError: boolean = false;

  render() {
    return (
      <div class={`ins-step
        ${this.active ? 'active' : ''}
        ${this.complete ? 'completed' : ''}`}
        onClick={() => this.insClick.emit()}>

        <div class="ins-step_progress-bar"></div>
        <div class="ins-step_details">
          <div class={`ins-step_indicator
            ${ this.icon ? "ins-step_indicator-icon" : ""}`}>

            { this.icon
              ? <span class={this.icon}></span>
              : <span>{this.indicator}</span>
            }

            <i class="icon-check"></i>
            { this.indicator || this.icon ? "" : <div class="dot"></div> }
          </div>

          { this.description
            ? <div class="ins-step_description">
                { this.description }
              </div>
            : ""
          }
        </div>

      </div>
    );
  }
}
