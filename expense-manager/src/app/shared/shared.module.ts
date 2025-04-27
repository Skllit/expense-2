// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule
  ]
})
export class SharedModule {}
