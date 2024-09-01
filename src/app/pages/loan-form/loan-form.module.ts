import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanFormComponent } from './loan-form.component';
import { RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoanFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: LoanFormComponent
    }])
  ]
})
export class LoanFormModule { }
