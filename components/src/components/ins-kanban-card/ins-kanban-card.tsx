import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: 'ins-kanban-card'
})

export class InsKanbanCard {
  @Element() insKanbanCardEl: HTMLElement;
  @Prop({ mutable: true }) cardId: string = "";
  @Event() insClick: EventEmitter;

  insClickHandler(){
    const itemOrder = Array.from(this.insKanbanCardEl.parentNode.children).indexOf(this.insKanbanCardEl) + 1;
    this.insClick.emit({
      cardId: this.cardId,
      currentOrder: itemOrder
    });
  }

  render() {
    return (
      <div class={`ins-kanban-card card-item-wrap`}
        onClick={() => this.insClickHandler()}>
        <slot />
      </div>
    );
  }
}
