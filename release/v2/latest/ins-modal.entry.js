import { r as registerInstance, a as createEvent, h, g as getElement } from './index-5ef45688.js';

const InsModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.insClose = createEvent(this, "insClose", 7);
        this.didLoad = createEvent(this, "didLoad", 7);
        this.hasLoad = undefined;
        this.withBackdrop = undefined;
        this.light = undefined;
        this.confirmation = undefined;
        this.heading = undefined;
        this.value = undefined;
        this.parentRender = undefined;
        this.childModal = undefined;
        this.noButton = false;
        this.buttonAlignment = "center";
        this.preventClickOutside = false;
        this.closeButtonLabel = 'CANCEL';
        this.closeButtonIcon = undefined;
        this.closeButtonColor = undefined;
        this.confirmButtonLabel = 'OK';
        this.confirmButtonIcon = undefined;
        this.confirmButtonColor = undefined;
        this.width = "80%";
        this.height = "80%";
        this.showModal = false;
    }
    componentDidLoad() {
        this.adjustPosition();
        this.didLoad.emit();
        if (this.hasLoad && window["Insites"]) {
            let func = window["Insites"].methods[this.hasLoad];
            if (func)
                func(this.insModalEl);
        }
    }
    componentDidUpdate() {
        this.adjustPosition();
    }
    openParentModal() {
        let parentModal = parent.document.getElementById(this.parentRender);
        parentModal.value = this.value;
        parentModal.light = this.light;
        parentModal.width = this.width;
        parentModal.height = this.height;
        parentModal.heading = this.heading;
        parentModal.noButton = this.noButton;
        parentModal.buttonAlignment = this.buttonAlignment;
        parentModal.withBackdrop = this.withBackdrop;
        parentModal.confirmation = this.confirmation;
        parentModal.closeButtonColor = this.closeButtonColor;
        parentModal.closeButtonLabel = this.closeButtonLabel;
        parentModal.closeButtonIcon = this.closeButtonIcon;
        parentModal.confirmButtonColor = this.confirmButtonColor;
        parentModal.confirmButtonLabel = this.confirmButtonLabel;
        parentModal.confirmButtonIcon = this.confirmButtonIcon;
        parentModal.preventClickOutside = this.preventClickOutside;
        parentModal.childModal = this.insModalEl;
        let parentModalBody = parentModal.querySelector('.ins-modal-body');
        let body = this.insModalEl.querySelector('.ins-modal-body');
        let insEls = body.querySelectorAll('.hydrated');
        for (let i = 0; i < insEls.length; i++) {
            if (insEls[i].nodeName.includes('INS-')) {
                insEls[i].innerHTML = "";
                insEls[i].classList.remove('hydrated');
            }
        }
        parentModalBody.innerHTML = body.innerHTML;
        body.addEventListener('DOMSubtreeModified', () => {
            parentModalBody.innerHTML = body.innerHTML;
        });
        parentModal.open();
    }
    adjustPosition() {
        let insCard = this.insModalEl.querySelector('ins-card');
        insCard.style.width = this.width;
        insCard.style.height = this.height;
        let insCardWrap = insCard.querySelector('.ins-card-wrap');
        let adjust = insCardWrap.clientWidth / 2 + 1;
        insCardWrap.parentElement.style.left = `calc(50% - ${adjust}px)`;
    }
    closeConfirmModal(type) {
        this.insClose.emit({
            action: type,
            value: this.value
        });
        this.showModal = false;
        if (this.childModal) {
            this.childModal.parentClosed(type);
        }
    }
    async parentClosed(type) {
        this.closeConfirmModal(type);
    }
    async open() {
        this.parentRender && (parent.document !== document)
            ? this.openParentModal()
            : this.showModal = true;
    }
    async close() {
        this.parentRender && (parent.document !== document)
            ? this.closeParentModal()
            : this.showModal = false;
    }
    closeParentModal() {
        let parentModal = parent.document.getElementById(this.parentRender);
        parentModal.close();
    }
    clickOutsideHandler(e) {
        if (this.preventClickOutside)
            return;
        let insModalWrap = this.insModalEl.querySelector('.ins-modal-wrap');
        let insModalBackdrop = this.insModalEl.querySelector('.ins-backdrop-wrap');
        if (e.target === insModalWrap || e.target === insModalBackdrop) {
            this.closeConfirmModal('clicked-outside');
        }
    }
    render() {
        return (h("div", { key: '81ec327c45f86913d565338ff6c3a1991ee710de', class: `ins-modal-wrap ${this.height === 'auto' ? 'auto' : ''}
        ${this.showModal ? 'show-modal' : ''} ${this.light ? 'light' : ''}
        ${this.noButton ? 'no-button' : ''}`, onClick: e => this.clickOutsideHandler(e) }, this.withBackdrop ? h("ins-backdrop", { light: this.light }) : '', h("ins-card", { key: '63e00dd2dfc80782caefa290f97267bac0d2f2f4', steady: true, "no-padding": true }, h("div", { key: '7ff9d644522c5ed7d8eaea653c503d72ae37b0c1', class: "ins-modal-content" }, h("div", { key: '7c2ab7dfcc61f6545e9f62894e3fcca6001f1633', class: `ins-modal-head ${!this.heading ? 'no-heading' : ''}` }, h("h1", { key: '5e07b60cc1537871fae5e45d047bb6f7be8e86af' }, this.heading), h("span", { key: '816bf3fe9a5c6c083a9325a6eacc58d768328fae', class: "icon-close-1", onClick: () => this.closeConfirmModal('canceled') })), h("div", { key: 'e58ad9c13aa70ad258b57aa38c4a1a6ce3c4f379', class: `ins-modal-body ${this.parentRender ? 'hide-body' : ''}` }, h("slot", { key: '0194c62d68d0335dccf4cafe27279786ed8fb909' })), this.noButton ? "" :
            h("div", { class: `ins-modal-button-wrap text-${this.buttonAlignment}` }, this.confirmation ?
                h("ins-button", { label: this.closeButtonLabel, icon: this.closeButtonIcon, color: this.closeButtonColor, outlined: true, onClick: () => this.closeConfirmModal('canceled') }) : '', h("ins-button", { label: this.confirmButtonLabel, icon: this.confirmButtonIcon, color: this.confirmButtonColor, solid: true, onClick: () => this.closeConfirmModal(this.confirmation ? 'confirmed' : 'canceled') }))))));
    }
    get insModalEl() { return getElement(this); }
};

export { InsModal as ins_modal };

//# sourceMappingURL=ins-modal.entry.js.map