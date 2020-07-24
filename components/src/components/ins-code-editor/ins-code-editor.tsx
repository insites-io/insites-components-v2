import { h , Component, Element, State, Prop, Method, Event, EventEmitter } from "@stencil/core";
import CodeMirror from "codemirror";

// addons
import "codemirror/addon/search/search";
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/display/autorefresh";

// modes
import "codemirror/mode/css/css";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/python/python";
import "codemirror/mode/vue/vue";
import "codemirror/mode/xml/xml";
import "codemirror/mode/yaml/yaml";

@Component({
	tag: 'ins-code-editor',
	styleUrls: [
		'../../../node_modules/codemirror/lib/codemirror.css',
		'../../../node_modules/codemirror/addon/dialog/dialog.css',
		'../../../node_modules/codemirror/addon/display/fullscreen.css',
		'../../../node_modules/codemirror/theme/monokai.css',
		'../../../node_modules/codemirror/theme/neat.css',
		'../../../node_modules/codemirror/theme/the-matrix.css',
		'../../../node_modules/codemirror/theme/material.css',
		// '../../../node_modules/codemirror/theme/3024-day.css',
		// '../../../node_modules/codemirror/theme/darcula.css',
		// '../../../node_modules/codemirror/theme/isotope.css',
		// '../../../node_modules/codemirror/theme/railscasts.css',
		// '../../../node_modules/codemirror/theme/vibrant-ink.css',
		// '../../../node_modules/codemirror/theme/3024-night.css',
		// '../../../node_modules/codemirror/theme/dracula.css',
		// '../../../node_modules/codemirror/theme/lesser-dark.css',
		// '../../../node_modules/codemirror/theme/moxer.css',
		// '../../../node_modules/codemirror/theme/rubyblue.css',
		// '../../../node_modules/codemirror/theme/xq-dark.css',
		// '../../../node_modules/codemirror/theme/abcdef.css',
		// '../../../node_modules/codemirror/theme/duotone-dark.css',
		// '../../../node_modules/codemirror/theme/liquibyte.css',
		// '../../../node_modules/codemirror/theme/seti.css',
		// '../../../node_modules/codemirror/theme/xq-light.css',
		// '../../../node_modules/codemirror/theme/ambiance-mobile.css',
		// '../../../node_modules/codemirror/theme/duotone-light.css',
		// '../../../node_modules/codemirror/theme/lucario.css',
		// '../../../node_modules/codemirror/theme/neo.css',
		// '../../../node_modules/codemirror/theme/shadowfox.css',
		// '../../../node_modules/codemirror/theme/yeti.css',
		// '../../../node_modules/codemirror/theme/ambiance.css',
		// '../../../node_modules/codemirror/theme/eclipse.css',
		// '../../../node_modules/codemirror/theme/material-darker.css',
		// '../../../node_modules/codemirror/theme/night.css',
		// '../../../node_modules/codemirror/theme/solarized.css',
		// '../../../node_modules/codemirror/theme/yonce.css',
		// '../../../node_modules/codemirror/theme/base16-dark.css',
		// '../../../node_modules/codemirror/theme/elegant.css',
		// '../../../node_modules/codemirror/theme/material-ocean.css',
		// '../../../node_modules/codemirror/theme/nord.css',
		// '../../../node_modules/codemirror/theme/ssms.css',
		// '../../../node_modules/codemirror/theme/zenburn.css',
		// '../../../node_modules/codemirror/theme/base16-light.css',
		// '../../../node_modules/codemirror/theme/erlang-dark.css',
		// '../../../node_modules/codemirror/theme/material-palenight.css',
		// '../../../node_modules/codemirror/theme/oceanic-next.css',
		// '../../../node_modules/codemirror/theme/bespin.css',
		// '../../../node_modules/codemirror/theme/gruvbox-dark.css',
		// '../../../node_modules/codemirror/theme/panda-syntax.css',
		// '../../../node_modules/codemirror/theme/tomorrow-night-bright.css',
		// '../../../node_modules/codemirror/theme/blackboard.css',
		// '../../../node_modules/codemirror/theme/hopscotch.css',
		// '../../../node_modules/codemirror/theme/mbo.css',
		// '../../../node_modules/codemirror/theme/paraiso-dark.css',
		// '../../../node_modules/codemirror/theme/tomorrow-night-eighties.css',
		// '../../../node_modules/codemirror/theme/cobalt.css',
		// '../../../node_modules/codemirror/theme/icecoder.css',
		// '../../../node_modules/codemirror/theme/mdn-like.css',
		// '../../../node_modules/codemirror/theme/paraiso-light.css',
		// '../../../node_modules/codemirror/theme/ttcn.css',
		// '../../../node_modules/codemirror/theme/colorforth.css',
		// '../../../node_modules/codemirror/theme/idea.css',
		// '../../../node_modules/codemirror/theme/midnight.css',
		// '../../../node_modules/codemirror/theme/pastel-on-dark.css',
		// '../../../node_modules/codemirror/theme/twilight.css'
	]
})

