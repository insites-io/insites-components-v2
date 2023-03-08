import { h, Component, Element, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: 'ins-kanban-board',
  styleUrl: "./ins-kanban-board.sass"
})

export class InsKanbanBoard {
  @Element() insKanbanBoardEl: HTMLElement;
  @Event() didLoad: EventEmitter;
  @Prop({ mutable: true }) uniqueId: string;
  @Prop({ mutable: true }) boardGroup: string;

  componentWillLoad() {
    this.uniqueId = (Math.random() + 1).toString(36).substring(7);
  }

  componentDidLoad(){
    this.didLoad.emit();
  }

  render() {
    return (
      <div class={`ins-kanban-board-wrap`} id={this.uniqueId}>
        <slot />
      </div>
    );
  }
}
