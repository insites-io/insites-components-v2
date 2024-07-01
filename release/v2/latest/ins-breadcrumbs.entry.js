import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsBreadCrumbs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.routePage = createEvent(this, "routePage", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.breadcrumbs = [];
        this.hasLoad = undefined;
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insBreadCrumbsEl);
        }
    }
    routePageHandler(crumb, index) {
        let count = this.breadcrumbs.length;
        let lastCrumb = (count - 1) === index;
        if (!crumb.withSubmenu && !lastCrumb) {
            this.breadcrumbs.splice((index + 1), count);
            let newRef = JSON.parse(JSON.stringify(this.breadcrumbs));
            this.routePage.emit({
                crumbs: newRef,
                redirect: true
            });
        }
    }
    async updateCrumbs(crumbs, noRedirect = false) {
        this.breadcrumbs = crumbs;
        let parsedCrumbs = JSON.stringify(crumbs);
        window.localStorage.setItem('ins_breadcrumbs', parsedCrumbs);
        let lastCrumb = JSON.parse(parsedCrumbs).pop();
        if (!lastCrumb.app && !lastCrumb.withSubmenu) {
            if (!noRedirect) {
                document.location.hash = lastCrumb.link;
            }
        }
    }
    render() {
        if (this.breadcrumbs.length > 1) {
            return (h("div", { key: '78d40ac0a9280b98d1cd4864d9b53b7acaf17015', class: "ins-breadcrumbs" }, h("ul", { key: 'bbda4452ff3a4a256e25e4ec104e4d1469571f12' }, this.breadcrumbs.map((crumb, index) => {
                return (h("li", null, h("span", { class: `crumb-label ${crumb.withSubmenu ? '' : 'has-link'}`, onClick: () => this.routePageHandler(crumb, index) }, crumb.label), h("span", { class: "arrow-right" })));
            }))));
        }
    }
    get insBreadCrumbsEl() { return getElement(this); }
};

export { InsBreadCrumbs as ins_breadcrumbs };

//# sourceMappingURL=ins-breadcrumbs.entry.js.map