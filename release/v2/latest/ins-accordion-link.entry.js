import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsAccordionLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.link = "";
        this.linkTitle = "";
        this.linkTarget = "_blank";
        this.label = "";
        this.icon = "";
        this.active = false;
        this.disabled = false;
    }
    componentDidLoad() {
        this.checkSiblings();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insAccLinkEl);
        }
    }
    componentDidUpdate() {
        this.checkSiblings();
    }
    checkSiblings() {
        let wrap = this.insAccLinkEl.querySelector('.ins-accordion-link');
        if (this.insAccLinkEl.nextElementSibling) {
            let next = this.insAccLinkEl.nextElementSibling;
            if (next.nodeName === "INS-ACCORDION" && next.hasAttribute('menu')) {
                wrap.classList.add('before');
            }
        }
        if (this.insAccLinkEl.previousElementSibling) {
            let prev = this.insAccLinkEl.previousElementSibling;
            if (prev.nodeName === "INS-ACCORDION" && prev.hasAttribute('menu')) {
                wrap.classList.add('after');
            }
        }
    }
    async toggle() {
        this.active = !this.active;
    }
    render() {
        return (h("div", { key: '545ce01cb315be52ac6b5c9526a53d7422cfd6c6', class: `ins-accordion-link
        ${this.active ? 'active' : ''}
        ${this.disabled ? 'disabled' : ''}` }, h("a", { key: '15797f4db9d5b513e050166bce6b09daed86ca2d', class: "ins-accordion-link_link", href: this.link, target: this.linkTarget, title: this.linkTitle }, this.icon
            ? h("span", { class: `ins-accordion-link_icon ${this.icon}` })
            : "", h("span", { key: '1e020288bf0774a2f6cbf7d29cf9d70a42d57ef3' }, this.label))));
    }
    get insAccLinkEl() { return getElement(this); }
};

export { InsAccordionLink as ins_accordion_link };

//# sourceMappingURL=ins-accordion-link.entry.js.map