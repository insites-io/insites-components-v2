import { h, Component, State, Prop, Element, Method } from "@stencil/core";

@Component({ tag: 'ins-header' })
export class InsHeader {
  @Element() insHeaderEl: HTMLElement;

  @Prop({ mutable: true }) supportLink: string;
  @Prop({ mutable: true }) hasMenuToggle: boolean = true;

  @State() sidebarMini: boolean;
  @State() hasSidebar: boolean;
  @State() insAdminEl: any;
  @State() insNotificationsEl: any;
  @State() insSidebarEl: any;

  insNavEl: any;
  @State() fullScreenState: any;

  componentWillLoad() {
    this.sidebarMini = false;
    this.fullScreenState = false;
    this.insAdminEl = document.querySelector('ins-admin');
    this.insNotificationsEl = document.querySelector('ins-notifications');
    this.insSidebarEl = document.querySelector('ins-sidebar');
  }

  componentDidLoad() {
    let $this = this;
    this.insNavEl = document.querySelector('.full-width-navs');

    window.onresize = function() {
        $this.toggleMinimise();
    };

    this.toggleMinimise();
  }

  toggleMinimise() {
    const mq = window.matchMedia( "(max-width: 1260px)" );
    let $this = this;

    if (mq.matches) {
      this.insAdminEl.classList.add('mini');
      if (!$this.sidebarMini && this.insSidebarEl) {
        this.insSidebarEl.minimise();
      }
    } else {
      if ($this.sidebarMini) {
        $this.toggleSidebar();
      }
    }
  }

  @Method()
  async toggleSidebar(){
    if (this.hasClass(this.insNavEl, 'active')) {
      this.insNavEl.classList.remove('active');
      this.insHeaderEl.querySelector('.ellipsis').classList.remove('active');
    }

    this.sidebarMini = !this.sidebarMini;
    if (this.insSidebarEl){
      this.insSidebarEl.minimise();
    }

    if (this.insAdminEl){
      this.insAdminEl.classList.toggle('mini');
    }

    let insAdminEl = document.querySelector('ins-admin');
    let submenuWrapEls = document.querySelectorAll('ins-sidebar-item');
    let footerMenus = document.querySelectorAll('ins-sidebar-footer-menu');

    if (insAdminEl.className.includes('mini')){
      for (let i = 0; i < submenuWrapEls.length; ++i) {
        let submenuWrap = submenuWrapEls[i] as any;
        submenuWrap.hideSubMenu();
      }
      for (let i = 0; i < footerMenus.length; ++i) {
        let footerMenu = footerMenus[i] as any;
        footerMenu.hideMenu();
      }
    }

  }

  @Method()
  async toggleNav(){
    if (!this.hasClass(this.insAdminEl, 'mini')) {
      this.toggleSidebar();
    }
    this.insNavEl.classList.toggle('active');
    this.insHeaderEl.querySelector('.ellipsis').classList.toggle('active');
  }

  toggleFullScreen(){
    let doc = document as any;

    if (this.fullScreenState) {
      if (doc.cancelFullScreen) {
        doc.cancelFullScreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    } else {
      let el = doc.documentElement;
      let rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      rfs.call(el);
    }

    this.fullScreenState = !this.fullScreenState;
  }

  toggleNotifications(){
    this.insNotificationsEl.toggleNotificationshandler();
  }

  checkURL(url){
      if (url.includes('https://')){
          return url;
      } else if (url.includes('http://')){
          return url;
      } else {
          return `//${url}`;
      }
  }

  goToSupportLink() {
    window.open(this.checkURL(this.supportLink))
  }

  hasClass(element, cls){
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  render() {
    return (
      <div class="ins-header-wrap">
        {this.insSidebarEl && this.hasMenuToggle ?
        <button id="insSidebarToggler" class="burger"
          onClick={() => this.toggleSidebar()}>
          <span></span>
          <span></span>
          <span></span>
        </button> : ''}

        <div class="full-width-navs">
          <button class="icon-nav" onClick={() => this.toggleFullScreen()}>
            {this.fullScreenState ?
            <i class="icon-minimize-1"></i> :
            <i class="icon-maximize"></i>}
          </button>
          {this.supportLink ?
          <button class="icon-nav"
            onClick={() => this.goToSupportLink()}>
            <i class="icon-support-1"></i>
          </button> : ''}

          {/* TODO: include on styleguide */}

          {this.insNotificationsEl ?
          <button class="icon-nav" onClick={() => this.toggleNotifications()}>
            <i class="icon-notification-1"></i>
          </button> : ''}

          <slot />
        </div>

        <div class="minified-navs">
          <button id="insHeaderToggler" class="ellipsis" onClick={() => this.toggleNav()}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    )
  }
}
