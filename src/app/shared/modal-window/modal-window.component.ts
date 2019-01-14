import { Component, Input, Output, HostListener, EventEmitter, Directive }
	from '@angular/core';

@Component({
	selector: 'pp-modal-window',
	styleUrls: ['./modal-window.css'],
	templateUrl: './modal-window.html'
})

export class ModalWindowComponent {
	@Input() isEscapedDisabled: Boolean = false;
	@Input() size: 'small' | 'medium' | 'large' | 'xlarge' | 'fullscreen';
	@Input() height: string;
	@Input() width: string;
	@Input() fullContentBodyHeight: boolean;
	@Input() isModalActionsAvailable: boolean = true;
	@Input() styleType: string = 'primary';
	@Input() isDirty: boolean = false;
	@Input() showSubmit: boolean = false;
	@Input() showCancel: boolean = true;
	@Input() hideDismissal: boolean = false;
	@Output() dismissed: EventEmitter<any> = new EventEmitter();
	@Output() submit: EventEmitter<any> = new EventEmitter();
	@Output() discard: EventEmitter<any> = new EventEmitter();
	@Output() cancel: EventEmitter<any> = new EventEmitter();

	@Input()
	set visible(_visibility: boolean) {
		this._visible = _visibility;
		this.setBodyStyle();
	}

	get visible() {
		return this._visible;
	}

	_visible: boolean = false;
	private showClosePopup: boolean = false;
	private showCancelPopup: boolean = false;

	@HostListener('document:keydown', ['$event'])
	keyboardInput(event: KeyboardEvent) {
		if (event.key === 'Escape' && !this.isEscapedDisabled) {
			this.hide();
		}
	}

	show() {
		this.visible = true;
	}

	hide() {
		this.visible = false;
		this.hideClosePopup();
		this.hideCancelPopup();
		this.dismissed.emit(false);
	}

	setBodyStyle() {
		const body = document.getElementsByTagName('body')[0];
		if (this.visible) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}
	}

	onClose() {
		if (this.isDirty) {
			this.showClosePopup = true;
		} else {
			this.cancel.emit();
			this.hide();
		}
	}

	hideClosePopup() {
		this.showClosePopup = false;
	}

	hideCancelPopup() {
		this.showCancelPopup = false;
	}

	emitSubmitEvent() {
		this.submit.emit();
	}

	onCancel() {
		if (this.isDirty) {
			this.showCancelPopup = true;
		} else {
			this.cancel.emit();
			this.hide();
		}
	}

	onDiscard() {
		this.discard.emit();
		this.hide();
	}
}

/**
 * Template directives being used inside modal window Component
 * We need to declare them to avoid Angular2 schema errors
 */

/* tslint:disable:directive-selector-name directive-selector-type */
@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'pp-modal-window-title'
})
export class ModalWindowTitleDirective { }

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'pp-modal-window-content'
})
export class ModalWindowContentDirective { }

@Directive({
	// tslint:disable-next-line:directive-selector
	selector: 'pp-modal-window-actions'
})
export class ModalWindowActionsDirective { }
