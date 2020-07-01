import { h, Component, Element, Event, Method, EventEmitter, Prop, State, Listen } from "@stencil/core";

@Component({ tag: 'ins-tab' })

export class InsTab {
  @Element() insTabEl: HTMLElement;
  @Event() onchangeTab: EventEmitter;

  @Prop({ mutable: true }) tabs: any = [];

  @State() activeTab: string = "";
  @State() activeTabIndex: number = 0;
  @State() insTabItems: any = [];
  @State() insTabHeaders: any = [];

  onchangeTabHandler(event, index) {
    if (
      !this.insTabItems[index].disabled &&
      !this.insTabItems[index].active
    ) {
      this.setActiveTab(index);
      this.setActiveTabItem(index);
      this.onchangeTab.emit({
        event: event,
        index: index,
        label: this.insTabHeaders[index].innerText.trim()
      });
    }
  }

  getTabItemsEl() {
    return this.insTabEl.querySelectorAll(":scope ins-tab-item");
  }

  getTabHeadersEl() {
    return this.insTabEl.querySelectorAll(":scope > .ins-tab > .ins-tab-headers > .ins-tab-header");
  }

  getDefaulTabLabel(index) {
    return `Tab ${index + 1}`;
  }

  getTabHeaders() {
    let tabHeaders = this.getTabHeadersEl();
    let headers = [];

    for (let i = 0; i < tabHeaders.length; i++) {
      let item = tabHeaders[i] as any;
      headers.push(item);
    }

    return headers;
  }

  getTabItems() {
    let tabItems = this.getTabItemsEl();
    let options = [];

    for (let i = 0; i < tabItems.length; i++) {
      if (tabItems[i].closest('ins-tab') === this.insTabEl){
        let item = tabItems[i] as any;
        options.push(item);
      }
    }

    return options;
  }

  getActiveTabLabelIndex() {
    for (let i = 0; i < this.insTabItems.length; i++) {
      let item = this.insTabItems[i] as any;

      if (item.active) {
        this.activeTab = item.label ?
          item.label.value :
          this.getDefaulTabLabel(i);
        this.activeTabIndex = i;
        break;
      }
    }
  }

  setActiveTab(index) {
    this.insTabHeaders.forEach(item => {
      item.classList.remove('active');
    });
    let el = this.insTabHeaders[index];
    if (el) el.classList.add('active');
  }

  setDisabledTabs() {
    let indexes = [];
    this.insTabItems.forEach((item, index) => {
      if (item.attributes.disabled) {
        indexes.push(index);
      }
    });

    this.insTabHeaders.forEach((item, index) => {
      if (indexes.indexOf(index) !== -1) {
        item.classList.add('disabled');
      } else {
        item.classList.remove('disabled');
      }
    });
  }

  setActiveTabItem(index) {
    this.insTabItems.forEach(item => {
      item.deactivate();
    });
    this.insTabItems[index].activate();
  }

  setScrollableHeaders() {
    let scrollWidth = 0 as number;
    let insTabContainer = this.insTabEl.querySelector('.ins-tab-headers');
    let scrollWidthContainer = insTabContainer.clientWidth;

    this.insTabHeaders.forEach(item => {
      scrollWidth += item.clientWidth;
    });

    if (scrollWidth > scrollWidthContainer) {
      insTabContainer.classList.add('scrollable');
    } else {
      insTabContainer.classList.remove('scrollable');
    }
  }

  setTabLabel(item, index) {
    return item.label ?
      item.label :
      this.getDefaulTabLabel(index);
  }

  setTabIcon(item) {
    return item.icon ?
     item.icon : '';
  }

  componentWillLoad() {
    this.insTabItems = this.getTabItems();
    this.getActiveTabLabelIndex();
  }

  componentDidLoad() {
    this.insTabHeaders = this.getTabHeaders();
    this.setActiveTab(this.activeTabIndex);
    this.setDisabledTabs();
    this.setActiveTabItem(this.activeTabIndex);
    this.setScrollableHeaders();
  }

  @Method()
  async activateTab(place){
    let index = place - 1;
    this.setActiveTab(index);
    this.setActiveTabItem(index);
  }

  @Listen('tabItemDisableToggled')
  tabItemDisableToggledHandler(event){
    let tabIndex = this.insTabItems.indexOf(event.target);
    if (this.insTabHeaders[tabIndex]) {
      if (event.detail){
        this.insTabHeaders[tabIndex].classList.add('disabled');
      } else {
        this.insTabHeaders[tabIndex].classList.remove('disabled');
      }
    }
  }

  @Listen('tabItemError')
  checkForErrors(event){
    let errorIndex = this.insTabItems.indexOf(event.target);
    if (this.insTabHeaders[errorIndex]) {
      if (event.detail){
        this.insTabHeaders[errorIndex].classList.add('has-error');
      } else {
        this.insTabHeaders[errorIndex].classList.remove('has-error');
      }
    }
  }

  render() {
    return (
      <div class="ins-tab">
        <ul class="ins-tab-headers" onMouseOver={() => this.setScrollableHeaders()}>
          {this.insTabItems.map((item, index) => {
            return (
              <li
                class={`ins-tab-header ${item.hasError ? 'has-error' : ''}`}
                onClick={e => this.onchangeTabHandler(e, index)}>
                {item.icon ? <span class={`${item.icon}`}></span>: ''} {item.icon && !item.label ? '' : <span>{this.setTabLabel(item, index)}</span>}
              </li>
            )
          })}
        </ul>
        <slot />
      </div>
    )
  }
}
