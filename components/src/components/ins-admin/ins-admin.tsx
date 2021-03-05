import { h, Component } from "@stencil/core";

@Component({ tag: 'ins-admin' })
export class InsAdmin {
  render() {
    return <div><slot /></div>
  }
}
