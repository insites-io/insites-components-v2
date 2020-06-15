import { h, Component, Prop } from "@stencil/core";

declare var $;

@Component({ tag: 'ins-timezone' })

export class insTimezone {
	@Prop() label: string;
	@Prop() name: string;

	componentDidLoad() {
		let _initName = $('#' + this.name);

		_initName.timezones();
	}

	render() {
		if (this.label) {
			return (
				<div class="ins-timezone">
					<label>{this.label}</label>
                    <select id={this.name} class="ins-timezone_zone"></select>
				</div>
			);
		} else {
			return (
				<div class="ins-timezone">
					{  }
					<select id={this.name} class="ins-timezone_zone"></select>
				</div>
			);
		}
	}
}