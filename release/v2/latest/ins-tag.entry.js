import { r as registerInstance, h, g as getElement } from './index-5ef45688.js';

const InsTag = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.label = undefined;
        this.color = undefined;
        this.icon = undefined;
        this.light = true;
        this.fontInherit = false;
        this.fontColor = undefined;
        this.backgroundColor = undefined;
    }
    componentDidLoad() {
        this.addColorStyles();
    }
    componentDidUpdate() {
        this.addColorStyles();
    }
    addColorStyles() {
        let insTag = this.InsTagEl.querySelector('.ins-tag');
        if (insTag) {
            if (this.fontColor && this.fontColor[0] === '#') {
                if (insTag) {
                    insTag['style'].color = this.fontColor;
                }
            }
            if (this.backgroundColor && this.backgroundColor[0] === '#') {
                if (insTag) {
                    insTag['style']['background-color'] = this.backgroundColor;
                }
            }
        }
    }
    render() {
        return (h("span", { key: 'c7aa2bb9fd7c23bc73ed749053c38840badf05d4', class: `ins-tag
        ${this.light ? 'light' : ''}
        ${this.color} ${this.fontInherit ? 'font-inherit' : ''}` }, this.icon
            ? h("span", { class: this.icon })
            : '', this.label));
    }
    get InsTagEl() { return getElement(this); }
};

export { InsTag as ins_tag };

//# sourceMappingURL=ins-tag.entry.js.map