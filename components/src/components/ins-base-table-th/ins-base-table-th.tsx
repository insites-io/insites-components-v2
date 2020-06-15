import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-base-table-th' })
export class InsBaseTableTh {
  
  render(){
    return <slot />
  }
}
