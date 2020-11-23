import { h, Component, Prop, Event, EventEmitter, State, Method, Listen, Element } from "@stencil/core";

@Component({ tag: 'ins-sidebar' })
export class InsSidebar {
  @Element() insSidebarEl: HTMLElement;
  @Event() insSidebarAction: EventEmitter;
  @Event() didLoad: EventEmitter;

  @Prop() hasLoad: string;
  @Prop({ mutable: true }) fullLogo: string;
  @Prop({ mutable: true }) iconLogo: string;

  @State() minimised: boolean;
  @State() noFooter: boolean = false;

  baseURL = "http://components.insites.io/assets/images";

  componentDidLoad(){
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insSidebarEl);
    }
  }

  @Listen('insSidebarFooterButtonEvent')
  insSidebarFooterButtonEventHandler(event: CustomEvent) {
    let tgt = event.target as any;
    if(tgt.attributes.open) {
      let open = tgt.attributes.open.value;
      let insSidebarItem = this.insSidebarEl
        .querySelector(`ins-sidebar-item[footer-link="${open}"]`) as any;

      insSidebarItem.showSubMenu();
    }
  }

  @Method()
  async minimise(){
    this.minimised = true;
  }

  @Method()
  async maximise(){
    this.minimised = false;
  }

  sidebarActionEventHandler(event){
    this.insSidebarAction.emit(event);
  }

  componentWillLoad(){
    let hasFooter = this.insSidebarEl.querySelector('ins-sidebar-footer');

    if (!hasFooter){
      this.noFooter = true;
    }
  }

  getIcon(){
    return this.iconLogo ? this.iconLogo : `${this.baseURL}/insites_logo_icon.svg`;
  }

  getLogo(){
    return this.fullLogo ? this.fullLogo : `${this.baseURL}/Insites_logo.svg`
  }

  render() {
    return (
      <div class={`sidebar ${this.noFooter ? 'no-footer':''}`}>
        <div class="insites-logo-wrap">
        { this.minimised
            ? <img src={ this.getIcon() } />
            : <img src={ this.getLogo() }/>
          }
        </div>

        <div class="sidebar-items-wrap">
          <slot />
        </div>
      </div>
    )
  }
}
