import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-base-table-row' })
export class InsBaseTableRow {

  render() {
    return <slot />;
  }
}
