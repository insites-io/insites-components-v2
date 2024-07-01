import { r as registerInstance, h, g as getElement } from './index-5ef45688.js';

const insAccordionItemCss = "ins-accordion ins-accordion-item ins-accordion-item-heading{display:none}ins-accordion .ins-accordion-item .ins-accordion-item-heading h1,ins-accordion .ins-accordion-item .ins-accordion-item-heading h2,ins-accordion .ins-accordion-item .ins-accordion-item-heading h3,ins-accordion .ins-accordion-item .ins-accordion-item-heading h4,ins-accordion .ins-accordion-item .ins-accordion-item-heading h5,ins-accordion .ins-accordion-item .ins-accordion-item-heading h6,ins-accordion .ins-accordion-item .ins-accordion-item-heading p{margin-bottom:0}";

const InsAccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.heading = "Heading";
        this.icon = undefined;
        this.link = undefined;
        this.linkTarget = "_blank";
        this.active = false;
        this.disabled = false;
        this.arrowActivated = false;
        this.openIcon = "icon-angle-down";
        this.closeIcon = "icon-angle-up";
        this.itemHeading = undefined;
        this.hasItemHeading = false;
    }
    componentWillLoad() {
        let itemHeading = this.insAccordionItemEl.querySelectorAll(":scope ins-accordion-item-heading:not(:scope ins-accordion-item ins-accordion-item-heading)");
        if (itemHeading.length) {
            this.itemHeading = itemHeading[0].innerHTML;
            this.hasItemHeading = true;
            // for (let index = 0; index < itemHeading.length; index++) {
            //   let item = itemHeading[index];
            //   item.innerHTML = "";
            // }
        }
    }
    componentDidLoad() {
        this.wrapper = this.insAccordionItemEl.querySelector('.ins-accordion-item');
        this.body = this.insAccordionItemEl.querySelector('.ins-accordion-item_content');
        if (this.hasItemHeading)
            this.renderItemHeading();
        if (this.active)
            this.toggle();
    }
    renderItemHeading() {
        this.insAccordionItemEl.querySelector(':scope .ins-accordion-item-heading').innerHTML = this.itemHeading;
    }
    renderHeading() {
        if (this.hasItemHeading) {
            return h("div", { class: "ins-accordion-item-heading" });
        }
        else {
            if (!this.heading)
                return "";
            return h("span", { class: "heading" }, this.heading);
        }
    }
    renderHeadingLink() {
        if (!this.heading)
            return "";
        return (h("a", { class: "heading", target: this.linkTarget, href: this.link, title: this.heading }, this.heading));
    }
    async udpateScrollHeight(height) {
        let newHeight = this.body.scrollHeight + height;
        this.body.style.maxHeight = newHeight + "px";
        let parent = this.insAccordionItemEl.parentElement.closest('ins-accordion-item');
        if (parent)
            parent.udpateScrollHeight(newHeight);
    }
    async toggle() {
        let height = this.body.scrollHeight;
        if (this.body.style.maxHeight) {
            this.wrapper.classList.remove("open");
            this.wrapper.classList.add("closed");
            this.body.style.maxHeight = null;
        }
        else {
            this.wrapper.classList.remove("closed");
            this.wrapper.classList.add("open");
            this.body.style.maxHeight = height + "px";
        }
        let parent = this.insAccordionItemEl.parentElement.closest('ins-accordion-item');
        if (parent)
            parent.udpateScrollHeight(height || 0);
    }
    render() {
        return (h("div", { key: 'b66e83d3760290a6de9f3aa91b39845d0b7651ab', class: `ins-accordion-item closed
        ${this.arrowActivated ? 'arrow-activated' : ''}` }, h("div", { key: '24c61774e72cdf18b3541e04c0a9962e87f621e7', class: `ins-accordion-item_header ${this.disabled ? 'disabled' : ''}` }, h("div", { key: 'dc816f0403861425ba504cd4b968dd37f574b457', class: "inner-head", onClick: () => this.toggle() }, this.icon && !this.hasItemHeading ? h("span", { class: `icon ${this.icon}` }) : "", this.link && !this.hasItemHeading
            ? this.renderHeadingLink()
            : this.renderHeading(), h("div", { key: '001fb0291948d89793a7256221fe330a4b6feb0b', class: "ins-accordion-item_header_caret-wrap" }, h("span", { key: 'f5492587634326ecbfac6ac4032d2b3644848f25', class: `open-icon ${this.openIcon}` }), h("span", { key: 'e8847c4f5508f56defd70eb96ecba34eac28a2b2', class: `close-icon ${this.closeIcon}` })))), h("div", { key: 'a0ede209f864e322fe7f58e3c84979bc60752fab', class: "ins-accordion-item_content will-show" }, h("div", { key: '6584cd5148dfb6031786318c3dab54ea45be9f5e', class: "inner-content" }, h("slot", { key: '7206c7a50163932eebd83aa33e9b514cf34bd4b8' })))));
    }
    get insAccordionItemEl() { return getElement(this); }
};
InsAccordionItem.style = insAccordionItemCss;

export { InsAccordionItem as ins_accordion_item };

//# sourceMappingURL=ins-accordion-item.entry.js.map