import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

export type PopupSize = 'content' | 'small' | 'medium' | 'large' | 'small-main';
export type PopupArrowDirection = 'up' | 'down' | 'left' | 'right';
export type ArrowPosition = 'default' | 'middle';

const CENTER_POSITION = '50%';

@Component({
	selector: 'pp-popup',
	styleUrls: ['./popup.css'],
	templateUrl: './popup.html'
})
export class PopupComponent {
	@Input() size: PopupSize = 'content';
	@Input() arrowDirection: PopupArrowDirection = 'up';
	@Input() showOverlay: boolean = true;
	@Input() showPopup: boolean = false;
	@Input() topOffset: string = '3px'; // Left Offset in reference to the elementReference. Default: 3px
	@Input() leftOffset: string = '-19px'; // Left Offset in reference to the elementReference. Default: -19px
	@Input() alignRight: boolean = false;
	@Input() rightOffset: string = null; // Right Offset in reference to the elementReference.
	// Display the arrow on the opposite side (i.e up and down arrows get swapped to be displayed on the right side)
	@Input() swapArrowSide: boolean;

	@Input() set arrowPosition(position: ArrowPosition) {
		if (position === 'middle') {
			this._arrowPosition = CENTER_POSITION;
		}
	}

	@Output() close: EventEmitter<any> = new EventEmitter<any>();

	private _arrowPosition: string = 'auto';

	// TODO: Still need to add some logic for right and down arrow positions.
	// TODO: Implement when a use case arises.
}
