import { h, Component, Prop } from "@stencil/core";

declare var $;

@Component({ tag: 'ins-duration' })

export class insDuration {
	@Prop() label: string;
	@Prop() name: string;

	componentDidLoad() {
		let _initId = $('#' + this.name);

		_initId.timepicker({
			'minTime': '2:00pm',
			'maxTime': '11:30pm',
			'showDuration': true
		});
	}

	render() {
		if (this.label) {
			return (
				<div class="ins-duration">
					<label>{this.label}</label>
					<input type="text" id={this.name} class="ins-duration_time" />
				</div>
			);
		} else {
			return (
				<div class="ins-duration">
					{  }
					<input type="text" id={this.name} class="ins-duration_time" />
				</div>
			);
		}
	}
}