export class InsCodeEditor {
	@Element() insCodeEditorEl: HTMLElement;
	@Event() onblur: EventEmitter;
	@Event() oninput: EventEmitter;

	@Prop({ mutable: true }) label: string = "";
	@Prop({ mutable: true }) value: string = "";
	@Prop({ mutable: true }) name: string = "";
	@Prop({ mutable: true }) theme: string = "";
	@Prop({ mutable: true }) mode: string = "htmlmixed";
	@Prop({ mutable: true }) readonly: boolean = false;
	@Prop({ mutable: true }) disableLineNumbers: boolean = false;
	@Prop({ mutable: true }) hasError: boolean = false;
	@Prop({ mutable: true }) errorMessage: string = "";

	@State() codeMirrorEl: any;
	@State() activeLabel: boolean = false;

	@Method()
	async val() {
		return this.codeMirrorEl.getValue();
	}

	@Method()
	async refresh() {
		this.codeMirrorEl.refresh();
  }

  @Method()
 	async reset() {
 		this.codeMirrorEl.setValue('');
 	}

  @Method()
	async setValue(value) {
		this.codeMirrorEl.setValue(value);
	}

	@Method()
	async beautify() {
		this.codeMirrorEl.autoFormatRange({ line: 0, ch: 0 }, { line: this.codeMirrorEl.getValue().split('\n').length, ch: 0 });
		this.codeMirrorEl.setSelection({ line: 1, ch: 0 });
	}

	componentDidLoad() {
		const self = this;

		setTimeout(() => {
			self.codeMirrorEl = CodeMirror.fromTextArea(self.insCodeEditorEl.querySelector('.codemirror'), {
				autoRefresh: true,
				lineNumbers: !self.disableLineNumbers,
				lineWrapping: true,
				mode: self.mode,
				extraKeys: {
					"Alt-F": "findPersistent",
					"F10": el => {
						el.setOption("fullScreen", !el.getOption("fullScreen"));
					}
				},
				readOnly: self.readonly
			});

			CodeMirror.commands["selectAll"](self.codeMirrorEl);
			self.setEvents();
			self.hideCursor();

			let wrap = self.insCodeEditorEl.querySelector('.CodeMirror-wrap');

			wrap.addEventListener('mouseover', () => {
				wrap.classList.add('fullscreen-help');

				setTimeout(() => {
					wrap.classList.remove('fullscreen-help');
				}, 5000);
			});

			wrap.addEventListener('mouseout', () => {
				wrap.classList.remove('fullscreen-help');
			});

			self.refresh();
		}, 500);
	}

	showCursor() {
		let el = this.insCodeEditorEl.querySelector('.CodeMirror-cursor');

		if (el) {
			el.setAttribute("style", "visibility: visible");
		}
	}

	hideCursor() {
		let el = this.insCodeEditorEl.querySelector('.CodeMirror-cursor');

		if (el) {
			el.setAttribute("style", "visibility: hidden");
		}
	}

	setEvents() {
		if (this.theme) {
			this.codeMirrorEl.setOption("theme", this.theme);
		}

		if (this.value) {
			this.codeMirrorEl.setValue(this.value);
		}

		this.codeMirrorEl.on('focus', () => {
			this.showCursor();
			this.activateLabel();
		});

		this.codeMirrorEl.on('change', () => {
			this.oninput.emit({
				value: this.val()
			});
		});

		this.codeMirrorEl.on('blur', () => {
			this.deactivateLabel();
			this.hideCursor();

			this.onblur.emit({
				value: this.val()
			});
		});
	}

	activateLabel() {
		this.activeLabel = true;
	}

	deactivateLabel() {
		this.activeLabel = false;
	}

	render() {
		return (
			<div class="ins-code-editor">
				<div class={(this.hasError ? 'has-error ' : '') + (this.readonly ? 'readonly ' : '') + (this.activeLabel ? 'active' : '')}>
					<label>{this.label}</label>
					<textarea name={this.name} class="codemirror">
					</textarea>
					<div class="ins-form-error">
						{this.errorMessage}
					</div>
				</div>
			</div>
		)
	}
}
