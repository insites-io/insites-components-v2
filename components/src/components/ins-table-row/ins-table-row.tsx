import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-table-row' })
export class InsTableRow {

  render() {
    return <slot />;
  }
}
