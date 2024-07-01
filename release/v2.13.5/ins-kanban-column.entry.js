import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';
import { S as Sortable } from './sortable.esm-73b6b4ad.js';

const InsKanbanColumn = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insColumnAdd = createEvent(this, "insColumnAdd", 7);
        this.insDragStart = createEvent(this, "insDragStart", 7);
        this.insDragEnd = createEvent(this, "insDragEnd", 7);
        this.insAdd = createEvent(this, "insAdd", 7);
        this.insSort = createEvent(this, "insSort", 7);
        this.insChoose = createEvent(this, "insChoose", 7);
        this.insUpdate = createEvent(this, "insUpdate", 7);
        this.insMove = createEvent(this, "insMove", 7);
        this.insRemove = createEvent(this, "insRemove", 7);
        this.insPositionChanged = createEvent(this, "insPositionChanged", 7);
        this.insDrop = createEvent(this, "insDrop", 7);
        this.sortableItems = undefined;
        this.heading = "Heading";
        this.headingColor = '#fff';
        this.headingTextColor = '';
        this.totalCount = '';
        this.headingSubDetail = '';
        this.noItems = false;
        this.noItemsHeading = 'No Items';
        this.noItemsDetail = '';
        this.addItemButton = false;
        this.addItemButtonLabel = 'Add Item';
        this.disableSort = false;
        this.disableDrop = false;
    }
    onDraggingStart(event) {
        this.insDragStart.emit({
            item: event.item, // dragged HTMLElement
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
        });
        event.item.classList.add('moving');
    }
    onDraggingEnd(event) {
        this.insDragEnd.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
        event.item.classList.remove('moving');
    }
    onAdding(event) {
        this.insAdd.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
    }
    onSorting(event) {
        this.insSort.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
    }
    onChooseElement(event) {
        this.insChoose.emit({
            item: event.item, // dragged HTMLElement
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
        });
    }
    onUpdating(event) {
        this.insUpdate.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
    }
    onMoving(event) {
        this.insMove.emit({
            item: event.dragged, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            relatedItem: event.related, // HTMLElement on which have guided
            insertedAfter: event.willInsertAfter, // HTMLElement on which have guided
        });
    }
    onRemoving(event) {
        this.insRemove.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
    }
    onPositionChanging(event) {
        this.insPositionChanged.emit({
            item: event.item, // dragged HTMLElement
            to: event.to, // target list
            from: event.from, // previous list
            oldIndex: event.oldIndex, // element's old index within old parent
            newIndex: event.newIndex, // element's new index within new parent
            oldDraggableIndex: event.oldDraggableIndex, // element's old index within old parent, only counting draggable elements
            newDraggableIndex: event.newDraggableIndex, // element's new index within new parent, only counting draggable elements
        });
    }
    componentDidLoad() {
        this.initSortable();
    }
    insKanbanColumnAddButtonClickHandler() {
        this.insColumnAdd.emit({
            heading: this.heading,
            el: this.insKanbanColumnEl
        });
    }
    initSortable() {
        const boardGroup = this.kanbanItemsWrap.closest("ins-kanban-board").hasAttribute("board-group") ? this.kanbanItemsWrap.closest("ins-kanban-board").getAttribute("board-group") : "";
        const wrapperID = this.kanbanItemsWrap.closest(".ins-kanban-board-wrap").id;
        let el = this.kanbanItemsWrap, id = `ins-kanban-cards-wrap-${Math.random().toString(36).slice(2)}`, _this = this, config = {
            /**
             * Sortable Options
             */
            animation: 100,
            group: boardGroup ? boardGroup : wrapperID,
            sort: !this.disableSort,
            easing: "cubic-bezier(1, 0, 0, 1)",
            disabled: false,
            forceFallback: true,
            dataIdAttr: "card-sortable-id",
            draggable: "ins-kanban-card",
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: (e = []) => _this.load(e),
                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 * @returns {Object}
                 */
                set: (e) => {
                    let order = e ? e.toArray() : [];
                    _this.insDrop.emit({ e, order });
                    return order;
                }
            },
            /**
             * Sortable Events Declaration
             */
            onStart: this.onDraggingStart.bind(this),
            onEnd: this.onDraggingEnd.bind(this),
            onAdd: this.onAdding.bind(this),
            onSort: this.onSorting.bind(this),
            onChoose: this.onChooseElement.bind(this),
            onUpdate: this.onUpdating.bind(this),
            onMove: this.onMoving.bind(this),
            onRemove: this.onRemoving.bind(this),
            onChange: this.onPositionChanging.bind(this)
        };
        el.id = id;
        this.insitesKanbanColumnSortable = new Sortable(el, config);
    }
    load(sortable = []) {
        let order = [];
        if (typeof sortable === 'string' || sortable instanceof String)
            order = sortable ? sortable.split('|') : [];
        else if (sortable && typeof sortable === 'object' && sortable.constructor === Array)
            order = sortable;
        let instance = Sortable.get(this.kanbanItemsWrap);
        instance.sort(order);
        return order;
    }
    async getColumnCardsOrder() {
        let instance = Sortable.get(this.kanbanItemsWrap), order = instance.toArray(), result = {};
        order.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }
    async reorderCards(sortable) {
        this.load(sortable);
    }
    render() {
        return (h("div", { key: '4c2c69781ff48a19e585b437ac1954eb314b43e9', class: `ins-kanban-column-wrap` }, h("div", { key: '102117c855bbaa96012ce7a8867b8b8cc8a82f41', class: `ins-kanban-column-header ${!this.heading ? 'no-heading' : ''}`, style: { 'background-color': this.headingColor, 'color': this.headingTextColor } }, h("span", { key: 'a590eb360f96a684f8af9eb33a3a47f124f81980', class: "heading" }, this.heading), h("div", { key: 'c1edfd184ee9f6d763bebc6fac1a434b2f0b908c', class: `header-details ${this.totalCount != '' || this.headingSubDetail != '' ? '' : 'hide'}` }, this.totalCount != '' ?
            h("span", { class: "total-column-count" }, "(", this.totalCount, ")")
            : '', this.headingSubDetail != '' ?
            h("span", { class: "heading-sub-detail" }, this.headingSubDetail)
            : '')), h("div", { key: '563fad6ef69cab49b4e8a8ed2491bfc528d9db9a', class: "ins-kanban-cards-wrap", ref: (el) => this.kanbanItemsWrap = el }, this.noItems ?
            h("div", { class: "card-item-wrap no-items-wrap" }, h("span", { class: "no-items-heading" }, this.noItemsHeading), this.noItemsDetail != '' ?
                h("span", { class: "no-items-details" }, this.noItemsDetail)
                : '')
            : h("slot", null)), this.addItemButton ?
            h("div", { class: "ins-kanban-column-button", onClick: () => this.insKanbanColumnAddButtonClickHandler() }, h("i", { class: "icon-plus" }), h("span", null, this.addItemButtonLabel))
            : ''));
    }
    get insKanbanColumnEl() { return getElement(this); }
};

export { InsKanbanColumn as ins_kanban_column };

//# sourceMappingURL=ins-kanban-column.entry.js.map