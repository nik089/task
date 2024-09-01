import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [VisualizationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: VisualizationComponent,

    }])
  ]
})
export class VisualizationModule { }
