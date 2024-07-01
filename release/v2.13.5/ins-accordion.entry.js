import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insToggle = createEvent(this, "insToggle", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.menu = false;
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insAccordionEl);
        }
    }
    render() {
        return (h("div", { key: '67e45efed0d3b77d159392514e9dfb95a22b1b55', class: `ins-accordion ${this.menu ? 'menu' : ''}` }, h("slot", { key: '7d678270930396f9446c36d449b62e0592a38f0c' })));
    }
    get insAccordionEl() { return getElement(this); }
};

export { InsAccordion as ins_accordion };

//# sourceMappingURL=ins-accordion.entry.js.map