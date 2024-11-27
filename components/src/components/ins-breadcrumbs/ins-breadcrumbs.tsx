import { h, Component, Prop, Method, Event, EventEmitter, Element } from '@stencil/core';

@Component({ tag: 'ins-breadcrumbs' })
export class InsBreadCrumbs {
  @Element() insBreadCrumbsEl: HTMLElement;
  @Prop({ mutable: true }) breadcrumbs: Array<any> = [];
  @Event() routePage: EventEmitter;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;
  @Prop({ mutable: true }) load: boolean = false;
  @Prop({ mutable: true }) checkLoad: boolean = false;

  componentDidLoad(){
    if (this.checkLoad) this.load = true;
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insBreadCrumbsEl);
    }
  }

  routePageHandler(crumb, index){
    let count = this.breadcrumbs.length;
    let lastCrumb = (count - 1) === index;
    if (!crumb.withSubmenu && !lastCrumb){
      this.breadcrumbs.splice((index + 1), count);
      let newRef = JSON.parse(JSON.stringify(this.breadcrumbs));
      this.routePage.emit({
        crumbs: newRef,
        redirect: true
      });
    }
  }

  @Method()
  async updateCrumbs(crumbs, noRedirect = false){
    this.breadcrumbs = crumbs;
    let parsedCrumbs = JSON.stringify(crumbs);
    window.localStorage.setItem('ins_breadcrumbs', parsedCrumbs);

    let lastCrumb = JSON.parse(parsedCrumbs).pop();
    if (!lastCrumb.app && !lastCrumb.withSubmenu){
      if (!noRedirect) {
        document.location.hash = lastCrumb.link;
      }
    }
  }

  render() {
    if (this.breadcrumbs.length > 1) {
      return (
        <div class="ins-breadcrumbs">
          <ul>
            {this.breadcrumbs.map((crumb, index) => {
              return (
                <li>
                  <span class={`crumb-label ${crumb.withSubmenu ? '': 'has-link'}`}
                    onClick={() => this.routePageHandler(crumb, index)}>
                    {crumb.label}
                  </span>
                  <span class="arrow-right"></span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}
