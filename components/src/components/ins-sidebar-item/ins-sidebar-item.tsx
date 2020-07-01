import { h, Component, Prop, Event, EventEmitter, State, Method, Element } from '@stencil/core';

@Component({ tag: 'ins-sidebar-item' })
export class InsSidebarItem {
  @Element() insSidebarItemEl: HTMLElement;
  @Event() routePage: EventEmitter;
  @Prop({mutable: true}) link: any = '';
  @Prop({mutable: true}) footerLink: string = '';
  @Prop({mutable: true}) icon: any = 'no-icon';
  @Prop({mutable: true}) app: boolean = false;
  @Prop({mutable: true}) withSubmenu: boolean = false;
  @Prop({mutable: true}) label: string = 'Label';
  @Prop({mutable: true}) landingPage: boolean = false;
  @Prop({ context: 'formatUrl' }) private formatUrl: any = () => {};
  @Prop({ context: 'addRippleEffect' }) private addRippleEffect: any;

  @State() submenuVisible: boolean;
  @State() isActive: boolean;
  @State() formattedRoute: string;
  @State() showTooltip: boolean = false;

  @Method()
  async routePageHandler(e){
    let redirect = false;

    if (e) {
      if (e === "landing") redirect = true
      else e.preventDefault();
    }

    this.activate();
    let gettingCrumbs = true;
    let currentClosesEl = this.insSidebarItemEl.parentElement.closest('ins-sidebar-item');

    let crumbs = [];

    let crumb = {
      link: this.link,
      app: this.app,
      withSubmenu: this.withSubmenu,
      label: this.label,
      formattedRoute: this.formattedRoute
    }

    crumbs.push(crumb);

    while (gettingCrumbs){
      if (currentClosesEl){
        let crumb = {
          link: currentClosesEl.link,
          app: currentClosesEl.app,
          withSubmenu: currentClosesEl.withSubmenu,
          label: currentClosesEl.label,
          formattedRoute: this.formattedRoute
        };
        crumbs.push(crumb);
        currentClosesEl = currentClosesEl.parentElement.closest('ins-sidebar-item');
      } else { gettingCrumbs = false }
    }
    crumbs.reverse();

    this.toggleMenuNav();
    this.routePage.emit({ crumbs, redirect });
    this.hideSiblingsMenu();

    let body = document.querySelector('body');
    body.style.overflowY = null;

    if (this.app) {
      document.querySelector('body').style.overflowY = 'hidden';
    }

    const mq = window.matchMedia("(max-width: 1260px)");
    let menuBar = document.querySelector('ins-sidebar') as any;
    if (mq.matches) {
      document.querySelector('ins-admin').classList.add('mini');
      menuBar.minimise();
    }

    return { crumbs }
  }

  toggleMenuNav() {
    let insHeaderEl = document.querySelector('ins-header') as any,
        menuNav = insHeaderEl.querySelector('.full-width-navs');

    if (this.hasClass(menuNav, 'active')) {
      insHeaderEl.toggleNav();
    }
  }

