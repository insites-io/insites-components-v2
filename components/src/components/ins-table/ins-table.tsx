import { h, Component, Prop, Event, EventEmitter, State, Listen, Element, Method, Watch } from "@stencil/core";

@Component({ tag: 'ins-table' })
export class InsTable {
  @Element() insTableEl: HTMLElement;

  @Event() paginationChange: EventEmitter;
  @Event() tableSearch: EventEmitter;
  @Event() tableSort: EventEmitter;
  @Event() tableBulkAction: EventEmitter;
  @Event() tableRowAction: EventEmitter;
  @Event() fieldChange: EventEmitter;

  @Prop({ mutable: true }) noWrap: boolean = false;
  @Prop({ mutable: true }) searchPosition: string = "right";
  @Prop({ mutable: true }) withoutSearch: boolean = false;
  @Prop({ mutable: true }) withoutPagination: boolean = false;
  @Prop({ mutable: true }) staticTable: boolean = false;
  @Prop({ mutable: true }) loadingScreen: boolean = false;
  @Prop({ mutable: true }) loaderTitle: any;
  @Prop({ mutable: true }) loaderMessage: any;
  @Prop({ mutable: true }) loaderIcon: any;
  @Prop({ mutable: true }) searchbarPlaceholder: string = '';
  @Prop({ mutable: true }) heading: string = '';
  @Prop({ mutable: true }) currency: string = '';
  @Prop({ mutable: true }) tableHeaders: any = [];
  @Prop({ mutable: true }) tableData: any = [];
  @Prop({ mutable: true }) pageNumber: number = 1;
  @Prop({ mutable: true }) pageSize: number = 10;
  @Prop({ mutable: true }) pageSizeOptions: any = [10, 20, 50];
  @Prop({ mutable: true }) totalCount: any = 0;
  @Prop({ mutable: true }) bulkActions: any = [];
  @Prop({ mutable: true }) rowActions: any = [];
  @Prop({ mutable: true }) selectedRows: any = [];
  @Prop({ mutable: true }) updatedRows: any = [];
  @Prop({ mutable: true }) emptyValue: string = '-';
  @Prop({ mutable: true }) sortOrder: boolean = false;
  @Prop({ mutable: true }) sortKeyword: string = '';
  @Prop({ mutable: true }) textOverflow: string = '';
  @Prop({ mutable: true }) defaultBulkAction: string = '';
  @Prop({ mutable: true }) paginationText: string = 'Rows per page:';
  @Prop({ mutable: true }) initialSearch: string = '';

  @State() pageInfo: any = '0-0 of 0';
  @State() nextDisabled: boolean = false;
  @State() tableUpdated: boolean = false;

  @State() hasImage: boolean = false;
  @State() hasRowActions: boolean = false;

  @State() tableDataCopy: any = []

  @Watch('tableData')
  tableDataChangeHandler(){
    this.tableUpdated = true;
  }
  componentWillLoad(){
    this.updatePageInfo();
  }

  componentDidUpdate(){
    if (this.tableUpdated){
      let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox') as any;
      let insCheckboxAll = this.insTableEl.querySelector('#checkAll') as any;
      let insCheckboxAllAccordion = this.insTableEl.querySelector('#checkAllAccordion') as any;

      let counter = 0;
      this.uncheckAll();

      // [...tdCheckboxes].forEach(checkbox => {

      for (let i = 0; i < tdCheckboxes.length; i++){
        let selectionIndex = this.selectedRows.findIndex(selected => {
          return tdCheckboxes[i].value.id === selected.id;
        });

        if (selectionIndex >= 0){
          tdCheckboxes[i].updateCheckState(true);
          counter++;
        }
      }
      if (counter === (tdCheckboxes.length - 2)){

        insCheckboxAll.updateCheckState(true);
        insCheckboxAllAccordion.updateCheckState(true);
      }
      // });
      this.hasImage = false;
      this.tableHeaders.forEach(header => {
        if (header.hasImage){
          this.hasImage = true;
        }
      });
      this.tableUpdated = false;
    }
  }

