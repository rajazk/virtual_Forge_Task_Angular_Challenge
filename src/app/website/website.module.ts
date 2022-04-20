import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [
    WebsiteComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
