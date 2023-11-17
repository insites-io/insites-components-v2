import { h, Component, Prop, Element, Event, EventEmitter, Method, Listen, State } from "@stencil/core";

@Component({
  tag: 'ins-input-table'
})

export class InsInputTable {
  @Element() insInputTableEl: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Event() insInput: EventEmitter;

  @Prop() hasLoad: string;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) tableHeaders: any = [];
  @Prop({ mutable: true }) tableData: any = [];
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) hasError: boolean;
  @Prop({ mutable: true }) errorMessage: string;
  @Prop({ mutable: true }) addButtonIcon: string = "icon-plus";
  @Prop({ mutable: true }) removeButtonIcon: string = "icon-minus";
  @Prop({ mutable: true }) addButtonColor: string = "blue";
  @Prop({ mutable: true }) removeButtonColor: string = "blue";

  @State() elKey: number = 0;

  columnWidth;

  componentDidLoad() {
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputTableEl);
    }
  }

  componentDidUpdate() {
    this.columnWidth = !this.readonly && !this.disabled ?
      `width: calc(${100 / (this.tableHeaders.length)}% - ${80 / (this.tableHeaders.length)}px)` :
      `width: ${100 / (this.tableHeaders.length)}%`;
    const els = this.insInputTableEl.querySelectorAll('.ins-input-table_column');

    for (const key in els) {
      const el = els[key];
      if (el && el.setAttribute) el.setAttribute("style", this.columnWidth);
    }

    this.elKey = this.tableData.length;

    if (!this.elKey) this.tableData = [this.emptyValue()];
  }

  @Method()
  async setValue(value) {
    this.tableData = value;
    return await value;
  }

  @Method()
  async getValue() {
    return await this.tableData;
  }

  @Listen('insValueChange')
  insInputHander(event) {
    let childEl = event.target;
    let childIndex = 0;

    if (childEl.parentNode.previousSibling) {
      childEl = childEl.parentNode;
      do {
        childEl = childEl.previousSibling;
        childIndex++;
      } while (childEl.previousSibling);
    } else {
      childIndex = 0;
    }

    let parentEl = event.target.parentNode.parentNode;
    let parentIndex = 0;

    if (parentEl.previousSibling) {
      do {
        parentEl = parentEl.previousSibling;
        parentIndex++;
      } while (parentEl.previousSibling);
    } else {
      parentIndex = 0;
    }

    this.tableData[parentIndex][this.tableHeaders[childIndex].name] = event.detail;
    this.insInput.emit(this.tableData);
  }

  @Listen('insClick')
  insClickHander(event) {
    let action = "remove";
    if (!event.target.previousSibling) action = "add";

    let parentEl = event.target.parentNode.parentNode;
    let parentIndex = 0;

    if (parentEl.previousSibling) {
      do {
        parentEl = parentEl.previousSibling;
        parentIndex++;
      } while (parentEl.previousSibling);
    } else {
      parentIndex = 0;
    }

    if (action === "remove") {
      this.tableData.splice(parentIndex, 1);

      if (!this.tableData.length) {
        this.tableData = [this.emptyValue()];
      }
    } else {
      if (parentIndex === this.tableData.length) {
        this.tableData.push(this.emptyValue());
      } else {
        this.tableData.splice(parentIndex + 1, 0, this.emptyValue());
      }
    }

    this.elKey = this.tableData.length;
    this.insInput.emit(this.tableData);
  }

  emptyValue() {
    let empty = {};
    for (const header of this.tableHeaders) {
      empty[header.name] = null;
    }

    return empty;
  }

  render() {
    return (
      <div class={`ins-input-table ${this.hasError ? 'has-error' : ''}`}>
        <div class="ins-input-table_label">{this.label}</div>
        <div class="ins-input-table_header">
          {
            this.tableHeaders.map((item) => {
              return (
                <div class="table-header ins-input-table_column">{ item.label }</div>
              )
            })
          }
        </div>

        <div>
          {
            this.elKey ?
              this.tableData.map((item) => {
                return (
                  <div class="ins-input-table_row">
                    {
                      this.tableHeaders.map((header, index) => {
                        return (
                          <div class="ins-input-table_column">
                            <ins-input
                              label={header.label}
                              key={index}
                              value={item[header.name]}
                              disabled={this.disabled}
                              readonly={this.readonly}
                              hasError={this.hasError}>
                            </ins-input>
                          </div>
                        )
                      })
                    }
                    {
                      !this.readonly && !this.disabled ?
                      <div class="ins-input-table_buttons">
                        <ins-button
                          icon={this.addButtonIcon}
                          color={this.addButtonColor}
                          label="">
                        </ins-button>
                        <ins-button
                          icon={this.removeButtonIcon}
                          color={this.removeButtonColor}
                          label="">
                        </ins-button>
                      </div> : ''
                    }
                  </div>
                )
              })
            :
            <div class="ins-input-table_row">
              {
                this.tableHeaders.map((header) => {
                  return (
                    <div class="ins-input-table_column">
                      <ins-input
                        label={header.label}
                        disabled={this.disabled}
                        readonly={this.readonly}
                        hasError={this.hasError}>
                      </ins-input>
                    </div>
                  )
                })
              }
              {
                !this.readonly && !this.disabled ?
                <div class="ins-input-table_buttons">
                  <ins-button
                    icon={this.addButtonIcon}
                    color={this.addButtonColor}
                    label="">
                  </ins-button>
                  <ins-button
                    icon={this.removeButtonIcon}
                    color={this.removeButtonColor}
                    label="">
                  </ins-button>
                </div> : ''
              }
            </div>
          }
        </div>


        { this.hasError ?
          <div class="ins-form-error">
            { this.errorMessage }
          </div>
        : ''}
      </div>
    );
  }
}
