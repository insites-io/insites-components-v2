import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';
import { S as Sortable } from './sortable.esm-73b6b4ad.js';

class SortableGroup {
    constructor(name = "insites-sort-group", pull = true, put = true) {
        this.name = name;
        this.pull = pull;
        this.put = put;
    }
}

const InsSort = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.insDragStart = createEvent(this, "insDragStart", 7);
        this.insDragEnd = createEvent(this, "insDragEnd", 7);
        this.insChoose = createEvent(this, "insChoose", 7);
        this.insUpdate = createEvent(this, "insUpdate", 7);
        this.insMove = createEvent(this, "insMove", 7);
        this.insAdd = createEvent(this, "insAdd", 7);
        this.insRemove = createEvent(this, "insRemove", 7);
        this.insClone = createEvent(this, "insClone", 7);
        this.insPositionChanged = createEvent(this, "insPositionChanged", 7);
        this.insDrop = createEvent(this, "insDrop", 7);
        this.group = new SortableGroup();
        this.hasLoad = undefined;
        this.ignoreElements = null;
        this.disabled = false;
        this.insDraggable = true;
        this.droppable = true;
        this.cloneOnDrag = false;
        this.sortGroup = "insites-sort-group";
        this.wrapperClass = "insites-sortable";
        this.sort = true;
    }
    onDraggingStart(event) {
        this.insDragStart.emit(event);
    }
    onDraggingEnd(event) {
        this.insDragEnd.emit(event);
    }
    onChooseElement(event) {
        this.insChoose.emit(event);
    }
    onUpdating(event) {
        this.insUpdate.emit(event);
    }
    onMoving(event) {
        this.insMove.emit(event);
    }
    onAdding(event) {
        this.insAdd.emit(event);
    }
    onRemoving(event) {
        this.insRemove.emit(event);
    }
    onCloning(event) {
        this.insClone.emit(event);
    }
    onPositionChanging(event) {
        this.insPositionChanged.emit(event);
    }
    async getSortOrder() {
        let instance = Sortable.get(this.body), order = instance.toArray(), result = {};
        order.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }
    async arrange(sortable) {
        this.load(sortable);
    }
    load(sortable = []) {
        let order = [];
        if (typeof sortable === 'string' || sortable instanceof String)
            order = sortable ? sortable.split('|') : [];
        else if (sortable && typeof sortable === 'object' && sortable.constructor === Array)
            order = sortable;
        let instance = Sortable.get(this.body);
        instance.sort(order);
        return order;
    }
    initSortable() {
        let el = this.body, id = `insites-sortable-${Math.random().toString(36).slice(2)}`, _this = this, config = {
            /**
             * Sortable Options
             */
            animation: 100,
            group: this.group,
            filter: this.ignoreElements,
            sort: this.sort,
            disabled: this.disabled,
            dataIdAttr: "data-sortable-id",
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
            onEnd: this.onDraggingEnd.bind(this),
            onStart: this.onDraggingStart.bind(this),
            onChoose: this.onChooseElement.bind(this),
            onAdd: this.onAdding.bind(this),
            onUpdate: this.onUpdating.bind(this),
            onMove: this.onMoving.bind(this),
            onRemove: this.onRemoving.bind(this),
            onClone: this.onCloning.bind(this),
            onChange: this.onPositionChanging.bind(this)
        };
        el.id = id;
        this.insitesSortable = new Sortable(el, config);
    }
    loadSortGroupConfig() {
        let pull = this.insDraggable, put = this.droppable;
        if (this.cloneOnDrag && this.insDraggable)
            pull = "clone";
        this.group = new SortableGroup(this.sortGroup, pull, put);
    }
    componentDidLoad() {
        this.loadSortGroupConfig();
        this.initSortable();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insSortEl);
        }
    }
    render() {
        return (h("div", { key: '41931907b8f8d6288ed769cab4c0917b4e6d1bd6' }, h("div", { key: 'a21adedb5307dffaf13f171299e9b12ee219daf6', class: `${this.wrapperClass}`, ref: (el) => this.body = el }, h("slot", { key: 'c2a55e0066cf2431908e6f8b078d2e80c1dc31ff' }))));
    }
    get insSortEl() { return getElement(this); }
};

export { InsSort as ins_sort };

//# sourceMappingURL=ins-sort.entry.js.map