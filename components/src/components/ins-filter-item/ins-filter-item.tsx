import { h, Watch, Component, Element, Event, EventEmitter, Method, Prop, State } from "@stencil/core";

@Component({ tag: 'ins-filter-item' })
export class InsFilterItem {
    @Element() el: HTMLElement;
    @Event() insSelect: EventEmitter;

    @Prop({ mutable: true }) name: string = 'Category Label';
    @Prop({ mutable: true }) options: any = ["Category 1", "Category 2", "Category 3"];
    @Prop({ mutable: true }) selected: any;

    @State() dropDownState: boolean = false;

    @State() optionsEl: any;
    @State() insFilter: any;
    @State() currentFilter: any;
    @State() dateFilter: any;


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
        return this.selected;
    }

    toggleDropDown() {
        this.insFilter = document.getElementsByTagName('ins-filter-item');
        this.dateFilter = document.getElementsByTagName('ins-filter')[0];

        if (this.dateFilter){
            this.dateFilter.closeDateFilter();
        }

        if (this.insFilter.length) {
            for (let i = 0; i > this.insFilter.length; i++) {
                this.insFilter[i].closeFilter();
            }
        }

        this.dropDownState = true;
    }

    componentWillLoad() {
        this.setOptions();
    }

    componentDidLoad() {
        window.addEventListener("click", e => {
            let target = e.target as any;
            let parent = target.closest(".filter-item__button")

            if (!parent) {
                this.closeFilter();
            }
        });
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
        if (this.currentFilter !== option) {
            this.selected = {
                name: this.name,
                option
            }
            this.insSelect.emit(this.selected);
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
