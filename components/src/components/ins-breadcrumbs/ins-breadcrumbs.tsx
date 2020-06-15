import { h, Component, State, Method, Event, EventEmitter } from '@stencil/core';

@Component({ tag: 'ins-breadcrumbs' })
export class InsBreadCrumbs {
  @State() breadcrumbs: Array<any> = [];
  @Event() routePage: EventEmitter;

  routePageHandler(crumb, index){
    let count = this.breadcrumbs.length;
    let lastCrumb = (count - 1) === index;
    if (!crumb.withSubmenu && !lastCrumb){
      this.breadcrumbs.splice((index + 1), count);
      let newRef = JSON.parse(JSON.stringify(this.breadcrumbs));
      this.routePage.emit({
        crumbs: newRef
      });
    }
  }

  @Method()
  updateCrumbs(crumbs, noRedirect = false){
    this.breadcrumbs = crumbs;
    let parsedCrumbs = JSON.stringify(crumbs);
    window.localStorage.setItem('ins_breadcrumbs', parsedCrumbs);
    let lastCrumb = JSON.parse(parsedCrumbs).pop();
    if (!lastCrumb.app && !lastCrumb.withSubmenu){
      if (!noRedirect) {
        window.location.assign(lastCrumb.link);
      }
    }
  }

  render() {
    if (this.breadcrumbs.length > 1) {
      return (
        <div class="ins-breadcrumbs">
          <ul>
            {/* <li>Home <span class="icon-chevron-right"></span></li> */}
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
