import { Component, Input, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-schedule-list',
  templateUrl: './loan-schedule-list.component.html',
  styleUrls: ['./loan-schedule-list.component.scss']
})
export class LoanScheduleListComponent implements OnInit {
  loanSchedule: any[] = [];
  loanloader: boolean = false;
  isloader: boolean = true;

  constructor(
    private loanService: LoanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loanloader = true;
    this.loanService.loanSchedule$.subscribe((res: any) => {
      this.loanSchedule = res;
      if (this.loanSchedule.length) {
        this.loanloader = false
        this.isloader = false;

      }
      else {
        this.router.navigate(['loan'])
      }
    })
  }

  viewChart() {
    this.router.navigate(['loan', 'chart'])
    this.loanService.setLoanScheduleData(this.loanSchedule);
  }
}
