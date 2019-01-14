import { Component, Input } from '@angular/core';
@Component({
    selector: 'etm-spinner',
    styles: ['./spinner.css'],
    templateUrl: './spinner.component.html'
})

export class SpinnerComponent {
    @Input() showSpinner: boolean;
}
