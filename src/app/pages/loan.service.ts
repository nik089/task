import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  // Using BehaviorSubject to store and share loanSchedule
  private loanScheduleList = new BehaviorSubject<any[]>([]);
  loanSchedule$ = this.loanScheduleList.asObservable();

  constructor() { }

  // Method to update the loanSchedule
  setLoanScheduleData(data: any[]) {
    this.loanScheduleList.next(data);
  }

  calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTerm: number): number {
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
  }

  generateAmortizationSchedule(loanAmount: number, interestRate: number, loanTerm: number, extraPayment: number = 0) {
    const monthlyPayment = this.calculateMonthlyPayment(loanAmount, interestRate, loanTerm);
    const schedule = [];
    let remainingBalance = loanAmount;

    for (let i = 0; i < loanTerm * 12; i++) {
      const interestPayment = remainingBalance * (interestRate / 100) / 12;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= (principalPayment + extraPayment);

      schedule.push({
        month: i + 1,
        monthlyPayment,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(remainingBalance, 0)
      });
      if (remainingBalance <= 0) break;
    }

    return schedule;
  }
}
