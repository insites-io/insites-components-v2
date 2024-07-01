import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insToggle = createEvent(this, "insToggle", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.isOpen = false;
        this.position = "";
        this.showHeader = true;
        this.stickyHeader = true;
        this.bordered = true;
        this.noPadding = false;
        this.label = undefined;
        this.icon = undefined;
        this.showCloseButton = true;
        this.backdropCanClose = true;
        this.customWidth = undefined;
    }
    watchStatusHandler() {
        if (this.customWidth) {
            this.isOpen ? this.setStyleWidth() : this.hideDrawerInlineCSS();
        }
        if (this.stickyHeader) {
            // Do not remove
            this.rebindHeaderCSS();
        }
        this.setBodyCSS();
        this.toggleDrawerEmitter();
    }
    watchCustomWidthHandler() {
        if (this.customWidth)
            this.insDrawer.querySelector('.ins-content')['style'].width = this.customWidth;
    }
    backDropClickHandler() {
        let backdropEl = this.insDrawer.querySelector('.ins-backdrop-wrap');
        if (this.backdropCanClose) {
            backdropEl.addEventListener('click', () => {
                this.setDrawerState(false);
            });
        }
        else {
            backdropEl.removeEventListener('click', () => { });
        }
    }
    rebindHeaderCSS() {
        let element = this.insDrawer.querySelector('.ins-drawer-header');
        if (element)
            element['style'].width = "inherit";
    }
    setBodyCSS() {
        if (this.isOpen) {
            document.querySelector('body').style.overflow = "hidden";
            parent.document.querySelector('body').style.overflow = "hidden";
        }
        else {
            document.querySelector('body').style.overflow = "initial";
            parent.document.querySelector('body').style.overflow = "initial";
        }
    }
    setStyleWidth() {
        let insDrawerEl = this.insDrawer.querySelector('.ins-content');
        if (this.customWidth && insDrawerEl && this.isOpen) {
            insDrawerEl['style'].width = this.customWidth;
            if (this.position === 'left') {
                insDrawerEl['style'].right = 'initial';
                insDrawerEl['style'].left = !this.isOpen ? '-' + this.customWidth : 0;
            }
            else {
                insDrawerEl['style'].left = 'initial';
                insDrawerEl['style'].right = !this.isOpen ? '-' + this.customWidth : 0;
            }
        }
    }
    hideDrawerInlineCSS() {
        let insDrawerEl = this.insDrawer.querySelector('.ins-content');
        if (this.position === 'left') {
            insDrawerEl['style'].right = 'initial';
            insDrawerEl['style'].left = '-' + this.customWidth;
        }
        else {
            insDrawerEl['style'].left = 'initial';
            insDrawerEl['style'].right = '-' + this.customWidth;
        }
    }
    componentDidLoad() {
        this.backdropCanClose ? this.backDropClickHandler() : '';
        this.customWidth ? this.setStyleWidth() : '';
        this.setBodyCSS();
        this.rebindHeaderCSS();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insDrawer);
        }
    }
    componentDidUpdate() {
        this.backdropCanClose ? this.backDropClickHandler() : '';
    }
    toggleDrawerEmitter() {
        this.insToggle.emit({
            status: this.isOpen ? "open" : "close",
            label: this.label
        });
    }
    async setDrawerState(status) {
        this.isOpen = status;
    }
    render() {
        return (h("div", { key: '5134e91a518f54ad757ff27a1c16cdcd7c5c3276', class: `ins-drawer-wrap ${this.isOpen ? 'opened' : ''}` }, h("ins-backdrop", { key: 'd8ca90c9a1beb67a3b02272c575521951ee359ed', onClick: () => this.backDropClickHandler() }), h("div", { key: 'cb90df3f2fb11a3b341e46417017d304589b204c', class: `ins-content ${this.position ? this.position : ''} ${this.customWidth ? 'custom-width' : ''}` }, this.showHeader ?
            h("div", { class: `ins-drawer-header ${this.bordered ? 'bordered' : ''} ${this.stickyHeader ? 'sticky' : ''}` }, this.label || this.icon ?
                h("h4", null, this.icon ? h("span", { class: this.icon }) : '', this.label) : '', this.showCloseButton ?
                h("button", { class: "ins-drawer-close-btn", onClick: () => this.setDrawerState(false) }, h("i", { class: "icon-close-1" })) : '') : '', h("div", { key: 'd399c36d3b6c8afbdf48318bcd266c41d2aaa4ea', class: `ins-drawer-body ${this.noPadding ? 'no-padding' : ''}` }, h("slot", { key: '70bec4b92bcd843902b927926661686d0bb1683f' })))));
    }
    get insDrawer() { return getElement(this); }
    static get watchers() { return {
        "isOpen": ["watchStatusHandler"],
        "customWidth": ["watchCustomWidthHandler"],
        "backdropCanClose": ["backDropClickHandler"]
    }; }
};

export { InsDrawer as ins_drawer };

//# sourceMappingURL=ins-drawer.entry.js.map