  @Listen('onSearch')
  onSearchHandler(event) {
    this.tableSearch.emit(event.detail);
  }

  @Listen('onClickInsButton')
  onClickInsButtonHandler(event){
    if (event.target.id === 'insTableBulkButton'){
      this.bulkActionHandler()
    }
  }

  @Listen('onCheckInsCheckbox')
  onCheckInsCheckbox(event){
    let self = this;
    if (event.detail.value === 'checkAll'){
      // this.selectedRows = [];
      let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox') as any;
      // [...tdCheckboxes].forEach(checkbox => {
      if (event.detail.checked){
        for (let i = 0; i < tdCheckboxes.length; i++){
          if (tdCheckboxes[i].value !== 'checkAll'){
            tdCheckboxes[i].updateCheckState(event.detail.checked);

            if (event.detail.checked) {

              let selectionIndex = self.selectedRows.findIndex(item => {
                return item.id === tdCheckboxes[i].value.id;
              });

              if (selectionIndex === -1){
                self.selectedRows.push(tdCheckboxes[i].value);
              }

            }

            this.enterEditMode(tdCheckboxes[i], event.detail.checked, tdCheckboxes[i].value);
          }
        }
      } else {

        for (let i = 0; i < tdCheckboxes.length; i++){
          if (tdCheckboxes[i].value !== 'checkAll'){
            tdCheckboxes[i].updateCheckState(event.detail.checked);
            if (!event.detail.checked) {

              let selectionIndex = self.selectedRows.findIndex(item => {
                return item.id === tdCheckboxes[i].value.id;
              });

              if (selectionIndex >= 0){
                self.selectedRows.splice(selectionIndex, 1);
              }
            }
            this.enterEditMode(tdCheckboxes[i], event.detail.checked, tdCheckboxes[i].value);
          }
        }

      }
      this.selectedRows = this.selectedRows.slice();
      // });
    } else {
      let checkAllEl = this.insTableEl.querySelector('#checkAll') as any;
      checkAllEl.updateCheckState(false);
      this.updateSelectedRows(event.detail.value);
      this.enterEditMode(event.target, event.detail.checked, event.detail.value);
    }

  }

  enterEditMode(el, checked, item){

    let trEl = el.closest('.ibt-table_tr');
    let trAccEl = el.closest('.ibt-table-accordion_row-td');

    if (trEl || trAccEl){
      let elToUse = trEl ? trEl : trAccEl;
      let hasEditable = elToUse.querySelector('.editable');

      if (hasEditable){
        checked
          ? elToUse.classList.add('edit-mode')
          : elToUse.classList.remove('edit-mode');

          item.__editing_ins_base_table_item = checked;
      }

      if (!checked){
        this.removeUpdatedRow(item);
      }
    }
  }

  uncheckAll(){
    let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox') as any;
      for (let i = 0; i < tdCheckboxes.length; i++){
        tdCheckboxes[i].updateCheckState(false);
      }
  }

  updateSelectedRows(value){

    let selectionIndex = this.selectedRows.findIndex(item => {
      return item.id === value.id;
    });

    if (selectionIndex === -1){

      let copy = JSON.parse(JSON.stringify(value));
      delete copy.__editing_ins_base_table_item;
      this.selectedRows.push(copy);
    } else {
      this.selectedRows.splice(selectionIndex, 1);
    }

    this.selectedRows = [...this.selectedRows];
  }

  updateUpdatedRows(value, prop){
    let selectionIndex = this.updatedRows.findIndex(item => {
      return item.id === value.id;
    });

    if (selectionIndex >= 0){
      this.updatedRows[selectionIndex][prop] = value[prop];
    } else {
      this.updatedRows.push(value);
    }
  }

  removeUpdatedRow(value){
    let selectionIndex = this.updatedRows.findIndex(item => {
      return item.id === value.id;
    });

    if (selectionIndex >= 0){
      this.updatedRows.splice(selectionIndex, 1);
    }
  }

