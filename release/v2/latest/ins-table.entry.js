import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsTable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insPaginationChange = createEvent(this, "insPaginationChange", 7);
        this.insTableSearch = createEvent(this, "insTableSearch", 7);
        this.insTableSort = createEvent(this, "insTableSort", 7);
        this.insTableBulkAction = createEvent(this, "insTableBulkAction", 7);
        this.insTableRowAction = createEvent(this, "insTableRowAction", 7);
        this.insFieldChange = createEvent(this, "insFieldChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.selectedBulkAction = "";
        this.hasLoad = undefined;
        this.noWrap = false;
        this.searchPosition = "right";
        this.withoutSearch = false;
        this.withoutPagination = false;
        this.staticTable = false;
        this.loadingScreen = false;
        this.loaderTitle = undefined;
        this.loaderMessage = undefined;
        this.loaderIcon = undefined;
        this.loaderImageSource = null;
        this.searchbarPlaceholder = '';
        this.heading = '';
        this.currency = '';
        this.tableHeaders = [];
        this.tableData = [];
        this.pageNumber = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 50];
        this.totalCount = 0;
        this.bulkActions = [];
        this.rowActions = [];
        this.selectedRows = [];
        this.updatedRows = [];
        this.emptyValue = '-';
        this.sortOrder = false;
        this.sortKeyword = '';
        this.textOverflow = '';
        this.defaultBulkAction = '';
        this.paginationText = 'Rows per page:';
        this.initialSearch = '';
        this.pageInfo = '0-0 of 0';
        this.nextDisabled = false;
        this.tableUpdated = false;
        this.hasImage = false;
        this.hasRowActions = false;
        this.tableDataCopy = [];
    }
    tableDataChangeHandler() {
        this.tableUpdated = true;
    }
    bulkActionsChangeHandler() {
        let bulkActionEl = this.insTableEl
            .querySelector('ins-select[data-type="bulk-action"]');
        if (bulkActionEl) {
            bulkActionEl.reset();
            // this.selectedBulkAction = "";
            this.resetSelections();
        }
    }
    componentWillLoad() {
        this.updatePageInfo();
    }
    componentDidUpdate() {
        this.updateBulkActionEl();
    }
    async updateBulkActionEl() {
        let bulkActionEl = this.insTableEl.querySelector('ins-select[data-type="bulk-action"]');
        if (bulkActionEl)
            await bulkActionEl.setSelectedFromValue(this.selectedBulkAction);
    }
    componentDidLoad() {
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insTableEl);
        }
        if (this.defaultBulkAction) {
            this.selectedBulkAction = this.defaultBulkAction;
            this.updateBulkActionEl();
        }
    }
    componentWillUpdate() {
        if (this.tableUpdated) {
            let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox');
            let insCheckboxAll = this.insTableEl.querySelector('#checkAll');
            let insCheckboxAllAccordion = this.insTableEl.querySelector('#checkAllAccordion');
            let counter = 0;
            this.uncheckAll();
            for (let i = 0; i < tdCheckboxes.length; i++) {
                let selectionIndex = this.selectedRows.findIndex(selected => {
                    return tdCheckboxes[i].value.id === selected.id;
                });
                if (selectionIndex >= 0) {
                    tdCheckboxes[i].updateCheckState(true);
                    counter++;
                }
            }
            if (counter === (tdCheckboxes.length - 2)) {
                insCheckboxAll.updateCheckState(true);
                insCheckboxAllAccordion.updateCheckState(true);
            }
            this.hasImage = false;
            this.tableHeaders.forEach(header => {
                if (header.hasImage) {
                    this.hasImage = true;
                }
            });
            this.tableUpdated = false;
        }
        this.updatePageInfo();
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    onSearchHandler(event) {
        if (event.target.icon === "icon-search") {
            this.insTableSearch.emit(event.detail);
        }
    }
    onClickInsButtonHandler(event) {
        if (event.target.className.includes('insTableBulkButton')) {
            this.bulkActionHandler();
        }
    }
    onCheckInsCheckbox(event) {
        let self = this;
        if (event.detail.value === 'checkAll') {
            // this.selectedRows = [];
            let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox');
            // [...tdCheckboxes].forEach(checkbox => {
            if (event.detail.checked) {
                for (let i = 0; i < tdCheckboxes.length; i++) {
                    if (tdCheckboxes[i].value !== 'checkAll') {
                        tdCheckboxes[i].updateCheckState(event.detail.checked);
                        if (event.detail.checked) {
                            let selectionIndex = self.selectedRows.findIndex(item => {
                                return item.id === tdCheckboxes[i].value.id;
                            });
                            if (selectionIndex === -1) {
                                self.selectedRows.push(tdCheckboxes[i].value);
                            }
                        }
                        this.enterEditMode(tdCheckboxes[i], event.detail.checked, tdCheckboxes[i].value);
                    }
                }
            }
            else {
                for (let i = 0; i < tdCheckboxes.length; i++) {
                    if (tdCheckboxes[i].value !== 'checkAll') {
                        tdCheckboxes[i].updateCheckState(event.detail.checked);
                        if (!event.detail.checked) {
                            let selectionIndex = self.selectedRows.findIndex(item => {
                                return item.id === tdCheckboxes[i].value.id;
                            });
                            if (selectionIndex >= 0) {
                                self.selectedRows.splice(selectionIndex, 1);
                            }
                        }
                        this.enterEditMode(tdCheckboxes[i], event.detail.checked, tdCheckboxes[i].value);
                    }
                }
            }
            this.selectedRows = this.selectedRows.slice();
            // });
        }
        else {
            let checkAllEl = this.insTableEl.querySelector('#checkAll');
            checkAllEl.updateCheckState(false);
            this.updateSelectedRows(event.detail.value);
            this.enterEditMode(event.target, event.detail.checked, event.detail.value);
        }
    }
    enterEditMode(el, checked, item) {
        let trEl = el.closest('.ibt-table_tr');
        let trAccEl = el.closest('.ibt-table-accordion_row-td');
        if (trEl || trAccEl) {
            let elToUse = trEl ? trEl : trAccEl;
            let hasEditable = elToUse.querySelector('.editable');
            if (hasEditable) {
                checked
                    ? elToUse.classList.add('edit-mode')
                    : elToUse.classList.remove('edit-mode');
                item.__editing_ins_base_table_item = checked;
            }
            if (!checked) {
                this.removeUpdatedRow(item);
            }
        }
    }
    uncheckAll() {
        let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox');
        for (let i = 0; i < tdCheckboxes.length; i++) {
            tdCheckboxes[i].updateCheckState(false);
        }
    }
    updateSelectedRows(value) {
        let selectionIndex = this.selectedRows.findIndex(item => {
            return item.id === value.id;
        });
        if (selectionIndex === -1) {
            let copy = JSON.parse(JSON.stringify(value));
            delete copy.__editing_ins_base_table_item;
            this.selectedRows.push(copy);
        }
        else {
            this.selectedRows.splice(selectionIndex, 1);
        }
        this.selectedRows = [...this.selectedRows];
    }
    updateUpdatedRows(value, prop) {
        let selectionIndex = this.updatedRows.findIndex(item => {
            return item.id === value.id;
        });
        if (selectionIndex >= 0) {
            this.updatedRows[selectionIndex][prop] = value[prop];
        }
        else {
            this.updatedRows.push(value);
        }
    }
    removeUpdatedRow(value) {
        let selectionIndex = this.updatedRows.findIndex(item => {
            return item.id === value.id;
        });
        if (selectionIndex >= 0) {
            this.updatedRows.splice(selectionIndex, 1);
        }
    }
    // componentWillUpdate(){
    //   this.updatePageInfo();
    // }
    pageSizeChangeHandler(event) {
        this.pageNumber = 1;
        this.pageSize = parseInt(event.target.value);
        this.insPaginationChange.emit({
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
        });
    }
    pageNumberChangeHandler(key) {
        if (key === 'prev') {
            this.pageNumber--;
        }
        else if (key === 'next') {
            this.pageNumber++;
        }
        else if (key === 'first') {
            this.pageNumber = 1;
        }
        else if (key === 'last') {
            this.pageNumber = Math.ceil(this.totalCount / this.pageSize);
        }
        else {
            this.pageNumber = key;
        }
        // this.uncheckAll();
        // this.selectedRows = [];
        this.insPaginationChange.emit({
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
        });
    }
    async updatePageInfo() {
        let from = (this.pageSize * this.pageNumber) - (this.pageSize - 1);
        let to = this.pageSize * this.pageNumber;
        to = (to > this.totalCount) ? this.totalCount : to;
        if (!this.staticTable && !this.tableData.length)
            from = 0;
        this.pageInfo = from + '-' + to + ' of ' + this.numberWithCommas(this.totalCount);
    }
    sortTable(column) {
        if (this.sortKeyword === column) {
            this.sortOrder = !this.sortOrder;
        }
        else {
            this.sortOrder = true;
        }
        this.sortKeyword = column;
        this.insTableSort.emit({
            keyword: this.sortKeyword,
            order: this.sortOrder ? 'asc' : 'desc',
        });
    }
    bulkActionHandler() {
        if (this.selectedBulkAction) {
            this.insTableBulkAction.emit({
                action: this.selectedBulkAction,
                selections: this.selectedRows,
                updated_items: this.updatedRows
            });
        }
    }
    rowActionHandler(action, data, header) {
        this.insTableRowAction.emit({ action, header, data });
    }
    async resetSelections() {
        this.selectedRows = [];
        let tdCheckboxes = this.insTableEl.querySelectorAll('ins-checkbox');
        for (let i = 0; i < tdCheckboxes.length; i++) {
            tdCheckboxes[i].updateCheckState(false);
        }
    }
    async setBulkAction(value) {
        let bulkActionEl = this.insTableEl.querySelector('ins-select[data-type="bulk-action"]');
        bulkActionEl.setSelectedFromValue(value);
    }
    toggleSelectOptionsWrap(event) {
        let section;
        let parent = event.target.parentNode;
        let classes = parent.className;
        if (classes.includes('ibt-table-accordion_row-head')) {
            section = parent.nextSibling;
        }
        else if (classes.includes('ibt-table-accordion_row-td')) {
            section = parent.querySelector('.ibt-table-accordion_row-body');
        }
        else if (classes.includes('first-td')) {
            section = parent.parentNode.nextSibling;
        }
        else if (classes.includes('img-wrap')) {
            section = parent.parentNode.parentNode.nextSibling;
        }
        else if (classes.includes('text-label')) {
            section = parent.parentNode.parentNode.nextSibling;
        }
        if (section) {
            let opened = section.getAttribute('data-opened');
            if (opened === 'false') {
                this.openBody(section);
            }
            else {
                this.closeBody(section);
            }
        }
    }
    closeBody(element) {
        let sectionHeight = (element.scrollHeight > 400 ? 400 : element.scrollHeight);
        let elementTransition = element.style.transition;
        element.style.transition = '';
        requestAnimationFrame(function () {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;
            requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });
        element.classList.remove('opened');
        element.setAttribute('data-opened', 'false');
        element.parentNode.classList.remove('activated');
    }
    openBody(element) {
        let sectionHeight = element.scrollHeight + 26;
        if (element.getAttribute('data-opened') != 'true') {
            element.style.height = sectionHeight + 'px';
        }
        element.classList.add('opened');
        element.setAttribute('data-opened', 'true');
        element.parentNode.classList.add('activated');
    }
    getInitials(value) {
        if (value) {
            let split = value.split(' ');
            if (split.length > 1) {
                return `${split[0][0]}${split[1][0]}`;
            }
            else if (split.length === 1) {
                return `${split[0][0]}${split[0][1]}`;
            }
            else {
                return this.emptyValue;
            }
        }
        else {
            return this.emptyValue;
        }
    }
    canHaveRowActions(index, tableHeader /*, item */) {
        if ((index === 0 || tableHeader.hasColumnAction) /*&&
        (item[tableHeader.label] && item[tableHeader.label] !== this.emptyValue)*/) {
            return true;
        }
        else {
            return false;
        }
    }
    processEvent(event) {
        if (event.target.id) {
            if (event.target.attributes["data-id"]) {
                let dataId = event.target.attributes["data-id"].value;
                let item = this.tableData.find(item => item.id === dataId);
                let copy = JSON.parse(JSON.stringify(item));
                let prop = event.target.getAttribute('data-property');
                copy[prop] = event.detail.value || event.detail;
                delete copy.__editing_ins_base_table_item;
                event.table_detail = { label: prop, rowData: copy };
                this.insFieldChange.emit(event);
                this.updateUpdatedRows(copy, prop);
            }
        }
        else if (event.target.attributes["data-type"] && event.target.attributes["data-type"].value === "bulk-action") {
            this.selectedBulkAction = event.detail.value || event.detail;
        }
    }
    checkEditedItems(item) {
        let res = this.updatedRows.find(editedItem => item.id === editedItem.id);
        return res ? res : item;
    }
    renderField(item, tableHeader) {
        let editedItem = this.checkEditedItems(item);
        switch (tableHeader.type) {
            case 'date':
                return (h("div", { class: "input-wrap" }, h("ins-date-time", { id: `${editedItem.id}_${tableHeader.label.split(' ').join('_')}`, "data-id": editedItem.id, "data-property": tableHeader.label, value: editedItem[tableHeader.label], icon: "icon-today", format: tableHeader.dateFormat, mode: "datepicker" })));
            case 'select':
                return (h("div", { class: "input-wrap" }, h("ins-select", { id: `${editedItem.id}_${tableHeader.label.split(' ').join('_')}`, "data-id": editedItem.id, "data-property": tableHeader.label, value: editedItem[tableHeader.label] }, tableHeader.selectOptions && tableHeader.selectOptions.length ?
                    tableHeader.selectOptions.map(option => h("ins-select-option", { value: option, label: option }))
                    : h("ins-select-option", { value: "", label: "No options", disabled: true }))));
            default:
                return (h("div", { class: "input-wrap" }, h("ins-input", { id: `${editedItem.id}_${tableHeader.label.split(' ').join('_')}`, "data-id": editedItem.id, "data-property": tableHeader.label, value: editedItem[tableHeader.label] })));
        }
    }
    rowDataRenderer(item, tableHeader) {
        if (item[`${tableHeader.label}Link`]) {
            return (h("a", { class: `ibt-link`, href: item[`${tableHeader.label}Link`] }, tableHeader.type === 'currency'
                ? `${this.currency
                    ? this.currency
                    : '$'}${item[tableHeader.label]}`
                : item[tableHeader.label]));
        }
        return (h("span", { class: "ibt-link", onClick: () => {
                !this.rowActions.length ?
                    this.rowActionHandler('rowItemClick', item, item[tableHeader.label]) : '';
            } }, tableHeader.type === 'currency'
            ? `${this.currency
                ? this.currency
                : '$'}${item[tableHeader.label]}`
            : item[tableHeader.label]));
    }
    rowActionMapper(rowAction, item, tableHeader) {
        let header = tableHeader
            ? tableHeader.label
            : '';
        if (item[`${rowAction}Link`]) {
            return (h("a", { class: `action-item
        ${rowAction === 'Archive' ||
                    rowAction === 'Remove' ||
                    rowAction === 'Delete' ||
                    rowAction === 'Disable' ? 'archive' : ''}`, href: item[`${rowAction}Link`] }, rowAction));
        }
        return (h("span", { class: `action-item
          ${rowAction === 'Archive' ||
                rowAction === 'Remove' ||
                rowAction === 'Delete' ||
                rowAction === 'Disable' ? 'archive' : ''}`, onClick: () => this.rowActionHandler(rowAction, item, header) }, rowAction));
    }
    renderMobileImage(item, headerLabel, mobileHeader, hasImage) {
        return (hasImage && item[headerLabel] && !mobileHeader ?
            h("div", { class: "img-wrap" }, item[`${headerLabel}_Img`] ?
                h("img", { src: item[`${headerLabel}_Img`] })
                :
                    h("div", { class: "img-fallback-wrap" }, this.getInitials(item[headerLabel])))
            : '');
    }
    renderMobileHeader(item, headerLabel) {
        return (h("div", { class: "text-label" }, h("span", null, item[headerLabel]
            ? item[headerLabel]
            : '-')));
    }
    renderMobileRowHeader(item) {
        let firstHeader = this.tableHeaders[0];
        let mobileHeader = this.tableHeaders.find(item => item.mobileHeader === true);
        let hasImage = firstHeader.hasImage;
        let headerLabel = mobileHeader
            ? mobileHeader.label
            : firstHeader.label;
        return (h("div", { class: `first-td ${hasImage && !mobileHeader ? 'has-image' : ''}` }, this.renderMobileImage(item, headerLabel, mobileHeader, hasImage), this.renderMobileHeader(item, headerLabel)));
    }
    renderMainMobileHeader() {
        let header = this.tableHeaders.find(item => item.mobileHeader === true);
        let mobileHeader = header
            ? header.label
            : this.tableHeaders[0].label;
        return (h("div", { class: "ibt-table-accordion_th has-checkbox" }, this.bulkActions.length
            ? h("div", { class: "checkbox-wrap" }, this.loadingScreen
                ? ''
                : h("ins-checkbox", { id: "checkAllAccordion", value: "checkAll" }))
            : '', h("div", { class: "first-th" }, h("span", { onClick: () => this.sortTable(mobileHeader), class: `label-wrap ${this.sortKeyword === mobileHeader ? 'sorted' : ''}` }, mobileHeader, this.sortKeyword === mobileHeader
            ? h("span", { class: `icon-arrow-up ${this.sortOrder ? '' : 'go-down'}` })
            : ''))));
    }
    renderPageNumbers() {
        if (!this.totalCount)
            return [];
        if (this.totalCount < this.pageSize)
            return [1];
        const totalPages = Math.ceil(this.totalCount / this.pageSize);
        const pages = [];
        let pageNumber = this.pageNumber;
        let length = 5;
        if (totalPages < 5) {
            length = totalPages;
        }
        else if ((pageNumber + 4) > totalPages) {
            pageNumber = totalPages - 4;
        }
        for (let i = 0; i < length; i++) {
            const page = pageNumber + i;
            if (page <= totalPages)
                pages.push(page);
        }
        return pages;
    }
    render() {
        return (h("div", { key: 'f9a8f1b7f9a6d3724d6861e2dc67e996eee3cf22', class: `ibt-table-wrap ibt-table-wrap__stripe ${this.heading ? '' : 'no-label'} ${this.noWrap ? 'no-wrap' : ''}` }, this.heading || !this.withoutSearch ?
            h("div", { class: "ibt-table-header-wrap" }, this.heading ? h("div", { class: "ibt-table-wrap__title" }, this.heading) : '', this.withoutSearch ? '' : // || this.loadingScreen
                h("div", { class: `ins-searchbar-container ${this.searchPosition === 'left' ? 'left' : ''}` }, h("ins-input", { placeholder: this.searchbarPlaceholder, value: this.initialSearch, icon: "icon-search" })))
            : '', h("div", { key: '5a4670aba1599531c91fdfa1cace4de9426cd07e', class: `ibt-table-wrap__no-heading ${this.noWrap ? 'no-wrap' : ''}` }, this.staticTable ?
            h("div", { class: "static-wrap" }, h("div", { class: `ibt-table ${this.staticTable ? 'static' : ''}` }, h("slot", null)), this.loadingScreen /* || !this.tableData.length */ ?
                h("div", { class: `loading-screen` }, h("ins-loader", { "image-source": this.loaderImageSource, "state-title": this.loaderTitle, "state-message": this.loaderMessage, "state-icon": this.loaderIcon }))
                : '')
            :
                h("div", { class: "dynamic-wrap" }, h("div", { class: "ibt-table" }, this.tableHeaders.length ?
                    h("div", { class: "ibt-table_tr" }, this.bulkActions.length ?
                        h("div", { class: "ibt-table_th checkbox" }, this.loadingScreen ? '' : h("ins-checkbox", { id: "checkAll", value: "checkAll" })) : '', this.tableHeaders.map(tableHeader => {
                        return (h("div", { class: `ibt-table_th
                      ${(tableHeader.type === 'number' || tableHeader.type === 'currency') ? 'text-right' : ''}
                      ${tableHeader.sortable ? '' : 'not-sortable'}
                      ${tableHeader.textAlign ? `text-${tableHeader.textAlign}` : ''}`, style: { width: tableHeader.columnWidth || "auto" } }, h("span", { onClick: () => {
                                if (tableHeader.sortable) {
                                    this.sortTable(tableHeader.label);
                                }
                            }, class: `label-wrap
                            ${this.sortKeyword === tableHeader.label ? 'sorted' : ''}
                            ${tableHeader.sortable ? 'sortable' : ''}` }, tableHeader.label, tableHeader.sortable || this.sortKeyword === tableHeader.label ?
                            h("span", { class: `icon-arrow-up
                              ${this.sortKeyword === tableHeader.label ? 'active' : ''}
                              ${!this.sortOrder && this.sortKeyword === tableHeader.label ? 'go-down' : ''}` })
                            : '')));
                    }))
                    : '', this.tableData.length && !this.loadingScreen ? this.tableData.map(item => {
                    return (h("div", { class: "ibt-table_tr" }, this.bulkActions.length ?
                        h("div", { class: `
                      ibt-table_td
                      checkbox
                      ${this.hasImage ? 'has-image' : ''}
                      ${this.rowActions.length ? 'has-row-actions' : ''}
                    ` }, h("ins-checkbox", { value: item }))
                        : '', this.tableHeaders.map((tableHeader, index) => {
                        return (h("div", { class: `ibt-table_td
                        ${(tableHeader.type === 'number' || tableHeader.type === 'currency') ? 'text-right' : ''}
                        ${tableHeader.hasLink ? 'has-link' : ''}

                        ${tableHeader.hasImage &&
                                (item[`${tableHeader.label}_Img`] ||
                                    (item[tableHeader.label] && item[tableHeader.label] !== this.emptyValue)) ? 'has-image' : ''}

                        ${tableHeader.hasTag ? `tagged ${item[`${tableHeader.label}_tagClass`] ? item[`${tableHeader.label}_tagClass`] : item[tableHeader.label]}` : ''}
                        ${tableHeader.editable ? `editable` : ''}
                        ${this.rowActions.length ? 'has-row-actions' : ''}
                        ${this.textOverflow === "ellipsis" ? 'overflow-ellipsis' : ''}
                        ${tableHeader.textAlign ? `text-${tableHeader.textAlign}` : ''}
                      ` }, tableHeader.hasImage && (item[tableHeader.label] || item[`${tableHeader.label}_Img`]) ?
                            h("div", { class: `img-wrap ${item[`${tableHeader.label}_Img`] ? '' : 'use-fallback'}` }, item[`${tableHeader.label}_Img`] ?
                                h("img", { src: item[`${tableHeader.label}_Img`] }) :
                                h("div", { class: "img-fallback-wrap" }, this.getInitials(item[tableHeader.label])))
                            : '', item[tableHeader.label] ?
                            h("div", { class: "input-label-wrap" }, !this.rowActions.length && item['RowLink'] && (index === 0)
                                ? h("a", { href: item['RowLink'], class: "ibt-link" }, tableHeader.type === 'currency'
                                    ? `${this.currency
                                        ? this.currency
                                        : '$'}${item[tableHeader.label]}`
                                    : item[tableHeader.label])
                                : this.rowDataRenderer(item, tableHeader), tableHeader.editable && item.__editing_ins_base_table_item ?
                                this.renderField(item, tableHeader)
                                : '')
                            :
                                h("div", { class: "input-label-wrap 2" }, tableHeader.editable && item.__editing_ins_base_table_item ?
                                    this.renderField(item, tableHeader)
                                    : this.emptyValue), this.rowActions && this.canHaveRowActions(index, tableHeader /*, item*/) ?
                            h("div", { class: "action-wrap" }, this.rowActions.map(rowAction => this.rowActionMapper(rowAction, item, tableHeader)))
                            : ''));
                    })));
                }) : ''), h("div", { class: `ibt-table-accordion ${this.staticTable ? 'static' : ''}` }, this.tableHeaders.length
                    ? this.renderMainMobileHeader()
                    : '', this.tableData.length && !this.loadingScreen ? this.tableData.map(item => {
                    return (h("div", { class: "ibt-table-accordion_row-td" }, h("div", { class: `
                    ibt-table-accordion_row-head
                    ${this.bulkActions.length ? 'has-checkbox' : ''}`, onClick: event => this.toggleSelectOptionsWrap(event) }, this.bulkActions.length ?
                        h("div", { class: "checkbox-wrap" }, h("ins-checkbox", { value: item })) : '', this.renderMobileRowHeader(item), h("i", { class: "icon-caret-down" }), h("i", { class: "icon-caret-up" })), h("div", { class: "ibt-table-accordion_row-body", "data-opened": "false" }, h("table", null, this.tableHeaders.map((tableHeader) => {
                        return (h("tr", null, h("td", { class: "column-label" }, tableHeader.label), h("td", { class: `
                              ${tableHeader.editable ? 'editable' : ''}
                              ${tableHeader.hasLink ? 'ibta-td-has-link' : ''}
                              ${tableHeader.hasTag ? `tagged ${item[`${tableHeader.label}_tagClass`] ? item[`${tableHeader.label}_tagClass`] : item[tableHeader.label]}` : ''}` }, item[tableHeader.label] ?
                            h("div", null, !this.rowActions.length && item['RowLink']
                                ? h("a", { href: item['RowLink'], class: "ibt-link" }, tableHeader.type === 'currency'
                                    ? `${this.currency
                                        ? this.currency
                                        : '$'}${item[tableHeader.label]}`
                                    : item[tableHeader.label])
                                : this.rowDataRenderer(item, tableHeader), tableHeader.editable && item.__editing_ins_base_table_item ?
                                this.renderField(item, tableHeader)
                                : '') :
                            h("span", null, "-"))));
                    })), this.rowActions ?
                        h("div", { class: "action-wrap" }, this.rowActions.map(rowAction => this.rowActionMapper(rowAction, item, '')))
                        : '')));
                }) : ''), this.loadingScreen /* || !this.tableData.length */ ?
                    h("div", { class: `loading-screen` }, h("ins-loader", { "image-source": this.loaderImageSource, "state-title": this.loaderTitle, "state-message": this.loaderMessage, "state-icon": this.loaderIcon }))
                    : ''), h("div", { key: 'f8db9832f3c8f5a7efffc2896ec9ac6faae8e5d8', class: `ibt-table-wrap__settings
            ${this.withoutPagination ? "no-pagination" : ""}` }, this.bulkActions.length ?
            h("div", { class: "ibt-table-action-container" }, h("ins-select", { "data-type": "bulk-action", disabled: !this.selectedRows.length, placeholder: "Bulk Actions", small: true, button: true }, this.bulkActions.map(action => {
                return (h("ins-select-option", { label: action, value: action, default: this.selectedBulkAction === action }));
            })), h("ins-button", { class: "insTableBulkButton", label: "Apply", size: "small", solid: true, disabled: !this.selectedRows.length })) : '', this.withoutPagination ? '' :
            h("div", { class: `pagination-wrap ${this.bulkActions.length ? '' : 'full'}` }, h("div", { class: "ibt-table-wrap__pagination" }, h("span", null, this.paginationText), h("select", { class: "ibt-table-wrap__pagination--option", onChange: (event) => this.pageSizeChangeHandler(event) }, this.pageSizeOptions ? this.pageSizeOptions.map((option) => h("option", { value: option, selected: this.pageSize == option }, option)) : '')), h("div", { class: "ibt-table-wrap__page" }, this.pageInfo), h("div", { class: "ibt-table-wrap__prev-next" }, h("button", { class: "first", onClick: () => this.pageNumberChangeHandler('first'), disabled: this.pageNumber === 1 }, h("i", { class: `icon-chevrons-left` })), h("button", { class: "prev", onClick: () => this.pageNumberChangeHandler('prev'), disabled: this.pageNumber === 1 }, h("i", { class: `icon-angle-left` })), this.renderPageNumbers().map(page => {
                return (h("button", { class: `page ${this.pageNumber === page ? 'active' : ''}`, onClick: () => this.pageNumberChangeHandler(page), disabled: this.pageNumber === page }, page));
            }), h("button", { class: "next", onClick: () => this.pageNumberChangeHandler('next'), disabled: (this.pageNumber * this.pageSize) >= this.totalCount }, h("i", { class: `icon-angle-right` })), h("button", { class: "last", onClick: () => this.pageNumberChangeHandler('last'), disabled: (this.pageNumber * this.pageSize) >= this.totalCount }, h("i", { class: `icon-chevrons-right` }))))))));
    }
    get insTableEl() { return getElement(this); }
    static get watchers() { return {
        "tableData": ["tableDataChangeHandler"],
        "bulkActions": ["bulkActionsChangeHandler"]
    }; }
};

export { InsTable as ins_table };

//# sourceMappingURL=ins-table.entry.js.map