  hasClass(element, cls){
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  toggleSidebar() {
    let insAdminEl = document.querySelector('ins-admin');
    let menuBar = document.querySelector("ins-header") as any;
    if (menuBar && insAdminEl.className.includes('mini')) {
        menuBar.toggleSidebar();
    }
  }

  @Method()
  async showSubMenu(){
    let insAdminEl = document.querySelector('ins-admin');

    if (this.withSubmenu && insAdminEl.className.includes('mini')) {
      this.hideSiblingsMenu();
    }

    this.submenuVisible = true;
    this.toggleSidebar();
  }

  @Method()
  async hideSubMenu(){
    this.submenuVisible = false;
  }

  @Method()
  async activate(){
    this.deactivateSiblings();
    let checkIfSubMenu = this.insSidebarItemEl.closest('.submenu-wrap');
    if (checkIfSubMenu) {
      checkIfSubMenu.closest('ins-sidebar-item').activateParent();
    }
  }

  @Method()
  async activateParent(){
    this.isActive = true;
  }

  @Method()
  async deactivate(){
    this.isActive = false;
  }

  hideSiblingsMenu(){
    let submenuWrapEls = this.insSidebarItemEl.closest('ins-sidebar').querySelectorAll('ins-sidebar-item') as any;

    for (let i = 0; i < submenuWrapEls.length; ++i) {
      submenuWrapEls[i].hideSubMenu();
    }
  }

  deactivateSiblings(){
    let submenuWrapEls = this.insSidebarItemEl.closest('ins-sidebar').querySelectorAll('ins-sidebar-item') as any;

    for (let i = 0; i < submenuWrapEls.length; ++i) {
      submenuWrapEls[i].deactivate();
    }
    this.isActive = true;
  }

  componentWillLoad(){
    this.formattedRoute = this.locFormatRoute();
  }

  componentDidLoad(){
    let target = this.insSidebarItemEl.querySelector('.ins-ripple-button') as HTMLElement;
    this.insSidebarItemEl.addEventListener('click', e => {
      e.stopPropagation();
      let tgt = e.target as any;
      let parent = tgt.parentNode;
      if (!parent.classList.contains('btn-nav')){
        this.addRippleEffect(e, target);
      }
    });
  }

  @Method()
  async formatRoute() {
    return this.locFormatRoute();
  }

  locFormatRoute() {
    if (this.app) {
      let subItem = this.insSidebarItemEl.closest('ins-sidebar-item[with-submenu]') as any;
      let formattedUrl = (subItem) ? `${subItem.label}/${this.label}` : this.label;
      formattedUrl = this.formatUrl(formattedUrl);
      return '#/app/' + formattedUrl;
    }
    return this.link;
  }

  mouseLeaveHandler(){
    let insAdminEl = document.querySelector('ins-admin');

    if (insAdminEl && insAdminEl.className.includes('mini')) {
      this.hideSubMenu();
    }
  }

  toggleTooltip(state){
    this.showTooltip = state;
  }

  render(){

    if (this.withSubmenu) {
      return (
        <div class={`ins-sidebar-item-wrap
          ${this.isActive ? 'active': ''}
          ${this.showTooltip ? 'show-tooltip': ''}
          ${this.icon ? '' : 'no-icon'}` }>

          <div class="ins-ripple-button">

            <a onClick={() => this.showSubMenu()} class="ins-ripple-link">

              <i class={`fas ${this.icon}`}
                onMouseEnter={() => this.toggleTooltip(true)}
                onMouseLeave={() => this.toggleTooltip(false)}>
              </i>
              <span class="ins-sidebar-item-label">{this.label}</span>
              <i class="fas icon-chevron-right"></i>
            </a>
          </div>

          <div class="ins-sidebar-item-tooltip">{this.label}</div>

          <div class="relative-wrap">
            <div class={`submenu-wrap ${this.submenuVisible ? 'is-active':''}`}
              onMouseLeave={() => this.mouseLeaveHandler()}>

              <div class="btn-nav-wrap">
                <button class="btn-nav" onClick={() => this.hideSubMenu()}>
                  <i class="fas icon-chevron-left"></i>
                  <span>{this.label}</span>
                </button>
              </div>
              <slot />
            </div>
          </div>
        </div>
      )
    } else {
      if (this.label !== ""){
        return (
          <div class={`ins-sidebar-item-wrap
            ${this.isActive ? 'active': ''}
            ${this.showTooltip ? 'show-tooltip': ''}
            ${this.icon ? '' : 'no-icon'}`}>

            <div class="ins-ripple-button">
              {this.app ?
                <a class="ins-ripple-link"
                  href={`${this.formattedRoute}`}>

                  <i class={`fas ${this.icon}`}
                    onMouseEnter={() => this.toggleTooltip(true)}
                    onMouseLeave={() => this.toggleTooltip(false)}>

                  </i>
                  <span class="ins-sidebar-item-label">{this.label}</span>
                </a>
                :
                <a class="ins-ripple-link"
                  href={this.link ? this.link : ''}>

                  <i class={`fas ${this.icon}`}></i>
                  <span class="ins-sidebar-item-label">{this.label}</span>
                </a>
              }
            </div>
            <div class="ins-sidebar-item-tooltip">{this.label}</div>
          </div>
        )
      }
    }
  }
}
