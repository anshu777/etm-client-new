import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../app/shared/shared.module';
import { StatusComponent } from './status/status.component';
import { configurationRouting } from './configuration.routing';
import { SkillsetComponent } from './skillset/skillset.component';
import { ConfigurationComponent } from './configuration.component';
import { ApproverComponent } from './approver/approver.component';

@NgModule({
  imports: [
    configurationRouting,
    CommonModule,
    SharedModule
  ],
  declarations: [StatusComponent, SkillsetComponent, ConfigurationComponent, 
    ApproverComponent
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationModule { }
