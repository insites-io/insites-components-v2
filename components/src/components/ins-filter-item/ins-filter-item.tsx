import { h, Watch, Component, Element, Event, EventEmitter, Method, Prop, State/*, Watch*/} from "@stencil/core";

declare var $;

@Component({ tag: 'ins-filter-item' })
export class InsFilterItem {
  @Element() el: HTMLElement;
  @Event() onFilter: EventEmitter;


  @Prop({mutable: true}) name: string = 'Category Label';
  @Prop({mutable: true}) options: any = ["Category 1", "Category 2", "Category 3"];
  @Prop({mutable: true}) selected: any;
  @Prop({context: 'addRippleEffect' }) private addRippleEffect: any;

  @State() optionsEl: any;
  @State() insFilter: any;
  @State() dropDownState: boolean;
  @State() currentFilter: any;
  @State() dateFilter: any;


  @Watch('options')
  optionsUpdate() {
    this.setOptions();
  }

  @Method() closeFilter() {
    this.dropDownState = false;
  }

  @Method()
  val(attr, value) {
    let data = {
      name: this.name,
      options: this.options
    };
    if (attr && !value) {
      return this[attr];
    }
    else if (attr && value) {
      this[attr] = value;
    }
    else {
      return data;
    }
  }

  toggleDropDown(point = null) {
    if (document) {
      let target = this.el.querySelector('.filter-item__button') as HTMLElement;

      if (point){
        this.addRippleEffect(point, target);
      }

      this.insFilter = document.getElementsByTagName('ins-filter-item');
      this.dateFilter = document.getElementsByTagName('ins-filter')[0];
      this.dateFilter.closeDateFilter();

      if (this.insFilter.length) {
        // [...this.insFilter].forEach((e) => {
          for (let i = 0; i > this.insFilter.length; i++){
            this.insFilter[i].closeFilter();
          }
        // });
      }

      this.dropDownState = true;
    }
  }

  componentDidLoad() {
    this.closeMenu();
  }

  closeMenu() {
    const $this = this;

    if ((window as any).$) {
      $(window).on("click", function (e) {
        let parent = $(e.target).closest(".filter-item__button").length;

        if (!e.target.matches(".filter-item__button") && !parent) {
          $this.closeFilter();
        }
      });
    }
  }

  @Method()
  getSelected(){
    return this.selected;
  }
  setOptions() {
    if (typeof this.options === 'string') {
      if (this.isJSON(this.options)) {
        this.options = JSON.parse(this.options);
      }

      if (!Array.isArray(this.options)) {
        this.options = ['All']
      }
    }

    if (this.options) {
      this.currentFilter = this.options[0];
      this.selected = {
        name: this.name,
        option: this.currentFilter
      }
    }
  }

  filterHandler(option) {
    if (this.currentFilter !== option){
      this.selected = {
        name: this.name,
        option
      }
      this.onFilter.emit(this.selected);
      this.currentFilter = option;
      this.toggleDropDown();
    }
  }

  // @Watch('options')
  // optionsHandler() {
  //     this.componentWillLoad();
  // }

  componentWillLoad() {
    this.setOptions();
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
        <div class="filter-item__button" onClick={(e) => this.toggleDropDown(e)}>
          <span class="filter-item__button--text">{this.name}: </span>
          <span class="filter-item__button--option">
            {this.currentFilter}
            <i class="fas icon-caret-down"></i>
          </span>
        </div>
        <div class={this.dropDownState ? 'filter-item__options active' : 'filter-item__options'}>
            {this.options.map((option) =>
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
