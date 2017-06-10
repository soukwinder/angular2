import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import {ChartModule} from 'primeng/primeng';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { routing }       from './charts.routing';
import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJsService } from './components/chartistJs/chartistJs.service';
import { AppTranslationModule } from '../../app.translation.module';
import {PieChartService} from "../dashboard/pieChart/pieChart.service";

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    ReactiveFormsModule,
    ChartModule,
    ChartsModule,
    routing
  ],
  declarations: [
    Charts,
    ChartistJs
  ],
  providers: [
    ChartistJsService, PieChartService
  ]
})
export class ChartsModule1 {}
