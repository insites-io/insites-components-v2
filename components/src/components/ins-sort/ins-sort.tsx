import { h, Component, Event, EventEmitter, Prop, Method } from '@stencil/core';
import Sortable from 'sortablejs';
import { SortableGroup, ISortableGroup } from "./ins-sort.model";

@Component({ tag: 'ins-sort' })

export class InsSort {

  private body: HTMLDivElement

  @Prop() ignoreElements: string = null
  @Prop() disabled: boolean = false
  @Prop() insDraggable: boolean = true;
  @Prop() droppable: boolean = true;
  @Prop() cloneOnDrag: boolean = false;
  @Prop() sortGroup: string = "insites-sort-group"
  @Prop() wrapperClass: string = "insites-sortable"
  @Prop() sort: boolean = true

  insitesSortable
  group: ISortableGroup = new SortableGroup();

  @Event() insDragStart: EventEmitter<Object>;
  onDraggingStart(event) {
    this.insDragStart.emit(event);
  }

  @Event() insDragEnd: EventEmitter<Object>;
  onDraggingEnd(event) {
    this.insDragEnd.emit(event);
  }

  @Event() insChoose: EventEmitter<Object>;
  onChooseElement(event) {
    this.insChoose.emit(event);
  }

  @Event() insUpdate: EventEmitter<Object>;
  onUpdating(event) {
    this.insUpdate.emit(event);
  }

  @Event() insMove: EventEmitter<Object>;
  onMoving(event) {
    this.insMove.emit(event);
  }

  @Event() insAdd: EventEmitter<Object>;
  onAdding(event) {
    this.insAdd.emit(event);
  }

  @Event() insRemove: EventEmitter<Object>;
  onRemoving(event) {
    this.insRemove.emit(event);
  }

  @Event() insClone: EventEmitter<Object>;
  onCloning(event) {
    this.insClone.emit(event);
  }

  @Event() insPositionChanged: EventEmitter<Object>;
  onPositionChanging(event) {
    this.insPositionChanged.emit(event);
  }

  @Method()
  async getSortOrder(){
    let instance = Sortable.get(this.body),
        order = instance.toArray(),
        result = {}
    order.forEach((value, key) => {
      result[key] = value
    });

    return result
  }

  @Method()
  async arrange(sortable){
    this.load(sortable);
  }

  load(sortable: any[] = []) {
    let order = []
    if (typeof sortable === 'string' || sortable instanceof String)
      order = sortable ? sortable.split('|') : []
    else if (sortable && typeof sortable === 'object' && sortable.constructor === Array)
      order = sortable

    let instance = Sortable.get(this.body)
    instance.sort(order)
    return order
  }

  // @Method()
  // get(){
  //   return Sortable.get(this.body)
  // }

  @Event() insDrop: EventEmitter<Object>;
  private initSortable() {
    let
      el: HTMLDivElement = this.body,
      id: string = `insites-sortable-${Math.random().toString(36).slice(2)}`,
      _this = this,
      config: any = {
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
          get: (e: any[] = []) => _this.load(e),

          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           * @returns {Object}
           */
          set: (e) => {
            let order = e ? e.toArray() : [];

            _this.insDrop.emit({ e, order })
            return order
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
      }

    el.id = id;
    this.insitesSortable = new Sortable(el, config);

  }

  private loadSortGroupConfig() {

    let
      pull: boolean | string = this.insDraggable,
      put: boolean = this.droppable;

    if (this.cloneOnDrag && this.insDraggable)
      pull = "clone"

    this.group = new SortableGroup(this.sortGroup, pull, put)
  }

  componentDidLoad() {
    this.loadSortGroupConfig()
    this.initSortable()
  }

  render() {
    return (
      <div>
        <div class={`${this.wrapperClass}`} ref={(el) => this.body = el as HTMLDivElement}>
          <slot />
        </div>
      </div>
    );
  }
}
