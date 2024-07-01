import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsCheckboxCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClick = createEvent(this, "insClick", 7);
        this.insValueChange = createEvent(this, "insValueChange", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.noPadding = undefined;
        this.tabOrder = '0';
        this.selected = undefined;
        this.disabled = undefined;
        this.selectedColor = "#1e86e3";
        this.value = undefined;
        this.label = undefined;
        this.name = undefined;
    }
    addColorStyles() {
        let insCardWrap = this.insCheckboxCardEl.querySelector('.ins-checkbox-card-wrap');
        if (this.selected && this.selectedColor[0] === '#') {
            if (insCardWrap) {
                insCardWrap.setAttribute('style', `border-color:${this.selectedColor}`);
                let selectedWrap = insCardWrap.querySelector('.selected-wrap');
                selectedWrap.setAttribute('style', `background-color:${this.selectedColor}`);
            }
        }
        else {
            insCardWrap.removeAttribute('style');
        }
    }
    insClickHandler() {
        this.insClick.emit({
            label: this.label,
            value: this.value
        });
        this.insValueChange.emit(this.value);
    }
    keyPressHandler(e) {
        if (e.keyCode === 13) {
            this.insClickHandler();
        }
    }
    componentDidLoad() {
        this.addColorStyles();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insCheckboxCardEl);
        }
    }
    componentDidUpdate() {
        this.addColorStyles();
    }
    async setValue(value) {
        this.value = value;
        this.insValueChange.emit(this.value);
    }
    async getValue() {
        return this.value;
    }
    render() {
        return (h("div", { key: '73cafeb413fa39acf19aaa62e580e206ccd3520d', class: `ins-checkbox-card-wrap
        ${this.noPadding ? 'no-padding' : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.selected ? 'selected' : ''}
        ${this.selectedColor ? this.selectedColor : ''}`, tabindex: this.tabOrder, onClick: () => this.insClickHandler(), onKeyPress: e => this.keyPressHandler(e) }, this.selected ? h("div", { class: "icon-check-2 selected-wrap" }) : '', h("slot", { key: '1495862e6366f0b73c261fc2a71b4cddd0631089' }), h("input", { key: '10e27ae872f4904f83db026097eb7c60e519f336', type: "checkbox", class: "ins-checkbox-card-input", name: this.name, value: this.value })));
    }
    get insCheckboxCardEl() { return getElement(this); }
};

export { InsCheckboxCard as ins_checkbox_card };

//# sourceMappingURL=ins-checkbox-card.entry.js.map