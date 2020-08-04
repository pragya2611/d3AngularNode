import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LineChartService} from './line-chart.service';
import {LineChartComponent} from './line-chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,HttpClientModule
  ],
  providers : [LineChartService]
})
export class LineChartModule { }
