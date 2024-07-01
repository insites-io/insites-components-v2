import { r as registerInstance, h } from './index-5ef45688.js';

const InsCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.steady = undefined;
        this.noPadding = undefined;
        this.outlined = undefined;
    }
    render() {
        return (h("div", { key: '958ac71d6b829182c3e428d1b69d50e2d5e47e18', class: `ins-card-wrap
        ${this.steady ? 'steady' : ''}
        ${this.outlined ? 'outlined' : ''}
        ${this.noPadding ? 'no-padding' : ''}` }, h("slot", { key: 'b46aeff2da272bed45ddd32a8f00b8f92bc52efe' })));
    }
};

export { InsCard as ins_card };

//# sourceMappingURL=ins-card.entry.js.map