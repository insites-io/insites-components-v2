import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-base-table-td' })
export class InsBaseTableTd {

  render() {
    return <slot />
  }
}
