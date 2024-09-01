import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildAppComponent } from './child-app.component';
import { RouterModule, Routes } from '@angular/router';

const CHILD_ROUTES: Routes = [
  {
    path: "",
    component: ChildAppComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/loan-form/loan-form.module").then(
            (m) => m.LoanFormModule
          ),
      },
      {
        path: "schedule-list",
        loadChildren: () =>
          import("../pages/loan-schedule-list/loan-schedule-list.module").then(
            (m) => m.LoanScheduleListModule
          ),
      },
      {
        path: "chart",
        loadChildren: () =>
          import("../pages/visualization/visualization.module").then(
            (m) => m.VisualizationModule
          ),
      },
    ]
  }
]


@NgModule({
  declarations: [ChildAppComponent],
  imports: [
    RouterModule.forChild(CHILD_ROUTES),
    CommonModule
  ]
})
export class ChildAppRoutingModule { }
