import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsInstances = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.logoLink = "";
        this.instance = "";
        this.instanceLink = "";
        this.newTab = false;
        this.dropDownState = undefined;
        this.hasItems = undefined;
        this.activeSubItem = undefined;
    }
    activeSubItemHandler() {
        this.activeSubItem = false;
    }
    routeInstanceHandler(event) {
        this.instance = event.detail.instance;
        this.logoLink = event.detail.logoLink;
        this.activeSubItem = event.detail.withSubItem;
    }
    componentWillLoad() {
        if (this.el.querySelectorAll('ins-instances-item').length > 0) {
            this.hasItems = true;
        }
    }
    componentDidLoad() {
        if (window.$) {
            $('#instancesLogo').on('error', function () {
                $(this).attr('src', 'https://lh4.googleusercontent.com/-k147BY0tZM8/AAAAAAAAAAI/AAAAAAAAARY/NL7bNLj_cV8/photo.jpg?sz=32');
            });
        }
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.el);
        }
    }
    toggleDropDown() {
        this.dropDownState = !this.dropDownState;
    }
    relocate(link) {
        link = (link) ? link : '/';
        if (this.newTab) {
            window.open(link, '_blank');
            return;
        }
        window.location.assign(link);
    }
    render() {
        return (h("div", { key: 'b29e61fb808922fd01b2d67a71111d5026aa5b15', class: `ins-instances-wrap ${this.activeSubItem ? 'sub-item-active' : ''}` }, h("div", { key: 'f982d076238ec65203b19691a1e6b21f20225e7f', class: `active-instance ${this.hasItems ? 'has-items' : ''}` }, h("img", { key: 'f03712a119b5c7ddbc240e4ea0ddf18d7263dda6', src: this.logoLink ? this.logoLink : '' }), h("button", { key: '26308408ddac456fe4bf070c4febf4824f4e5428' }, h("span", { key: 'f3a1fdb2064ad13677c1f75c8113824399b81fb4', class: "active-instance-label" }, this.instance ? this.instance : 'Label')), h("div", { key: 'b51a3d01b10fa0cf3678b56b533972ef7ac6d6b6', class: "icons-wrap" }, h("i", { key: '8fc770999fe8cee0a30ed5c4b1118b2b3aedb80d', class: "icon-keyboard-arrow-up" }), h("i", { key: '65a464588045e7732ec1b12fa54ca835508a14f9', class: "icon-keyboard-arrow-up down" }))), this.hasItems ?
            h("div", { class: "ins-instances-options" }, h("ins-card", { steady: true }, h("ins-input", { placeholder: "Search", icon: "icon-search" }), h("div", { class: "scroll-wrap" }, h("slot", null))))
            : ''));
    }
    get el() { return getElement(this); }
};

export { InsInstances as ins_instances };

//# sourceMappingURL=ins-instances.entry.js.map