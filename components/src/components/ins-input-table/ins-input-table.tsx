import { h, Component, Prop, Element, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-input-table' })
export class InsInputTable {
  @Element() insInputTableEl: HTMLElement;
  @Event() didLoad: EventEmitter;

  @Prop() hasLoad: string;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) tableHeaders: any = [];
  @Prop({ mutable: true }) tableData: any = [];

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insInputTableEl);
    }
  }

  // renderTableHeaders() {
  //   return (
  //     this.tableHeaders.map((item) => {
  //       return (
  //         <div class="table-header">{ item.label }</div>
  //       )
  //     })
  //   )
  // }

  renderTableDataInput(key, value) {
    console.log(key)
    return (
      <p>{value}</p>
    )
  }

  render() {
    return (
      <div class="ins-input-table">
        <div class="ins-input-table_label">{this.label}</div>
          <div>

            {
              this.tableHeaders.map((item) => {
                return (
                  <div class="table-header">{ item.label }</div>
                )
              })
            }

          </div>

          <div>
            {
              this.tableData.map((item) => {
                Object.keys(item).map((key) => {
                  return (
                    this.renderTableDataInput(key, item[key])
                  )
                });
              })
            }
        </div>
      </div>
    );
  }
}
