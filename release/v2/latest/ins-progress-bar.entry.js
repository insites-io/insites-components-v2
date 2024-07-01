import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsProgressBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.text = "";
        this.progress = 0;
        this.total = 1;
        this.hidden = false;
    }
    componentDidLoad() {
        this.progressEl = this.el.querySelector('.progress');
        this.calculateProgress();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.el);
        }
    }
    componentDidUpdate() {
        this.calculateProgress();
    }
    calculateProgress() {
        let totalWidth = (this.progress / this.total) * 100;
        this.progressEl.style.width = `${totalWidth}%`;
    }
    render() {
        return (h("div", { key: '2e4c5a3d5a5f0ba2633cf471bf8d16261acbc72a', class: `ins-progress-bar ${this.hidden ? "hidden" : ""}` }, h("div", { key: '02fd8bcc9cd16e8ea75bbb6dec2369f9eae3734a', class: "text" }, this.text), h("div", { key: '98800f10b4d5c2f7cf44f80b116c3ea023ace898', class: "progress" })));
    }
    get el() { return getElement(this); }
};

export { InsProgressBar as ins_progress_bar };

//# sourceMappingURL=ins-progress-bar.entry.js.map