import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [VisualizationComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild([{
      path: "",
      component: VisualizationComponent,

    }])
  ]
})
export class VisualizationModule { }
