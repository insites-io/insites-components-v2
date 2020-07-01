import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-table-td' })
export class InsTableTd {

  render() {
    return <slot />
  }
}
