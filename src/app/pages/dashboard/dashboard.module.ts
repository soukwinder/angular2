import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DefaultModal} from "../ui/components/modals/default-modal/default-modal.component";
import {ToastyModule} from "ng2-toasty";

//import alle benodigde modules

@NgModule({
  imports: [
    ToastyModule.forRoot(),
    CommonModule,
    NgbDropdownModule,
    NgbModalModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    Ng2SmartTableModule,
    routing,
  ],
  declarations: [
    PieChart,
    Dashboard,
    DefaultModal
  ],
  providers: [
    PieChartService,
  ],
  entryComponents: [
    DefaultModal
  ],
})
export class DashboardModule {}
