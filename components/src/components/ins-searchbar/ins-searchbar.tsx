import { h, Component, Prop, Method, Event, EventEmitter } from "@stencil/core";

@Component({ tag: 'ins-searchbar' })
export class InsSearchbar {
  @Event() onSearch: EventEmitter;
  @Prop({mutable: true}) placeholder: string;
  @Prop({mutable: true}) name: string;
  @Prop({mutable: true}) value: string;
  @Prop({mutable: true}) isSearching: boolean = false;

  onSearchHandler(event){
    let x = event.which || event.keyCode;

    this.onSearch.emit({
      name: this.name,
      value: event.target.value,
      keyCode: x
    });
  }

  @Method()
  val(attr, value) {
    let data = {
      name: this.name,
      placeholder: this.placeholder,
      value: this.value,
      isSearching: this.isSearching
    }
    if (attr && typeof attr == "object" && !value) {
      // console.log('this is json');
    } else if (attr && !value) {
      return this[attr];
    } else if (attr && value) {
      this[attr] = value;
    } else {
      return data;
    }
  }

  render(){
    return (
      <div class="ins-searchbar-wrap">
        <div class="ins-sw-in">
          <input type="text"
            placeholder={this.placeholder}
            value={this.value}
            name={this.name}
            onKeyUp={e => this.onSearchHandler(e)}
            class="ins-form-field" />
          { this.isSearching ?
          <div class={`spinner`}></div>
          :
            <i class="icon-search"></i>
          }
        </div>
      </div>
    )
  }
}
