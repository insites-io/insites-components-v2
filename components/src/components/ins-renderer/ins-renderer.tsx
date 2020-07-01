import { h, Component, Prop, State, Method, Element } from "@stencil/core";
import { createBrowserHistory } from 'history'
import { find } from 'lodash';

const history = createBrowserHistory();

@Component({ tag: 'ins-renderer' })
export class InsRenderer {
  @Element() insRendererEl: HTMLElement;
  @State() insBreadCrumbsEl: any;
  @Prop({ mutable: true }) link: string;
  @Prop({ mutable: true }) app: boolean = false;
  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) route: any = {
    label: "", link: ""
  };
  @Prop({ context: 'formatUrl' }) private formatUrl: any;
  @State() pathname: string = window.location.pathname;

  rerouting: boolean = false;

  @Method()
  async updateRoute(newRoutes, noRedirect = false, iframe) {
    if (newRoutes && newRoutes.length) {
      let last = newRoutes.length - 1;
      this.route = newRoutes[last];
      let loop = true;

      do {
        this.insBreadCrumbsEl = this.insRendererEl.querySelector('ins-breadcrumbs');
        if (this.insBreadCrumbsEl) {
          this.insBreadCrumbsEl.updateCrumbs(newRoutes, noRedirect);
          loop = false;
        }
      } while (loop);

      this.label = this.route.label;

      if (this.route.app) {
        setTimeout(() => {
          let insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame') as any;
          if (!noRedirect || iframe) {
            insRendererFrameEl.contentWindow.location.replace(this.route.link);
          }
        }, 100)
      }
    }
  }

  @Method()
  async pushHistory(title, childPage = false) {
    let formattedUrl = this.formatUrl(title);

    if (childPage == true) {
      let currentHash = window.location.hash;

      formattedUrl = this.pathname + currentHash + '/' + formattedUrl;

      let childPages = JSON.parse(localStorage.getItem('insChildPages')) ?
        JSON.parse(localStorage.getItem('insChildPages')) :
        [];

      if (!find(childPages, { hash: formattedUrl })) {
        let insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame') as any;
        setTimeout(() => {
          childPages.push({
            parentHash: this.pathname + currentHash,
            hash: formattedUrl,
            childLink: insRendererFrameEl.contentDocument.location.pathname,
            pageTitle: title
          });

          localStorage.setItem('insChildPages', JSON.stringify(childPages));
        }, 500);
      }
    } else {
      formattedUrl = this.pathname + '#/app/' + formattedUrl;
    }
    /* Dev QA this
    {
      pathname: formattedUrl,
      state: {
        pageTitle: title,
        url: formattedUrl
      }
    }
    */
    history.push({ pathname: formattedUrl })
  }

  componentWillLoad() {
    // history.listen((location, action) => {
    //     // location is an object like window.location
    // });

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
    setTimeout(() => {
      let insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame') as any;
      insRendererFrameEl.style.height = insRendererFrameEl.contentWindow.document.body.scrollHeight + 'px';
      insRendererFrameEl.style.opacity = '1';
    }, 500);
  }

  @Method()
  async updateRouteLabel(value) {
    this.route.label = value;
    this.label = value;
  }

  componentDidLoad() {
    this.bindIframeListener();
  }

  bindIframeListener() {
    let insRendererFrameEl = this.insRendererEl.querySelector('#insRendererFrame') as any;
    if (insRendererFrameEl) {
      this.iframeURLChange(insRendererFrameEl, e => {
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
              insRendererFrameEl.contentWindow.location.replace(route);
            } else if (item.includes("reroutelabel=")) {
              let reroutelabel = decodeURIComponent(item.substring(13, item.length))
              if (reroutelabel) {
                let header = this.insRendererEl.querySelector('.ins-renderer-wrap__title-span');
                header.innerHTML = reroutelabel;
              }
            }
          });

        } else if (!this.rerouting) {
          insRendererFrameEl.contentWindow.location.replace(e);
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

  render() {
    return (
      <div class={`ins-renderer-wrap ${this.route.app ? "app" : ""}`}>
        <h1 class="ins-renderer-wrap__title">
          <span class="ins-renderer-wrap__title-span">{this.route.label ? this.route.label : ""}</span>
          <ins-breadcrumbs />
        </h1>

        <div class="ins-renderer__iframe-wrap">
          <iframe id="insRendererFrame"
            width="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0">
          </iframe>
          {this.route.app ?
            <div class="hide-slot">
              <slot />
            </div>
            : ""}
        </div>

        {this.route.app ? "" :
          <div class="ins-renderer__slot-wrap">
            <slot />
          </div>
        }
      </div>
    )
  }
}
