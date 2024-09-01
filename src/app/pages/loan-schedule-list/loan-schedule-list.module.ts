import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoanScheduleListComponent } from './loan-schedule-list.component';



@NgModule({
  declarations: [LoanScheduleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: LoanScheduleListComponent
    }])
  ]
})
export class LoanScheduleListModule { }
