import { h, Component, Prop, State, Method, Element, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-renderer' })
export class InsRenderer {
  @Element() insRendererEl: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Prop() hasLoad: string;

  @State() insBreadCrumbsEl: any;
  @Prop({ mutable: true }) link: string;
  @Prop({ mutable: true }) disableBreadcrumbs: boolean = false;
  @Prop({ mutable: true }) app: boolean = false;
  @Prop({ mutable: true }) label: string;

  route: any = {
    label: "", link: ""
  };

  rerouting: boolean = false;
  breadcrumbs: any = [];
  insRendererFrameEl: any;

  titleEl: any;
  breadcrumbsEl: any;
  wrapEl: any;
  slotWrapEl: any;

  @Method()
  async updateRoute(newRoutes, noRedirect = false, iframe) {
    if (newRoutes && newRoutes.length && !this.disableBreadcrumbs) {
      let last = newRoutes.length - 1;
      this.route = newRoutes[last];
      this.updateBreadcrumbs(newRoutes, noRedirect);
      this.updateElements();

      if (this.route.app) {
        if (!noRedirect || iframe) {
          this.insRendererFrameEl.contentWindow.location.replace(this.route.link);
        }
      }
    }
  }

  updateElements(){
    if (this.route.app) this.wrapEl.classList.add('app')
    else this.wrapEl.classList.remove('app');

    this.titleEl.innerHTML = this.route.label;

    if (this.breadcrumbs.length > 1) {
      let divEl = document.createElement('div');
      divEl.className = "ins-breadcrumbs"

      let ulEl = document.createElement('ul');

      for (let i = 0; i < this.breadcrumbs.length; i++){
        let spanEl = document.createElement('span');
        spanEl.className = `crumb-label ${this.breadcrumbs[i].withSubmenu ? '': 'has-link'}`;
        spanEl.textContent = this.breadcrumbs[i].label;
        spanEl.addEventListener('click', () => this.routePageHandler(this.breadcrumbs[i], i));

        let arrowEl = document.createElement('span');
        arrowEl.className = "arrow-right"

        let liEl = document.createElement('li');
        liEl.appendChild(spanEl);
        liEl.appendChild(arrowEl);

        ulEl.appendChild(liEl);
      }

      divEl.appendChild(ulEl);

      this.breadcrumbsEl.innerHTML = "";
      this.breadcrumbsEl.appendChild(divEl);
    }
  }

  formatUrl(e){
    return e.toLowerCase()
        .replace(/ +(?= )/g, '')
        .replace(/- | - | -| /gi, '-')
        .replace(/-+(?=)/g, '-');
  }

  componentWillLoad() {
    if (this.link) {
      this.route = {
        label: this.label ? this.label : 'Default Page',
        app: this.app,
        link: this.link
      }
    }
  }

  @Method()
  async resizeIframe() {
    this.insRendererFrameEl.style.height = this.insRendererFrameEl.contentWindow.document.body.scrollHeight + 'px';
    this.insRendererFrameEl.style.opacity = '1';
  }

  @Method()
  async updateRouteLabel(value) {
    this.route.label = value;
  }

  componentDidLoad() {
    this.getElements();
    this.bindIframeListener();
    this.didLoad.emit();
    if (this.hasLoad && window["Insites"]){
      let func = window["Insites"].methods[this.hasLoad];
      if (func) func(this.insRendererEl);
    }
  }

  getElements(){
    this.wrapEl = this.insRendererEl.querySelector('.ins-renderer-wrap');
    this.titleEl = this.insRendererEl.querySelector('.ins-renderer-wrap__title-span');
    this.breadcrumbsEl = this.insRendererEl.querySelector('.ins-breadcrumbs-wrap');
  }

  bindIframeListener() {
    this.insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame') as any;
    if (this.insRendererFrameEl) {
      this.iframeURLChange(this.insRendererFrameEl, e => {
        // if (this.route.app){
        if (navigator.appName == 'Microsoft Internet Explorer') {
          window.frames.document.execCommand('Stop');
        } else {
          window.frames.stop();
        }

        if (e.includes("?reroute=")) {
          this.rerouting = true;
          let queryStrings = e.split("?")[1].split("&");
          queryStrings.forEach(item => {
            if (item.includes("reroute=")) {
              let route = item.substring(8, item.length);
              this.insRendererFrameEl.contentWindow.location.replace(route);
            } else if (item.includes("reroutelabel=")) {
              let reroutelabel = decodeURIComponent(item.substring(13, item.length))
              if (reroutelabel) {
                let header = this.insRendererEl.querySelector('.ins-renderer-wrap__title-span');
                header.innerHTML = reroutelabel;
              }
            }
          });

        } else if (!this.rerouting) {
          this.insRendererFrameEl.contentWindow.location.replace(e);
        } else this.rerouting = false;
        // }
      });
    }
  }

  iframeURLChange(iframe, callback) {
    let lastDispatched = null;

    let dispatchChange = function () {
      let newHref = iframe.contentWindow.location.href;

      if (newHref !== lastDispatched) {
        callback(newHref);
        lastDispatched = newHref;
      }
    };

    let unloadHandler = function () {
      setTimeout(dispatchChange, 0);
    };

    function attachUnload() {
      iframe.contentWindow.removeEventListener("unload", unloadHandler);
      iframe.contentWindow.addEventListener("unload", unloadHandler);
    }

    iframe.addEventListener("load", function () {
      attachUnload();
      dispatchChange();
    });

    attachUnload();
  }

  updateBreadcrumbs(newRoutes, noRedirect){
    this.breadcrumbs = newRoutes;
    let parsedCrumbs = JSON.stringify(newRoutes);
    window.localStorage.setItem('ins_breadcrumbs', parsedCrumbs);

    let lastCrumb = JSON.parse(parsedCrumbs).pop();
    if (!lastCrumb.app && !lastCrumb.withSubmenu){
      if (!noRedirect) {
        document.location.hash = lastCrumb.link;
      }
    }
  }

  routePageHandler(crumb, index){
    let count = this.breadcrumbs.length;
    let lastCrumb = (count - 1) === index;
    if (!crumb.withSubmenu && !lastCrumb){
      this.breadcrumbs.splice((index + 1), count);
      let newRef = JSON.parse(JSON.stringify(this.breadcrumbs));
      this.updateRoute(newRef, false, false);
    }
  }

  renderBreadcrumbs() {
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

    return "";
  }

  render() {
    return (
      <div class={`ins-renderer-wrap content ${this.route.app ? "app" : ""}`}>

        {
          this.disableBreadcrumbs ?
          "" :
          <h1 class="ins-renderer-wrap__title">
            <span class="ins-renderer-wrap__title-span">
              {this.route.label ? this.route.label : ""}
            </span>
          </h1>
        }

        {
          this.disableBreadcrumbs ?
          "" :
          <div class="ins-breadcrumbs-wrap">
            {this.renderBreadcrumbs()}
          </div>
        }

        <div class="ins-renderer__iframe-wrap">
          <iframe id="insRendererFrame"
            width="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0">
          </iframe>
        </div>

        <div class="ins-renderer__slot-wrap">
          <slot />
        </div>
      </div>
    )
  }
}