  componentWillUpdate(){
    this.updatePageInfo();
  }

  pageSizeChangeHandler(event){
    this.pageNumber = 1;
    this.pageSize = parseInt(event.target.value);

    this.paginationChange.emit({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    });
  }

  pageNumberChangeHandler(key?) {

    if (key === 'prev') {
      this.pageNumber--;
    } else if (key === 'next') {
      this.pageNumber++;
    }

    // this.uncheckAll();
    // this.selectedRows = [];

    this.paginationChange.emit({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    });
  }

  @Method()
  async updatePageInfo() {
    let from = (this.pageSize * this.pageNumber) - (this.pageSize - 1);
    let to = this.pageSize * this.pageNumber;
    to = (to > this.totalCount) ? this.totalCount : to;

    this.pageInfo = from + '-' + to + ' of ' + this.totalCount;
  }

  sortTable(column){

    if (this.sortKeyword === column) {
      this.sortOrder = !this.sortOrder;
    } else {
      this.sortOrder = true;
    }

    this.sortKeyword = column;

    this.tableSort.emit({
      keyword: this.sortKeyword,
      order: this.sortOrder ? 'asc':'desc',
    })
  }

  bulkActionHandler(){
    let bulkActionEl = this.insTableEl.querySelector('ins-select[data-type="bulk-action"]') as any;

    if (bulkActionEl.value){
      this.tableBulkAction.emit({
        action: bulkActionEl.value,
        selections: this.selectedRows,
        updated_items: this.updatedRows
      });
    }
  }

  rowActionHandler(action, data, header){
    this.tableRowAction.emit({ action, header, data });
  }

  @Method()
  async resetSelections(){
    this.selectedRows = [];
    let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox') as any;
    for (let i = 0; i < tdCheckboxes.length; i++){
      tdCheckboxes[i].updateCheckState(false)
    }
  }
  @Method()
  async setBulkAction(value){
    let bulkActionEl = this.insTableEl.querySelector('ins-select[data-type="bulk-action"]') as any;
    bulkActionEl.setSelectedFromValue(value);
  }

  toggleSelectOptionsWrap(event){


    let section;
    let parent = event.target.parentNode;
    let classes = parent.className;

    if (classes.includes('ibt-table-accordion_row-head')) {
      section = parent.nextSibling;
    } else if (classes.includes('ibt-table-accordion_row-td')) {
      section = parent.querySelector('.ibt-table-accordion_row-body');
    } else if (classes.includes('first-td')){
      section = parent.parentNode.nextSibling;
    } else if (classes.includes('img-wrap')){
      section = parent.parentNode.parentNode.nextSibling;
    } else if (classes.includes('text-label')){
      section = parent.parentNode.parentNode.nextSibling;
    }

    if (section){

      let opened = section.getAttribute('data-opened');

      if (opened === 'false') {
        this.openBody(section);
      } else {
        this.closeBody(section);
      }
    }
  }

  closeBody(element) {

    let sectionHeight = (element.scrollHeight > 400 ? 400 : element.scrollHeight);
    let elementTransition = element.style.transition;
    element.style.transition = '';
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;

      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    element.classList.remove('opened');
    element.setAttribute('data-opened', 'false');
    element.parentNode.classList.remove('activated');
  }

  openBody(element) {
    let sectionHeight = (element.scrollHeight > 400 ? 400 : element.scrollHeight) + 26;
    if (element.getAttribute('data-opened') != 'true') {
      element.style.height = sectionHeight + 'px';
    }
    element.classList.add('opened');
    element.setAttribute('data-opened', 'true');
    element.parentNode.classList.add('activated');
  }

  getInitials(value){

    if (value){
      let split = value.split(' ');

      if (split.length > 1){
        return `${split[0][0]}${split[1][0]}`;
      } else if (split.length === 1){
        return `${split[0][0]}${split[0][1]}`;
      } else {
        return this.emptyValue;
      }

    } else {
      return this.emptyValue;
    }
  }

