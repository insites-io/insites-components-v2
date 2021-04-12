import { h, Watch, Component, Element, Event, EventEmitter, Method, Prop, State } from "@stencil/core";

@Component({ tag: 'ins-filter-item' })
export class InsFilterItem {
    @Element() el: HTMLElement;
    @Event() insSelect: EventEmitter;
    @Event() didLoad: EventEmitter;
    @Prop() hasLoad: string;
    @Prop({ mutable: true }) name: string = 'Category Label';
    @Prop({ mutable: true }) options: any = ["Category 1", "Category 2", "Category 3"];
    @Prop({ mutable: true }) selected: any;

    @State() dropDownState: boolean = false;

    currentFilter: any;
    optionsWrapEl: any;
    _options: any;

    @Watch('options')
    optionsUpdate() {
        this.setOptions();
    }

    @Method()
    async closeFilter() {
      this.dropDownState = false;
    }

    @Method()
    async getSelected() {
      return {
        name: this.name,
        option: this.currentFilter
      }
    }

    toggleDropDown() {
      this.dropDownState = !this.dropDownState;
    }

    addClickOutside(){
      window.addEventListener("click", e => {
        let target = e.target as any;
        let closest = target.closest(".filter-item__button")

        if (closest !== this.optionsWrapEl) {
          this.closeFilter();
        }
      });
    }

    componentWillLoad() {
      this.setOptions();
    }

    componentDidLoad() {
      this.optionsWrapEl = this.el.querySelector('.filter-item__button');
      this.addClickOutside();

      this.didLoad.emit();
      if (this.hasLoad && window["Insites"]){
        let func = window["Insites"].methods[this.hasLoad];
        if (func) func(this.el);
      }
    }

    setOptions() {
        if (typeof this.options === 'string') {

          if (this.isJSON(this.options)) {
            this._options = JSON.parse(this.options);
          }

          if (!Array.isArray(this._options)) {
            this._options = ['All']
          }

        } else this._options = this.options;

        if (this._options) {
          if (this.selected && this._options.includes(this.selected)){
            this.currentFilter = this.selected;

          } else this.currentFilter = this._options[0]
        }
    }

    filterHandler(option) {
        if (this.currentFilter !== option) {
            this.insSelect.emit({
              name: this.name,
              option
            });

            this.currentFilter = option;
            this.closeFilter();
        }
    }

    isJSON(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div class="filter-item">
                <div class="filter-item__button" onClick={() => this.toggleDropDown()}>
                    <span class="filter-item__button--text">{this.name}: </span>
                    <span class="filter-item__button--option">
                        {this.currentFilter}
                        <i class="fas icon-caret-down"></i>
                    </span>
                </div>

                <div class={`filter-item__options ${this.dropDownState ? 'active' : ''}`}>

                    {this._options.map((option) =>
                        <div class={this.currentFilter === option ? 'selected' : ''}
                            data-val={option}
                            onClick={() => this.filterHandler(option)}>
                            {option}
                        </div>
                    )}

                </div>
            </div>
        )
    }
}
