import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-table-th' })
export class InsTableTh {
  
  render(){
    return <slot />
  }
}