  canHaveRowActions(index, tableHeader /*, item */){
    if ((index === 0 || tableHeader.hasColumnAction) /*&&
    (item[tableHeader.label] && item[tableHeader.label] !== this.emptyValue)*/) {
      return true;
    } else {
      return false;
    }
  }

  @Listen('valueChange')
  @Listen('oninput')
  processEvent(event){
    if (event.target.id) {
      let dataId = event.target.attributes["data-id"].value;
      let item = this.tableData.find(item => item.id === dataId);
      let copy = JSON.parse(JSON.stringify(item));
      let prop = event.target.getAttribute('data-property');

      copy[prop] = event.detail.value || event.detail;

      delete copy.__editing_ins_base_table_item;
      event.table_detail = { label: prop, rowData: copy }
      this.fieldChange.emit(event);
      this.updateUpdatedRows(copy, prop);
    }
  }

  checkEditedItems(item){
    let res = this.updatedRows.find(editedItem => item.id === editedItem.id);
    return res ? res : item;
  }

  renderField(item, tableHeader){
    let editedItem = this.checkEditedItems(item);

    switch (tableHeader.type){
      case 'date':
        return (
          <div class="input-wrap">
            <ins-datepicker
              id={`${editedItem.id}_${tableHeader.label.split(' ').join('_')}`}
              data-id={editedItem.id}
              data-property={tableHeader.label}
              value={editedItem[tableHeader.label]}
              icon="icon-today" format={tableHeader.dateFormat}>
            </ins-datepicker>
          </div>
        )

      case 'select':
        return (
          <div class="input-wrap">
            <ins-select
              id={`${editedItem.id}_${tableHeader.label.split(' ').join('_')}`}
              data-id={editedItem.id}
              data-property={tableHeader.label}
              value={editedItem[tableHeader.label]}>

              {tableHeader.selectOptions && tableHeader.selectOptions.length ?
                tableHeader.selectOptions.map(option => <ins-select-option value={option} label={option}></ins-select-option>)
              : <ins-select-option value="" label="No options" disabled></ins-select-option>}

            </ins-select>
          </div>
        )

      default:
        return (
          <div class="input-wrap">
            <ins-input
              id={`${editedItem.id}_${tableHeader.label.split(' ').join('_')}`}
              data-id={editedItem.id}
              data-property={tableHeader.label}
              value={editedItem[tableHeader.label]}>
            </ins-input>
          </div>
        )
    }
  }

  rowDataRenderer(item, tableHeader) {
    if (item[`${tableHeader.label}Link`]) {
      return (
        <a class={`ibt-link`}
          href={item[`${tableHeader.label}Link`]}>
          {tableHeader.type === 'currency'
            ? `${this.currency
              ? this.currency
              : '$'}${item[tableHeader.label]}`
            : item[tableHeader.label]}
        </a>
      )
    }

    return (
      <span class="ibt-link" onClick={() => {
        !this.rowActions.length ?
        this.rowActionHandler('rowItemClick', item, item[tableHeader.label]) : ''
      }}>
        {tableHeader.type === 'currency'
          ? `${this.currency
            ? this.currency
            : '$'}${item[tableHeader.label]}`
          : item[tableHeader.label]}
      </span>
    )
  }

  rowActionMapper(rowAction, item, tableHeader){
    let header = tableHeader
      ? tableHeader.label
      : '';

    if (item[`${rowAction}Link`]){
      return (
      <a class={`action-item
        ${rowAction === 'Archive' ||
        rowAction === 'Remove' ||
        rowAction === 'Delete' ||
        rowAction === 'Disable' ? 'archive' : ''}`}
        href={item[`${rowAction}Link`]}>

        {rowAction}
      </a>
      )
    }

    return (
      <span
        class={`action-item
          ${rowAction === 'Archive' ||
            rowAction === 'Remove' ||
            rowAction === 'Delete' ||
            rowAction === 'Disable' ? 'archive':''}`}
        onClick={() => this.rowActionHandler(rowAction, item, header)}>

        {rowAction}
      </span>
    )
  }

