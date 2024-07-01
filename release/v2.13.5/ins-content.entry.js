import { r as registerInstance, h } from './index-5ef45688.js';

const InsContent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    // insSidebarEl;
    // componentWillLoad(){
    //   this.insSidebarEl = document.querySelector('ins-sidebar');
    // }
    // mouseEnterHandler(){
    //   let insAdminEl = document.querySelector('ins-admin');
    //   let submenuWrapEls = document.querySelectorAll('ins-sidebar-item') as any;
    //   if (insAdminEl.className.includes('mini')){
    //     for (let i = 0; i < submenuWrapEls.length; ++i) {
    //       submenuWrapEls[i].hideSubMenu();
    //     }
    //   }
    // }
    // render() {
    //   return (
    //     <div class={`content ${this.insSidebarEl ? '' : 'no-sidebar'}`}
    //       onMouseEnter={() => this.mouseEnterHandler()}>
    //       <slot />
    //     </div>
    //   )
    // }
    render() {
        return (h("div", { key: '155a49942a46daeb247343a7e6b318a1e14997dc' }, h("slot", { key: '96bfd6f7582f2635eed9f0eb2098ea46bd293d53' })));
    }
};

export { InsContent as ins_content };

//# sourceMappingURL=ins-content.entry.js.map