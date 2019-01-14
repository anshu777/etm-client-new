import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser'; //DomSanitizer

@Component({
	selector: 'pp-icon',
	template: './icon.html',
	styles: ['./icon.scss']
})

export class IconComponent implements OnInit {

	@Input() url: string; // Icon to be displayed. Size folder and name. I.E.: 16/plus
	@Output() onClick: EventEmitter<any> = new EventEmitter();
	private src: SafeHtml;

	// DomSanitizer is needed to dynamically inject the src attribute
	// and avoid JS injection.
	constructor() {
	}

	ngOnInit() {
		this.src = this.url;
		//this.src = this.sanitize.bypassSecurityTrustHtml(this.url);
	}
}
