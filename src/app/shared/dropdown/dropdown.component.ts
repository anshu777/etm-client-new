import { Component, OnInit, Output, ViewChild, Input, EventEmitter } from '@angular/core';
import { List } from 'immutable';

@Component({
    selector: 'et-dropdown',
    templateUrl: './dropdown.component.html'
})

export class DropdownComponent implements OnInit {
    @Input() singleSelectData: Array<any>;
    @Output() onSelectItem: EventEmitter<any> = new EventEmitter();

    ngOnInit() {

    }

    onSelect(id: any) {
        this.onSelectItem.emit(id);
    }
}
