import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const insButtonSelectCss = ":root{--ins-color-ink:#2c3148;--ins-color-ink40:#8c94a4;--ins-color-ink10:#E4E6EC;--ins-color-ink5:#f2f4f8;--ins-color-ink1:#ffffff;--ins-color-white:#fff;--ins-color-blue:#1e86e3;--ins-color-blue2:#1A78CB;--ins-color-blue-20p:#CEE2F6;--ins-color-blue-10p:#e8f3fc;--ins-color-green:#24be8d;--ins-color-green2:#20AA7E;--ins-color-green-10p:#E9F8F4;--ins-color-orange:#ffa639;--ins-color-orange2:#ff9b20;--ins-color-orange-10p:#FFF6EB;--ins-color-red:#f27474;--ins-color-red2:#f05d5d;--ins-color-red-10p:#F8EDEE;--ins-color-pink:#ff3366;--ins-color-pink2:#ff1a53;--ins-color-pink-10p:#FEEBF0;--ins-color-yellow:#fdd835;--ins-color-yellow2:#fdd31c;--ins-color-yellow-10p:#FFFBEB;--ins-color-turquoise:#2bbad9;--ins-color-turquoise2:#24aac7;--ins-color-turquoise-10p:#EAF8FB;--ins-color-purple:#694FCD;--ins-color-fushcia:#C65BBB;--ins-color-grey:#e4e6ec;--ins-color-grey2:#d5d8e1;--ins-color-grey-10p:#edeef2;--ins-color-primary:#1e86e3;--ins-color-success:#24be8d;--ins-color-warning:#ffa639;--ins-color-negative:#f27474;--ins-color-information1:#ff3366;--ins-color-information2:#fdd835;--ins-color-table-odd:#FFF;--ins-color-table-even:#FAFBFC;--ins-color-disabled_readonly_bg:#FAFBFC;--ins-bg-color:#ffffff;--ins-bg-color2:#E4E6EC;--ins-bg-color3:#8c94a4;--ins-bg-color4:#f2f4f8;--ins-bg-color5:#FAFBFC;--ins-border-radius:4px;--ins-border-thickness:1px;--ins-border-style:solid;--ins-border-color:#E4E6EC;--ins-shadow-x:1px;--ins-shadow-y:1px;--ins-shadow-blur:3px;--ins-shadow-color:#E4E6EC;--ins-font-family:\"Open Sans\", sans-serif}.ins-button-select .ins-select-search{display:none;position:relative}.ins-button-select .ins-select-search .ins-select-search-input{border:var(--ins-border-style) var(--ins-border-thickness) var(--ins-border-color);padding:10px 12px;width:100%;padding:11px 10px;box-shadow:none;box-sizing:border-box;border-radius:var(--ins-border-radius);font-size:0.875rem;background:var(--ins-bg-color);color:var(--ins-color-ink);outline:none}.ins-button-select .ins-select-search .icon-search{position:absolute;right:24px;top:calc(50% - 8px);color:var(--ins-color-ink40)}.ins-button-select.ins-select-wrap.buttonise .ins-select-value-wrap{padding:0}.ins-button-select.ins-select-wrap.buttonise .ins-select-options-wrap{min-width:240px}.ins-button-select.ins-select-wrap.buttonise .ins-select-label-wrap i.icon-caret-down{width:6px}.ins-button-select.ins-select-wrap.buttonise .ins-select-label-wrap span{padding-right:14px}.ins-button-select.ins-select-wrap.buttonise .multiple.has-value .label-of-value{display:none}.ins-button-select.ins-select-wrap.buttonise .multiple.has-value .ins-select-label-wrap{padding-right:20px}.ins-button-select.ins-select-wrap.buttonise .multiple.has-value .ins-select-label-wrap .item-label{padding-right:0}.ins-button-select.ins-select-wrap.buttonise .no-result-text{margin-top:0}.ins-button-select.ins-select-wrap.buttonise .spinner{border-left:3px solid transparent;height:13px;width:13px}.ins-button-select.ins-select-wrap.buttonise .spinner:after{height:13px;width:13px}.ins-button-select.ins-select-wrap.buttonise .multiple-item-wrap{display:inline-block;background-color:#c5cad4;border-radius:var(--ins-border-radius);margin:0 4px;font-size:14px;position:relative;padding-right:20px;padding-left:0;color:var(--ins-color-ink)}.ins-button-select.ins-select-wrap.buttonise .multiple-item-wrap .icon-close{font-size:7px;margin-left:10px;position:absolute;color:var(--ins-color-ink);padding:4px;top:calc(50% - 8px);right:2px;cursor:pointer}.ins-button-select.ins-select-wrap.buttonise.initializing .icon-caret-down{display:none}.ins-button-select.ins-select-wrap.buttonise.initializing .main-spinner-wrap{right:22px;top:-1px}.ins-button-select.ins-select-wrap.buttonise.small .ins-select-label-wrap,.ins-button-select.ins-select-wrap.buttonise.small .ins-select-label-wrap span,.ins-button-select.ins-select-wrap.buttonise.small .ins-select-value-wrap{font-size:0.625rem}.ins-button-select.ins-select-wrap.buttonise.small .ins-select-option-wrap{font-size:0.75rem}.ins-button-select.ins-select-wrap .ins-select-value-wrap i.icon-caret-down{top:12px}.ins-button-select.ins-select-wrap .ins-select-value-wrap .ins-select-value-input{display:block;cursor:pointer}.ins-button-select.ins-select-wrap .multiple-item{padding:2px 4px}.ins-button-select.ins-select-wrap.activated .ins-select-value-input{display:none}.ins-button-select.ins-select-wrap.activated .ins-select-value-input.has-value{display:block}.ins-button-select.ins-select-wrap.activated .ins-select-value-wrap.multiple .ins-select-value-input{display:none}.ins-button-select.ins-select-wrap.activated.drop-up:not(.no-options) .ins-select-options-wrap,.ins-button-select.ins-select-wrap.activated.drop-up .ins-select-options-wrap{border-top:1px solid var(--ins-color-blue);bottom:calc(100% - 20px);border-bottom:none}.ins-button-select.ins-select-wrap.activated.drop-up:not(.no-options) .dynamic-option-wrap,.ins-button-select.ins-select-wrap.activated.drop-up .dynamic-option-wrap{border-bottom:1px solid #e4e6ec}.ins-button-select.ins-select-wrap.activated.drop-up:not(.no-options).no-options .ins-select-options-wrap,.ins-button-select.ins-select-wrap.activated.drop-up.no-options .ins-select-options-wrap{border-radius:4px 4px 0px 0px}.ins-button-select.ins-select-wrap .main-spinner-wrap{right:28px;top:21px}.ins-button-select.ins-select-wrap .spinner-wrap{height:38px}.ins-button-select.ins-select-wrap.initializing .icon-caret-down{display:none}.ins-button-select.ins-select-wrap .ins-select-options-wrap.searching .ins-select-slot-wrap{display:none}.ins-button-select.ins-select-wrap .scroll-wrap{max-height:215px}.ins-button-select .no-result .ins-select-slot-wrap ins-button-select-group{display:none}.ins-button-select.activated .ins-select-search{display:block}";

