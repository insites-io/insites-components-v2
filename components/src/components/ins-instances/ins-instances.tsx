import { h, Component, State, Prop, Listen, Element, Method } from "@stencil/core";
declare var $;
@Component({ tag: 'ins-instances' })
export class InsInstances {
  @Element() el: HTMLElement;
  @Prop({ mutable: true }) logoLink: string = "";
  @Prop({ mutable: true }) instance: string = "";
  @Prop({ mutable: true }) instanceLink: string = "";
  @Prop({ mutable: true }) newTab: boolean = false;
  // @State() logoLinkState: string;
  // @State() activeInstanceState: string;
  @State() dropDownState: boolean;
  @State() hasItems: boolean;
  @State() activeSubItem: boolean;

  @Listen('activeSubItem')
  activeSubItemHandler(){
    this.activeSubItem = false;
  }

  @Listen('routeInstance')
  routeInstanceHandler(event){
    // this.toggleDropDown();
    this.instance = event.detail.instance;
    this.logoLink = event.detail.logoLink;

    this.activeSubItem = event.detail.withSubItem;
  }

  componentWillLoad(){

    if (this.el.querySelectorAll('ins-instances-item').length > 0) {
      this.hasItems = true;
    }

    // this.updateState();
  }

  componentDidLoad() {
    if ((window as any).$){
      $('#instancesLogo').on('error', function () {
        $(this).attr('src', 'https://lh4.googleusercontent.com/-k147BY0tZM8/AAAAAAAAAAI/AAAAAAAAARY/NL7bNLj_cV8/photo.jpg?sz=32');
      });
    }
  }

  @Method()
  val(attr, value) {
    let data = {
      logoLink: this.logoLink,
      instance: this.instance,
      instanceLink: this.instanceLink,
      newTab: this.newTab
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
  // updateState(){
  //   // this.activeInstanceState = this.instance;
  //   // this.logoLinkState = this.logoLink;
  // }

  toggleDropDown(){
    this.dropDownState = !this.dropDownState;
  }

  relocate(link){
    link = (link) ? link : '/';

    if (this.newTab) {
      window.open(link, '_blank');
      return;
    }

    window.location.assign(link);
  }

  render() {
    return (
      <div class={`ins-instances-wrap ${this.activeSubItem ? 'sub-item-active' : ''}`}>
        <div class="active-instance">
          <button class={this.hasItems ? 'has-items' : ''}>   {/*onClick={() => this.relocate(this.instanceLink)}*/} {/* onClick={() => this.toggleDropDown()} */}
            {/* {this.logoLink !== 'no-icon' ? <img class="instancesLogo" src={this.logoLink} /> : '' } */}
            <img src={this.logoLink ? this.logoLink : 'http://ins-styleguide.s3-website-us-west-2.amazonaws.com/assets/images/insites_logo_icon.svg'} />
            <span class="active-instance-label">
              {this.instance ? this.instance : 'Label'}
            </span>

            <div class="icons-wrap">
              <i class="icon-keyboard-arrow-up"></i>
              <i class="icon-keyboard-arrow-up down"></i>
            </div>
          </button>
        </div>

        {/* class={this.dropDownState ? 'ins-instances-options active': 'ins-instances-options'} */}
        {this.hasItems ?
        <div class="ins-instances-options">
            <ins-card steady>
              <ins-searchbar placeholder="Search"></ins-searchbar>
              <div class="scroll-wrap">
                <slot />
              </div>
            </ins-card>
        </div> : ''}
      </div>
    )
  }
}
