import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsKanbanCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClick = createEvent(this, "insClick", 7);
        this.cardId = "";
    }
    insClickHandler() {
        const itemOrder = Array.from(this.insKanbanCardEl.parentNode.children).indexOf(this.insKanbanCardEl) + 1;
        this.insClick.emit({
            cardId: this.cardId,
            currentOrder: itemOrder
        });
    }
    render() {
        return (h("div", { key: 'c16d2207b7bc40a676fceb0b249591a6f34be838', class: `ins-kanban-card card-item-wrap`, onClick: () => this.insClickHandler() }, h("slot", { key: 'c4ef42a8b11ac70d659119e08aaba7674d5f0c7b' })));
    }
    get insKanbanCardEl() { return getElement(this); }
};

export { InsKanbanCard as ins_kanban_card };

//# sourceMappingURL=ins-kanban-card.entry.js.map