const InsButtonSelect = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insChange = createEvent(this, "insChange", 7);
        this.insOptionSelect = createEvent(this, "insOptionSelect", 7);
        this.insDynamicSubmit = createEvent(this, "insDynamicSubmit", 7);
        this.insSearch = createEvent(this, "insSearch", 7);
        this.insLoadMore = createEvent(this, "insLoadMore", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.activated = false;
        this.options = [];
        this.labelOfValue = "";
        this.tempSearch = "";
        this.loading = false;
        this.searching = false;
        this.scrollHandler = () => {
            let target = this.scrollWrapEl.scrollHeight - 200;
            let pos = this.scrollWrapEl.scrollTop + this.scrollWrapEl.clientHeight;
            if (pos >= target && !this.loading) {
                this.insLoadMore.emit();
                this.loading = true;
                this.setLoadingState(true);
                this.disableNoResult();
            }
        };
        this.hasLoad = undefined;
        this.name = undefined;
        this.label = undefined;
        this.value = undefined;
        this.placeholder = "";
        this.disabled = false;
        this.readonly = false;
        this.hasError = false;
        this.errorMessage = "";
        this.blankLabel = false;
        this.labelKey = "";
        this.valueKey = "";
        this.optionsData = [];
        this.small = false;
        this.multiple = false;
        this.searchable = false;
        this.searchablePlaceholder = "Search options";
        this.dynamicOption = false;
        this.dynamicHasError = false;
        this.dynamicErrorMessage = "";
        this.dynamicPlaceholder = undefined;
        this.dynamicButtonLabel = "Add";
        this.dynamicValue = "";
        this.lookup = false;
        this.lookupLoading = false;
        this.lookupScrolling = false;
        this.dropUp = false;
        this.selectedValues = [];
    }
    async setValue(value) {
        if (!this.options.length)
            return false;
        if (this.multiple) {
            this.setMultipleValue(value);
        }
        else {
            this.setSelected(value);
        }
    }
    async resetValue() {
        this.loopThroughOptions(option => {
            if (this.multiple) {
                this.value = [];
            }
            else {
                this.value = "";
            }
            this.labelOfValue = "";
            option.activated = false;
            this.deactivateOption(option);
            this.showOption(option);
            this.checkForOptions();
        }, this.options);
    }
    async getValue() {
        if (this.multiple) {
            return this.value.map(el => {
                return el.value;
            });
        }
        else {
            return this.value;
        }
    }
    InsButtonSelectOptionClickedHandler(event) {
        let clickedOption = event.target;
        if (this.multiple)
            this.multipleInputHandler(clickedOption);
        else {
            this.singleInputHandler(clickedOption, event.detail);
        }
    }
    setMultipleValue(val) {
        let values = [], selections = [];
        val = this.isArray(val, true);
        this.loopThroughOptions(option => {
            option.activated = false;
            this.deactivateOption(option);
            if (val.includes(option.value)) {
                option.activated = true;
                this.activateOption(option);
                values.push(option.value);
                selections.push(option);
            }
        }, this.options);
        this.value = selections;
        this.selectedValues = values;
    }
    multipleInputHandler(clickedOption) {
        let checkSelections = this.value.find(el => {
            return el === clickedOption;
        });
        if (!checkSelections) {
            clickedOption.activated = true;
            this.value.push(clickedOption);
            this.emitEvent('add');
        }
    }
    initLookupScrolling() {
        let action = this.lookupScrolling ? "add" : "remove";
        this.scrollWrapEl = this.searchEl(".scroll-wrap");
        this.scrollWrapEl[`${action}EventListener`]('scroll', this.scrollHandler);
    }
    async setLoadingState(state) {
        this.loading = state;
        if (this.optionsWrapEl) {
            this.optionsWrapEl.classList[state ? 'add' : 'remove']('loading');
        }
        else
            return false;
    }
    singleInputHandler(clickedOption, e) {
        this.loopThroughOptions(option => {
            option.activated = false;
            option.showOption();
        });
        clickedOption.activated = true;
        if (this.searchable) {
            this.resetSearch();
        }
        this.closeOptions();
        this.showHiddenOptions();
        this.labelOfValue = e.label;
        this.insChange.emit(e.value);
        this.value = e.value;
    }
    showHiddenOptions() {
        this.optionsWrapEl.classList.remove('no-result');
        this.loopThroughOptions(option => {
            this.showOption(option);
        }, this.options);
    }
    loopThroughOptions(cb, opts) {
        let options = opts || this.insButtonSelectEl.querySelectorAll('ins-button-select-option');
        for (let i = 0; i < options.length; i++) {
            if (cb(options[i]))
                break;
        }
    }
    expandSection() {
        if (!this.readonly && !this.disabled && !this.lookupLoading && !this.activated) {
            this.checkDropUp();
            this.activated = true;
            this.mainWrapEl.classList.add("activated");
            if (this.searchable) {
                this.inputSearchEl.focus();
            }
        }
    }
    searchEl(selector) {
        return this.insButtonSelectEl.querySelector(selector);
    }
    resetSearch() {
        this.inputSearchEl.value = "";
        this.staticSearch("");
    }
    bindEls() {
        this.mainWrapEl = this.searchEl('.ins-select-wrap');
        // this.inputValueEl = this.searchEl('.ins-select-value-input');
        this.optionsWrapEl = this.searchEl('.ins-select-options-wrap');
        if (this.searchable) {
            this.inputSearchEl = this.searchEl('.ins-select-search-input');
        }
    }
    async getAllOptions() {
        return this.insButtonSelectEl.querySelectorAll('ins-button-select-option');
    }
    async initOptions() {
        let options = this.insButtonSelectEl.querySelectorAll('ins-button-select-option');
        this.loopThroughOptions(option => {
            this.options.push({
                el: option,
                label: option.label,
                value: option.value,
                activated: false,
                hidden: false
            });
        }, options);
        this.checkForOptions();
    }
    async checkForOptions() {
        if (!this.options.length) {
            this.mainWrapEl.classList.add("no-options");
            return false;
        }
        let hasOption = false;
        this.loopThroughOptions(option => {
            if (!option.el.activated && !option.el.hidden) {
                hasOption = true;
                return true;
            }
        }, this.options);
        let action = hasOption ? "remove" : "add";
        this.mainWrapEl.classList[action]("no-options");
        return hasOption;
    }
    initOutsideClick() {
        window.addEventListener('click', event => {
            let clickedEl = event.target;
            let closestEl = clickedEl.closest('ins-button-select');
            if (closestEl !== this.insButtonSelectEl) {
                if (this.activated) {
                    this.closeOptions();
                }
            }
        });
    }
    initSearchInput() {
        if (this.searchable && this.inputSearchEl) {
            this.inputSearchEl.addEventListener('keyup', e => {
                this.searchOptions(e);
            });
        }
    }
    initDynamicOption() {
        if (!this.dynamicOption)
            return false;
        this.dynamicInputEl = this.searchEl('input[data-dynamic]');
    }
    async disableNoResult() {
        if (this.optionsWrapEl) {
            this.optionsWrapEl.classList.remove('no-result');
        }
        else
            return false;
    }
    searchOptions(event) {
        let keyword = event.target.value;
        this.tempSearch = keyword;
        this.disableNoResult();
        if (!this.activated)
            this.expandSection();
        if (this.lookup) {
            this.lookupHandler(keyword, event);
        }
        else
            this.staticSearch(keyword);
    }
    lookupHandler(keyword, event) {
        if (event.which === 13 && !this.searching && !this.loading) {
            this.setSearchingState(true);
            this.disableNoResult();
            this.insSearch.emit(keyword);
        }
        else if (!this.searching && !this.loading) {
            this.staticSearch(keyword);
        }
    }
    async setSearchingState(state) {
        this.searching = state;
        // this.inputValueEl.readonly = state;
        if (this.optionsWrapEl) {
            this.optionsWrapEl.classList[state ? 'add' : 'remove']('searching');
        }
        else
            return false;
    }
    staticSearch(keyword) {
        if (!keyword) {
            this.showHiddenOptions();
            return this.checkForOptions();
        }
        let hasResult = false;
        this.loopThroughOptions(option => {
            this.hideOption(option);
            let result = option.label.toLowerCase().indexOf(keyword.toLowerCase());
            if (result >= 0 && option.value !== this.value) {
                this.showOption(option);
                hasResult = true;
            }
        }, this.options);
        if (!hasResult)
            this.enableNoResult();
        else
            this.checkForOptions();
    }
    async enableNoResult() {
        if (this.optionsWrapEl) {
            this.optionsWrapEl.classList.add('no-result');
        }
        else
            return false;
    }
    renderCaret() {
        return (h("i", { class: "icon-caret-down" }));
    }
    renderOptionsWrap() {
        return (h("div", { class: `ins-select-options-wrap
                ${this.dynamicOption ? 'with-dynamic-option' : ''}` }, this.renderSearchWrapForButtonized(), h("div", { class: "scroll-wrap" }, h("div", { class: "no-result-text" }, "No result found"), h("div", { class: "no-more-options" }, "No options available"), h("div", { class: "ins-select-slot-wrap" }, h("slot", null), this.labelKey && this.valueKey
            ? this.optionsData.map(option => {
                return (h("ins-button-select-option", { label: option[this.labelKey], value: option[this.valueKey] }));
            })
            : ''), h("div", { class: "spinner-wrap" }, h("div", { class: "spinner" }))), this.renderDynamicOptionWrap()));
    }
    renderSearchWrapForButtonized() {
        if (this.searchable) {
            return (h("div", { class: "ins-select-options-searchbar ins-select-search" }, h("input", { class: "ins-select-search-input", value: this.tempSearch, readonly: this.readonly, disabled: this.disabled, placeholder: this.searchablePlaceholder }), h("i", { class: "icon-search" })));
        }
        return "";
    }
    renderDynamicOptionWrap() {
        if (!this.dynamicOption)
            return "";
        return (h("div", { class: "dynamic-option-wrap" }, h("div", { class: "dynamic-option-input-wrap" }, h("input", { class: this.dynamicHasError ? "invalid" : "", onKeyUp: e => this.keyUpDynamicInput(e), placeholder: this.dynamicPlaceholder, "data-dynamic": true }), this.dynamicHasError ?
            h("div", { class: "error-message" }, this.dynamicErrorMessage)
            : ""), h("button", { type: "button", onClick: e => this.dynamicOptionHandler(e) }, this.dynamicButtonLabel)));
    }
    async dynamicCloseOptions() {
        this.dynamicInputEl.value = "";
        this.dynamicHasError = false;
        this.closeOptions();
    }
    async dynamicUpdateOptions() {
        this.initOptions();
    }
    keyUpDynamicInput(e) {
        this.dynamicValue = e.target.value;
    }
    dynamicOptionHandler(e) {
        e.stopPropagation();
        this.insDynamicSubmit.emit(this.dynamicInputEl.value);
    }
    renderValueWrap() {
        if (this.multiple)
            return this.renderMultipleValueWrap();
        else {
            return this.renderSingleValueWrap();
        }
    }
    renderMultipleValueWrap() {
        return (h("div", { class: `multiple
                ${this.value.length ? "has-value" : ""}`, onClick: () => this.expandSection() }, h("div", { class: `ins-select-label-wrap  ${!this.disabled ? 'ripple' : ''}`, onClick: () => this.expandSection() }, this.label, " :", h("span", { class: "label-of-value" }, this.labelOfValue ? this.labelOfValue : this.placeholder), this.renderSelections(), this.renderCaret())));
    }
    renderSelections() {
        if (!this.value.length && this.searchable)
            return "";
        if (this.value.length)
            return (this.value.map(item => this.renderItem(item)));
        // return (
        //     <div class="multiple-placeholder">
        //         { this.placeholder ? this.placeholder : "Select" }
        //     </div>
        // )
    }
    renderItem(item) {
        return (h("div", { class: "multiple-item-wrap" }, h("span", { class: "item-label" }, item.label), h("span", { class: "icon-close", onClick: () => this.removeItem(item) })));
    }
    removeItem(option) {
        if (!this.disabled && !this.readonly) {
            let i = this.value.findIndex(el => {
                return el === option;
            });
            if (i > -1) {
                this.value[i].activated = false;
                this.value[i].el ? this.value[i].el.deactivate() : this.value[i].deactivate();
                this.value.splice(i, 1);
                this.emitEvent('remove');
            }
        }
    }
    emitEvent(type) {
        if (this.multiple) {
            this.emitForMultiple(type);
        }
        else
            this.insChange.emit(this.value);
    }
    emitForMultiple(event_type) {
        let selected = this.value.map(item => item.value);
        let selectedOptions = this.value.map(item => {
            return {
                label: item.label,
                value: item.value
            };
        });
        this.insOptionSelect.emit({
            event_type, selected, selectedOptions
        });
        this.insChange.emit(selected);
        this.selectedValues = selected;
    }
    renderSingleValueWrap() {
        return (h("div", { class: `ins-select-label-wrap  ${!this.disabled ? 'ripple' : ''}`, onClick: () => this.expandSection() }, this.label, ":", h("span", null, this.blankLabel && !this.value ? "" : this.labelOfValue ? this.labelOfValue : this.placeholder), this.renderCaret()));
    }
    renderHiddenFields() {
        return (h("input", { type: "hidden", name: this.name, value: this.value }));
    }
    renderErrorWrap() {
        if (!this.hasError)
            return "";
        return (h("div", { class: "ins-form-error" }, this.errorMessage));
    }
    activateOption(option) {
        option.el.activated = true;
    }
    deactivateOption(option) {
        option.el.activated = false;
    }
    hideOption(option) {
        option.el.hidden = true;
    }
    showOption(option) {
        option.el.hidden = false;
    }
    setSelected(value) {
        this.loopThroughOptions(option => {
            option.activated = false;
            if (value === option.value) {
                this.value = option.value;
                this.labelOfValue = this.blankLabel && !option.value ? "" : option.label;
                this.activateOption(option);
                // this.updateValueEls(option);
                this.checkForOptions();
            }
        }, this.options);
    }
    // updateValueEls(option){
    //     this.inputValueEl.value = this.labelOfValue = this.blankLabel && !option.value ? "" : option.label;
    // }
    isArray(value, isObject = false) {
        try {
            if (isObject) {
                if (value.length !== undefined) {
                    return value;
                }
                else {
                    return [];
                }
            }
            else {
                if (JSON.parse(value).length !== undefined) {
                    return JSON.parse(value);
                }
                else {
                    return [];
                }
            }
        }
        catch (err) {
            return [];
        }
    }
    checkDropUp() {
        let pos = this.insButtonSelectEl.getBoundingClientRect();
        let height = 65;
        if (this.value)
            height = height + 45;
        if (this.options.length) {
            let len = 0;
            this.options.map(item => {
                if (!item.el.activated)
                    len++;
            });
            len = len > 3 ? 3 : !len ? 1 : len;
            height = height + (len * 45);
        }
        this.dropUp = (window.innerHeight - pos.bottom) < height;
    }
    componentWillLoad() {
        if (this.multiple && !this.value) {
            this.value = [];
        }
        else if (typeof this.value === 'string' && this.multiple) {
            this.value = this.isArray(this.value);
        }
        if (!this.placeholder && this.searchable) {
            this.placeholder = "Please select or type to search for an option";
        }
    }
    componentDidLoad() {
        this.bindEls();
        this.initOutsideClick();
        this.initSearchInput();
        this.initDynamicOption();
        this.initLookupScrolling();
        this.initOptions();
        this.setValue(this.value);
        this.didLoad.emit();
        this.checkDropUp();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insButtonSelectEl);
        }
    }
    componentDidUpdate() {
        this.bindEls();
        this.initSearchInput();
        this.initDynamicOption();
        this.initLookupScrolling();
        this.checkForOptions();
    }
    async closeOptions() {
        this.activated = false;
        this.mainWrapEl.classList.remove("activated");
    }
    render() {
        return (h("div", { key: 'e1b742d76eddd4d3c92c405d5dae10e265e0ad5f', class: `ins-button-select ins-select-wrap buttonise
                ${this.dropUp ? 'drop-up' : ''}
                ${this.readonly ? 'readonly' : ''}
                ${this.disabled ? 'disabled' : ''}
                ${this.hasError ? 'is-invalid' : ''}
                ${this.lookupLoading ? 'initializing' : ''}
                ${this.small ? 'small' : ''}` }, this.renderHiddenFields(), this.renderValueWrap(), this.renderErrorWrap(), this.renderOptionsWrap(), h("div", { key: '44e0ba3bcda9286a9285dc5bfbd3c73dad209a82', class: "main-spinner-wrap" }, h("div", { key: 'b376c327bc409c872d7648f87200fbe974ad944d', class: "spinner" }))));
    }
    get insButtonSelectEl() { return getElement(this); }
};
InsButtonSelect.style = insButtonSelectCss;

export { InsButtonSelect as ins_button_select };

//# sourceMappingURL=ins-button-select.entry.js.map