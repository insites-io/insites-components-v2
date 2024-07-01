import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClick = createEvent(this, "insClick", 7);
        this.insClickOption = createEvent(this, "insClickOption", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.buttonOptions = [];
        this.hasLoad = undefined;
        this.color = 'blue';
        this.label = 'BUTTON';
        this.icon = '';
        this.iconRight = '';
        this.size = 'normal';
        this.data = '';
        this.type = '';
        this.options = '';
        this.dropdown = false;
        this.solid = false;
        this.outlined = false;
        this.disabled = false;
        this.cursor = '';
        this.textTransform = '';
        this.loading = false;
        this.toggleOption = false;
        this.dropUp = false;
    }
    btnOnClickHandler(e, target) {
        if (e && target)
            this.rippleHandler(e, target);
        if (this.dropdown && this.buttonOptions.length) {
            this.toggleOptions();
        }
        else {
            this.toggleOption = false;
            this.insClick.emit({
                label: this.label,
                data: this.data
            });
        }
    }
    optionOnClickHandler(option) {
        this.toggleOption = false;
        this.insClickOption.emit({
            label: this.label, option
        });
    }
    addRippleEffect(startingPoint, target) {
        let rect = target.getBoundingClientRect();
        let ripple = target.querySelector('.ripple-wave');
        if (!ripple) {
            ripple = document.createElement('span');
            ripple.className = 'ripple-wave';
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
            target.appendChild(ripple);
        }
        ripple.classList.remove('show');
        let top = startingPoint.pageY - (rect.top + window.scrollY) - ripple.offsetHeight / 2;
        let left = startingPoint.pageX - rect.left - ripple.offsetWidth / 2;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        ripple.classList.add('show');
        setTimeout(() => {
            if (target.contains(ripple)) {
                target.removeChild(ripple);
            }
        }, 1250);
        return false;
    }
    componentWillLoad() {
        this.checkOptions();
    }
    componentDidLoad() {
        this.checkTarget();
        this.closeMenu();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insButtonEl);
        }
    }
    componentWillUpdate() {
        this.checkOptions();
    }
    componentDidUpdate() {
        this.checkTarget();
    }
    rippleHandler(e, target) {
        if (!this.disabled && !this.loading) {
            if (!target)
                this.checkTarget();
            this.addRippleEffect(e, target);
        }
    }
    checkTarget() {
        this.target = this.insButtonEl.querySelector('button');
        if (this.options) {
            this.target = this.insButtonEl.querySelector('.ins-button-options-wrap');
        }
    }
    checkOptions() {
        if (this.options)
            this.buttonOptions = this.options.split(',');
    }
    toggleOptions() {
        if (!this.disabled) {
            this.dropUp = false;
            let pos = this.insButtonEl.getBoundingClientRect();
            if ((window.innerHeight - pos.bottom) < 90) {
                this.dropUp = true;
            }
            this.toggleOption = !this.toggleOption;
        }
    }
    closeMenu() {
        window.addEventListener('click', event => {
            let clickedEl = event.target;
            let closestEl = clickedEl.closest('ins-button');
            if (closestEl !== this.insButtonEl) {
                if (this.toggleOption) {
                    this.toggleOption = false;
                }
            }
        });
    }
    renderLabelIcon() {
        return (h("div", null, this.icon
            ? h("i", { class: `btn__icon ${this.icon}
              ${this.label == '' ? 'action' : ''}` })
            : '', h("span", { class: `btn__label ${this.icon ? 'v-align' : ''}` }, this.label), this.iconRight
            ? h("i", { class: `btn__icon right ${this.iconRight}` })
            : ''));
    }
    render() {
        if (this.options) {
            return (h("div", { class: "ins-button-options-wrap", onClick: e => this.rippleHandler(e, this.target) }, h("div", { class: "button-wrap" }, h("button", { type: this.type, disabled: this.disabled || this.loading ? true : false, onClick: () => this.btnOnClickHandler(), class: `ins-button ${this.disabled || this.loading ? '' : 'ripple'}
                ${this.loading ? 'is-loading' : ''}
                ${this.size ? 'size--' + this.size : ''}
                ${this.solid || this.loading ? 'solid' : ''}
                ${this.outlined || (this.options && !this.solid) ? 'outlined' : ''}
                ${this.cursor ? 'cursor--' + this.cursor : ''}
                ${this.textTransform ? 'text-transform--' + this.textTransform : ''}
                ${this.color}
                ${this.label == '' && this.icon && !this.iconRight ? 'round' : ''}
                ${this.buttonOptions.length ? 'has-options' : ''}` }, this.loading
                ? h("div", { class: `spinner ${this.solid ? '' : this.color}` })
                : this.renderLabelIcon()), this.buttonOptions.length
                ? h("i", { class: `carets ${this.color}
                  icon-caret-${this.toggleOption ? 'up' : 'down'}
                  ${this.loading ? 'loading' : ''}
                  ${this.solid || this.loading ? 'solid' : ''}`, onClick: () => this.toggleOptions() })
                : ''), h("div", { class: ` options-wrap

            ${this.dropUp ? 'drop-up' : ''}
            ${this.toggleOption ? 'show' : 'hide'}` }, h("ul", { class: `option-wrap` }, this.buttonOptions.map(option => {
                return (h("li", { class: `option
                    ${this.color}
                    ${this.solid ? 'solid' : ''}
                    ${this.outlined ? 'outlined' : ''}`, onClick: () => this.optionOnClickHandler(option) }, option));
            })))));
        }
        else {
            return (h("button", { type: this.type, disabled: this.disabled || this.loading ? true : false, onClick: e => this.btnOnClickHandler(e, this.target), class: `ins-button ${this.disabled || this.loading ? '' : 'ripple'}
            ${this.loading ? 'is-loading' : ''}
            ${this.size ? 'size--' + this.size : ''}
            ${this.solid || this.loading ? 'solid' : ''}
            ${this.outlined ? 'outlined' : ''}
            ${this.cursor ? 'cursor--' + this.cursor : ''}
            ${this.textTransform ? 'text-transform--' + this.textTransform : ''}
            ${this.color}
            ${this.label == '' && this.icon && !this.iconRight ? 'round' : ''}` }, this.loading
                ? h("div", { class: `spinner ${this.solid ? '' : this.color}` })
                : this.renderLabelIcon()));
        }
    }
    get insButtonEl() { return getElement(this); }
};

export { InsButton as ins_button };

//# sourceMappingURL=ins-button.entry.js.map