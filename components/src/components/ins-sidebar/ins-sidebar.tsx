import { h, Component, Prop, Event, EventEmitter, State, Method, Listen, Element } from "@stencil/core";

@Component({ tag: 'ins-sidebar' })
export class InsSidebar {
  @Element() insSidebarEl: HTMLElement;

  @Prop({mutable: true}) fullLogo: string = "";
  @Prop(({mutable: true})) iconLogo: string = "";
  // @Prop(({mutable: true})) withSidebarActions: boolean = false;
  @State() minimised: boolean;
  @State() noFooter: boolean = false;
  @Event() sidebarAction: EventEmitter;

  @Listen('insSidebarFooterButtonEvent')
  insSidebarFooterButtonEventHandler(event: CustomEvent) {
    let tgt = event.target as any;
    if(tgt.attributes.open) {
      let open = tgt.attributes.open.value;
      let insSidebarItem = this.insSidebarEl.querySelector(`ins-sidebar-item[footer-link="${open}"]`) as any;
      // insSidebarItem.activate();
      insSidebarItem.showSubMenu();
    }
  }

  @Method()
  minimise(){
    this.minimised = !this.minimised;
  }

  @Method()
  val(attr, value) {
    let data = {
      fullLogo: this.fullLogo,
      iconLogo: this.iconLogo
      // withSidebarActions: this.withSidebarActions
    };
    if (attr && typeof attr == "object" && !value) {
      // console.log('this is json');
    }
    else if (attr && !value) {
      return this[attr];
    }
    else if (attr && value) {
      this[attr] = value;
    }
    else {
      return data;
    }
  }

  sidebarActionEventHandler(event){
    this.sidebarAction.emit(event);
  }

  componentDidLoad(){
    let hasFooter = this.insSidebarEl.querySelector('ins-sidebar-footer');

    if (!hasFooter){
      this.noFooter = true;
    }
  }

  render() {
    return (
      <div class={`sidebar ${this.noFooter ? 'no-footer':''}`}>
        <div class="insites-logo-wrap">
          {this.minimised ?
            <img src={this.iconLogo ? this.iconLogo : 'http://ins-styleguide.s3-website-us-west-2.amazonaws.com/assets/images/insites_logo_icon.svg' }/> :
            <img src={this.fullLogo ? this.fullLogo : 'http://ins-styleguide.s3-website-us-west-2.amazonaws.com/assets/images/Insites_logo.svg'}/>
          }

          {/* <div class="insites-logo"
            style={`background-image: ${this.minimised ? this.iconLogo : this.fullLogo}`}>
          </div> */}
          {/* <img class="icon-img" src={this.iconLogo ? this.iconLogo : 'http://ins-styleguide.s3-website-us-west-2.amazonaws.com/assets/images/insites_logo_icon.svg'} /> */}
        </div>
        <div class="sidebar-items-wrap">
          <slot />
        </div>

        {/* {this.withSidebarActions ?
          <div class="sidebar-action">
            <div>
              <span class="icon-settings-1" onClick={event => this.sidebarActionEventHandler(event)}></span>
            </div>
            <div>
              <span class="icon-lock-1" onClick={event => this.sidebarActionEventHandler(event)}></span>
            </div>
            <div>
              <span class="icon-logout-1" onClick={event => this.sidebarActionEventHandler(event)}></span>
            </div>
          </div>
        : ''} */}
      </div>
    )
  }
}
