import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatInputModule, MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule,
  MatCardModule
} from '@angular/material';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { ModalWindowTitleDirective } from './modal-window/modal-window.component';
import { ModalWindowContentDirective } from './modal-window/modal-window.component';
import { ModalWindowActionsDirective } from './modal-window/modal-window.component';
import { PopupComponent } from './popup/popup.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MatSortModule, MatPaginatorModule } from '@angular/material';
import { DataService } from './services/data.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { IconComponent } from './icon/icon.component';
import { UserService } from './services/user.service';
import { SidebarComponent } from '../shared/layout/sidebar.component';
import { NvD3Module } from 'ng2-nvd3';
import { nvD3} from './chart/ng2-nvd3'; 
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NvD3Module,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule
  ],
  declarations: [
    PopupComponent,
    ModalWindowComponent,
    ModalWindowTitleDirective,
    ModalWindowContentDirective,
    ModalWindowActionsDirective,
    DropdownComponent,
    SpinnerComponent,
    SidebarComponent,
    IconComponent,
    nvD3
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PopupComponent,
    ModalWindowComponent,
    ModalWindowTitleDirective,
    ModalWindowContentDirective,
    ModalWindowActionsDirective,

    AngularMultiSelectModule,
    DropdownComponent,
    SpinnerComponent,
    SidebarComponent,
    MatToolbarModule, MatInputModule, MatTableModule, MatButtonModule,
    MatIconModule, MatCardModule, MatSortModule, MatPaginatorModule,

    nvD3

  ],
  providers: [DataService, UserService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule { }
