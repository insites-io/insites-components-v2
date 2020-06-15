import { h, Component, Prop } from "@stencil/core";

declare var $;

@Component({ tag: 'ins-tagging-input' })
export class insTaggingInput {
    @Prop() label: string;
    @Prop() name: string;

    componentDidLoad() {
        let _initName = $('#' + this.name);

        _initName.tokens({
            source : [
                'Mabel Neal', 'Scott Cooper', 'Maude Simpson', 'Leo Casey', 'Florence Ferguson'
            ]
        });
    }

    render() {
        if (this.label) {
            return (
                <div class="ins-tagging-input-wrapper">
                    <label>{this.label}</label>
                    <input type="text" id={this.name} class="ins-tagging-input__tags" />
                </div>    
            );
        } else {
            return (
                <div class="ins-tagging-input-wrapper">
                    <label>{  }</label>
                    <input type="text" id={this.name} class="ins-tagging-input__tags" />
                </div>
            );
        }
    }
}