  render() {
    return (
      <div class={`ibt-table-wrap ibt-table-wrap__stripe ${this.heading ? '' : 'no-label'} ${this.noWrap ? 'no-wrap' : ''}`}>
        {this.heading || !this.withoutSearch ?
          <div class="ibt-table-header-wrap">
            {this.heading ? <div class="ibt-table-wrap__title">{this.heading}</div> : ''}

            {this.withoutSearch ? '' : // || this.loadingScreen
              <div class={`ins-searchbar-container ${this.searchPosition === 'left' ? 'left' : ''}`}>
                <ins-input placeholder={this.searchbarPlaceholder} value={this.initialSearch}></ins-input>
              </div>
            }
          </div>
        : ''}
        <div class={`ibt-table-wrap__no-heading ${this.noWrap ? 'no-wrap' : ''}`}>

          {this.staticTable ?
            <div class="static-wrap">
              <div class={`ibt-table ${this.staticTable ? 'static' : ''}`}>
                <slot />
              </div>
              {this.loadingScreen /* || !this.tableData.length */ ?
                <div class={`loading-screen`}>
                  <ins-loader
                    state-title={this.loaderTitle}
                    state-message={this.loaderMessage}
                    state-icon={this.loaderIcon}>
                  </ins-loader>
                </div>
              : ''}
            </div>
            :
            <div class="dynamic-wrap">
              <div class="ibt-table">

            {this.tableHeaders.length ?
              <div class="ibt-table_tr">

                {this.bulkActions.length ?
                <div class="ibt-table_th checkbox">
                  {this.loadingScreen ? '': <ins-checkbox id="checkAll" value="checkAll"></ins-checkbox>}
                </div> : '' }

                {this.tableHeaders.map(tableHeader => {
                  return (
                    <div class={`ibt-table_th ${tableHeader.label === ''} ${(tableHeader.type === 'number' || tableHeader.type === 'currency') ? 'text-right' : ''} ${tableHeader.sortable ? '' : 'not-sortable'}`}>
                        <span onClick={() => { if (tableHeader.sortable){this.sortTable(tableHeader.label)}}}
                          class={`label-wrap
                            ${this.sortKeyword === tableHeader.label ? 'sorted':''}
                            ${tableHeader.sortable ? 'sortable':''}`}>

                          {tableHeader.label}
                          {tableHeader.sortable ?
                            <span class={`icon-arrow-up
                              ${this.sortKeyword === tableHeader.label ? 'active' : ''}
                              ${!this.sortOrder && this.sortKeyword === tableHeader.label ? 'go-down' : ''}`}>
                            </span>
                          : ''}
                        </span>
                    </div>
                  )
                })}
              </div>
            : ''}

            {this.tableData.length && !this.loadingScreen ? this.tableData.map(item => {
              return (
                <div class="ibt-table_tr">

                  {this.bulkActions.length ?
                    <div class={`
                      ibt-table_td
                      checkbox
                      ${this.hasImage ? 'has-image' : ''}
                      ${this.rowActions.length ? 'has-row-actions' : ''}
                    `}>
                      <ins-checkbox value={item}></ins-checkbox>
                    </div>
                  : ''}

                  {this.tableHeaders.map((tableHeader, index) => {
                    return (
                      <div class={
                        `ibt-table_td
                        ${(tableHeader.type === 'number' || tableHeader.type === 'currency') ? 'text-right' : ''}
                        ${tableHeader.hasLink ? 'has-link' : ''}

                        ${tableHeader.hasImage &&
                          (item[`${tableHeader.label}_Img`] ||
                            (item[tableHeader.label] && item[tableHeader.label] !== this.emptyValue)
                          ) ? 'has-image' : ''}

                        ${tableHeader.hasTag ? `tagged ${item[tableHeader.label]}` : ''}
                        ${tableHeader.editable ? `editable` : ''}
                        ${this.rowActions.length ? 'has-row-actions' : ''}
                        ${this.textOverflow === "ellipsis" ? 'overflow-ellipsis' : ''}
                      `}>

                        {tableHeader.hasImage && (item[tableHeader.label] || item[`${tableHeader.label}_Img`]) ?
                          <div class={`img-wrap ${item[`${tableHeader.label}_Img`] ? '' : 'use-fallback' }`}>
                            {item[`${tableHeader.label}_Img`] ?
                              <img src={item[`${tableHeader.label}_Img`]} /> :
                              <div class="img-fallback-wrap">
                                {this.getInitials(item[tableHeader.label])}
                              </div>
                            }
                          </div>
                        : ''}

                        {item[tableHeader.label] ?
                          <div class="input-label-wrap">
                            {!this.rowActions.length && item['RowLink'] && (index === 0)
                            ? <a href={item['RowLink']} class="ibt-link">
                              {tableHeader.type === 'currency'
                                ? `${this.currency
                                    ? this.currency
                                    : '$'}${item[tableHeader.label]}`
                                : item[tableHeader.label]}
                            </a>
                              : this.rowDataRenderer(item, tableHeader)
                            }

                            {tableHeader.editable && item.__editing_ins_base_table_item ?
                              this.renderField(item, tableHeader)
                            : ''}
                          </div>
                        :
                          <div class="input-label-wrap 2">
                            {tableHeader.editable && item.__editing_ins_base_table_item ?
                              this.renderField(item, tableHeader)
                            : this.emptyValue }
                          </div>
                        }

                        {this.rowActions && this.canHaveRowActions(index, tableHeader/*, item*/) ?

                          <div class="action-wrap">
                            {this.rowActions.map(rowAction => this.rowActionMapper(rowAction, item, tableHeader))}
                          </div>
                        : ''}
                      </div>
                    )
                  })}
                </div>
              )
            }) : ''}

          </div>

              <div class={`ibt-table-accordion ${this.staticTable ? 'static' : ''}`}>
            {this.tableHeaders.length ?
              <div class="ibt-table-accordion_th has-checkbox">

                {this.bulkActions.length ?
                <div class="checkbox-wrap">
                  {this.loadingScreen ? '' : <ins-checkbox id="checkAllAccordion" value="checkAll"></ins-checkbox>}
                </div> : ''}

                <div class="first-th">

                  <span onClick={() => this.sortTable(this.tableHeaders[0].label)}
                    class={`label-wrap ${this.sortKeyword === this.tableHeaders[0].label? 'sorted' : ''}`}>

                    {this.tableHeaders[0].label}
                    {this.sortKeyword === this.tableHeaders[0].label?
                      <span class={`icon-arrow-up ${this.sortOrder ? '': 'go-down'}`}></span>
                      : ''}
                  </span>

                </div>
              </div>
            : ''}

            {this.tableData.length && !this.loadingScreen ? this.tableData.map(item => {
              return (

                <div class="ibt-table-accordion_row-td">

                  <div class={`
                    ibt-table-accordion_row-head
                    ${this.bulkActions.length ? 'has-checkbox' : ''}`}
                    onClick={event => this.toggleSelectOptionsWrap(event)}>

                    {this.bulkActions.length ?
                    <div class="checkbox-wrap">
                      <ins-checkbox value={item}></ins-checkbox>
                    </div> : ''}

                    <div class={`
                      first-td
                      ${this.tableHeaders[0].hasImage ? 'has-image' : ''}
                    `}>
                      {this.tableHeaders[0].hasImage && item[this.tableHeaders[0].label] ?
                        <div class="img-wrap">
                          { item[`${this.tableHeaders[0].label}_Img`] ?
                            <img src={item[`${this.tableHeaders[0].label}_Img`]} />
                          :
                            <div class="img-fallback-wrap">
                              {this.getInitials(item[this.tableHeaders[0].label])}
                            </div>
                          }
                        </div>
                      : ''}
                      <div class="text-label">
                        {item[this.tableHeaders[0].label] ?
                          <span>{item[this.tableHeaders[0].label]}</span> :
                          <span>-</span>
                        }
                      </div>
                    </div>

                    <i class="icon-caret-down"></i>
                    <i class="icon-caret-up"></i>

                  </div>

                  <div class="ibt-table-accordion_row-body" data-opened="false">

                    <table>
                      {this.tableHeaders.map((tableHeader) => {
                        return (
                          <tr>
                            <td class="column-label">{tableHeader.label}</td>
                            <td class={`
                              ${tableHeader.editable ? 'editable' : ''}
                              ${tableHeader.hasLink ? 'ibta-td-has-link' : ''}
                              ${tableHeader.hasTag ? `tagged ${item[tableHeader.label]}` : ''}`}>
                              {item[tableHeader.label] ?
                                <div>
                                  {!this.rowActions.length && item['RowLink']
                                    ? <a href={item['RowLink']} class="ibt-link">
                                      {tableHeader.type === 'currency'
                                        ? `${this.currency
                                            ? this.currency
                                            : '$'}${item[tableHeader.label]}`
                                        : item[tableHeader.label]}
                                    </a>

                                    : this.rowDataRenderer(item, tableHeader)
                                  }
                                  {tableHeader.editable && item.__editing_ins_base_table_item ?
                                    this.renderField(item, tableHeader)
                                  : ''}
                                </div> :
                                <span>-</span>}
                            </td>
                          </tr>
                        )
                      })}
                    </table>

                    {this.rowActions ?
                      <div class="action-wrap">
                        {this.rowActions.map(rowAction => this.rowActionMapper(rowAction, item, ''))}
                      </div>
                    : ''}
                  </div>

                </div>
              )
            }) : ''}

          </div>

              {this.loadingScreen /* || !this.tableData.length */ ?
                <div class={`loading-screen`}>
                  <ins-loader
                    state-title={this.loaderTitle}
                    state-message={this.loaderMessage}
                    state-icon={this.loaderIcon}>
                  </ins-loader>
                </div>
              : ''}
            </div>
          }

          {/* Pagination */}
          <div class="ibt-table-wrap__settings">
            {this.bulkActions.length ?
            <div class="ibt-table-action-container">
              <ins-select data-type="bulk-action"
                value={this.defaultBulkAction}
                disabled={!this.selectedRows.length}
                placeholder="Bulk Actions"
                small button>
                {
                  this.bulkActions.map(action => {
                    return (<ins-select-option label={action} value={action}></ins-select-option>)
                  })
                }
              </ins-select>
              <ins-button
                id="insTableBulkButton"
                label="Apply"
                size="small"
                solid
                disabled={!this.selectedRows.length}>
              </ins-button>
            </div> : ''}
            {this.withoutPagination ? '' :
              <div class={`pagination-wrap ${this.bulkActions.length ? '' : 'full'}`}>
                <div class="ibt-table-wrap__pagination">
                  <span>{this.paginationText}</span>
                  <select class="ibt-table-wrap__pagination--option"
                    onChange={(event) => this.pageSizeChangeHandler(event)}>

                    {this.pageSizeOptions ? this.pageSizeOptions.map((option) =>
                      <option value={option} selected={this.pageSize == option}>
                        {option}
                      </option>
                    ) : ''}
                  </select>
                </div>

                <div class="ibt-table-wrap__page">
                  {this.pageInfo}
                </div>

                <div class="ibt-table-wrap__prev-next">

                  <button
                    onClick={() => this.pageNumberChangeHandler('prev')}
                    disabled={this.pageNumber === 1}>
                    <i class={`icon-chevron-left`}></i>
                  </button>

                  <button
                    onClick={() => this.pageNumberChangeHandler('next')}
                    disabled={(this.pageNumber * this.pageSize) >= this.totalCount}>
                    <i class={`icon-chevron-right`}></i>
                  </button>

                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
