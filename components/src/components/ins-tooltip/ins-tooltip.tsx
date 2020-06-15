import { h, Component, Prop, Event, EventEmitter, Element } from '@stencil/core';
import Tooltip from 'tooltip.js';

@Component({ tag: 'ins-tooltip' })

export class InsTooltip {
    @Element() insTooltipEl: HTMLElement;
    @Event() showTooltip: EventEmitter;
    @Prop({mutable: true}) label: string = "";
    @Prop({mutable: true}) shape: string = "circle"; // circle, rectangle
    @Prop({mutable: true}) icon: any = '';
    @Prop({mutable: true}) position: any = 'top'; // top, bottom, left, right (_-start, _-end)
    @Prop({mutable: true}) content: string = "";
    @Prop({mutable: true}) background: boolean = true;
    @Prop({mutable: true}) trigger: string = "hover focus"; // click, hover, focus
    @Prop({mutable: true}) html:boolean = false;
    @Prop({mutable: true}) closeOnClick: boolean = true;
    @Prop({mutable: true}) width: string = "";
    @Prop({mutable: true}) autoWidth: boolean = false;

    componentDidLoad() {
        let el = this.insTooltipEl.querySelector('.tooltip-label') as HTMLElement;    
        new Tooltip(el, {
            placement: this.position,
            title: this.content,
            trigger: this.trigger,
            html: this.html,
            closeOnClickOutside: this.closeOnClick,
            popperOptions: {                
                onCreate: (data) => {
                    let tempData = data as any;
                    tempData.instance.scheduleUpdate(); // trigger plugin reset => compute element's position
                    return tempData;
                },
                modifiers: {
                    preventOverflow: {      
                        enabled: true,   
                        padding: 70,         
                        escapeWithReference: true,
                        boundariesElement: 'viewport'
                    },
                    setCustomStyle: {
                        order: 301,
                        enabled: true,                        
                        fn: (data) => {
                             if (!!this.width) {
                                data.styles.width = this.width                          
                            } else if(this.autoWidth) { 
                                data.styles['white-space'] = 'nowrap';
                            }              
                            return data;
                        }
                    }
                }
            }
        });
    }

    // render component
    render() {
        return (
            <div class="ins-tooltip-wrap">
                <span class={`tooltip-label ${this.shape} ${!this.background ?'no-background' : ''}`}>
                   <span>{!!this.icon ? <i class={`${this.icon}`}></i> : ''} {!!this.label ? this.label : ''}</span>
                </span>
            </div>
        )
    }

}