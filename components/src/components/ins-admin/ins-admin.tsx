import { h, Component, Listen, State, Element } from "@stencil/core";

@Component({ tag: 'ins-admin' })
export class InsAdmin {
  @Element() insAdminEl: Element;
  @State() insRenderer: any;
  @State() crumbs: any;
  @State() sidebarItemEls: any;

  reroute: boolean = false;

  @Listen('routePage')
  routePageHandler(event: CustomEvent) {
    this.updateRoute(event.detail.crumbs, event.detail.redirect);
  }

  updateRoute(crumbs, redirect) {
    let noRedirect = !redirect;
    this.insRenderer = this.insAdminEl.querySelector('ins-renderer');
    if (this.reroute){
      let queryStrings = window.location.hash.split("?")[1].split("&");
      queryStrings.forEach(item => {

        if (item.includes("reroute=")){
          crumbs[0].link = item.substring(8, item.length);

        } else if (item.includes("reroutelabel=")){
          crumbs[0].label = decodeURIComponent(item.substring(13, item.length));
        }

      });
      this.reroute = false;
    }
    this.insRenderer.updateRoute(crumbs, noRedirect, true);
  }

  componentDidLoad() {
    this.sidebarItemEls = this.insAdminEl.querySelectorAll('ins-sidebar-item');
    this.checkHash();
    this.activateDeepLink();

    window.onhashchange = () => {
      this.checkHash();
    };
  }

  goToMyProfilePage(){
    let insHeaderUserEl = this.insAdminEl.querySelector('ins-header-user');
    insHeaderUserEl.routePageHandler();
  }

  checkIfRoot(show){
    let currentHash = window.location.hash;
    if (currentHash === "" || currentHash === "#/"){
      if (show) this.showLandingPage();
      return false;
    }
    return currentHash;
  }

  checkHash(){
    let route = this.checkIfRoot(true);
    if (window.location.hash === "#/app/my-profile"){
      this.goToMyProfilePage();
    } else if (route) {
      this.matchHash(route, false);
    }
  }

  activateDeepLink(){
    if (this.checkIfRoot(false)){
      let currentCrumbs = window.localStorage.getItem('ins_breadcrumbs');
      let parsedCrumbs = JSON.parse(currentCrumbs);
      this.activateSidebarItem(parsedCrumbs);
    }
  }

  activateSidebarItem(crumbs){
    let reversed = crumbs.reverse();
    let again = true;
    reversed.forEach(item => {
      if (again) {
        let currentHash = item.app
          ? item.formattedRoute
          : item.link;

        if (this.matchHash(currentHash, true)){
          again = false;
        }
      }
    });
  }

  showLandingPage(){
    for (let i = 0; i < this.sidebarItemEls.length; i++) {
      if (this.sidebarItemEls[i].landingPage){
        this.showSubmenu(this.sidebarItemEls[i]);
        this.sidebarItemEls[i].routePageHandler("landing");
        break;
      }
    }
  }

  matchHash(currentHash, deeplink){
    for (let i = 0; i < this.sidebarItemEls.length; i++) {

      if (currentHash === this.sidebarItemEls[i].formatRoute()){
        this.loadRoute(this.sidebarItemEls[i], deeplink);
        return true;

      } else if (
          this.sidebarItemEls[i].formatRoute()
          && currentHash.includes(this.sidebarItemEls[i].formatRoute())
          && currentHash.includes("?reroute=")
          && this.sidebarItemEls[i].app
      ){
        this.reroute = true;
        this.loadRoute(this.sidebarItemEls[i], deeplink);
        return true;
      }

    }
  }

  loadRoute(sidebarItem, deeplink){
    if (!deeplink){
      sidebarItem.routePageHandler();
    } else {
      sidebarItem.activate();
    }

    this.hideSubmenus(sidebarItem);

    if (!this.insAdminEl.className.includes('mini')){
      this.showSubmenu(sidebarItem);
    }
  }

  showSubmenu(e) {
    let withSubmenu = e.closest('ins-sidebar-item[with-submenu]');
    if (withSubmenu) {
      withSubmenu.showSubMenu();
    }
  }

  hideSubmenus(e){
    let selectedSidebarItemParent = e.closest('ins-sidebar-item[with-submenu]');

    for (let i = 0; i < this.sidebarItemEls.length; i++) {
      let sidebarItemParent = this.sidebarItemEls[i].closest('ins-sidebar-item[with-submenu]');

      if (selectedSidebarItemParent !== sidebarItemParent) {
        if (sidebarItemParent){
          sidebarItemParent.hideSubMenu();
        }
      }
    }
  }

  render() {
    return (
      <div>
        <slot />
      </div>
    )
  }
}
