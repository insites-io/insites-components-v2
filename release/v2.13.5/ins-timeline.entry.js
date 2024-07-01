import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsTimeline = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.loadingScreen = false;
        this.label = undefined;
        this.staticTimeline = false;
        this.timelineData = [] // sample [{ color: "red", icon: "icon-star", content: "<h1>Hello World</h1> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>", actions: '<ins-button solid size="small" label="Save"></ins-button>', datetime: "New" }, { content: "test", solid: true }, { color: "blue", solid: true, content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." }];
        ;
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insTimeline);
        }
    }
    buildTimelineItem(item) {
        return (h("ins-timeline-item", { title: item.title, datetime: item.datetime, color: item.color, solid: item.solid, icon: item.icon, inline: item.inline }, item.content ? h("div", { slot: "content", innerHTML: item.content }) : '', item.actions ? h("div", { slot: "actions", innerHTML: item.actions }) : ''));
    }
    render() {
        return (h("div", { key: 'ac33f9839f4a363a4ca487d86849b157332b2436', class: "ins-timeline-wrap" }, h("div", { key: '81fd014992bf7d9bc721ceea4881148214a128fc', class: "ins-timeline-main" }, this.label ?
            h("div", { class: "ins-timeline-header" }, h("h3", null, this.label)) : '', h("div", { key: '981dae578f76ec1bfb791ff7b19a25cf000a6b4b', class: `ins-timeline-list ${this.loadingScreen ? 'loading' : ''}` }, this.staticTimeline ? h("slot", null)
            : this.timelineData.map(item => {
                return (this.buildTimelineItem(item));
            })))));
    }
    get insTimeline() { return getElement(this); }
};

export { InsTimeline as ins_timeline };

//# sourceMappingURL=ins-timeline.entry.js.map