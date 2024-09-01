import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoanService } from '../loan.service';
import { LoanFormComponent } from './loan-form.component';
import { ToastrManager } from 'ng6-toastr-notifications';

class MockLoanService {
  generateAmortizationSchedule = jasmine.createSpy('generateAmortizationSchedule').and.returnValue([]);
  setLoanScheduleData = jasmine.createSpy('setLoanScheduleData');
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoanFormComponent', () => {
  let component: LoanFormComponent;
  let fixture: ComponentFixture<LoanFormComponent>;
  let loanService: LoanService;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoanFormComponent],
      providers: [
        { provide: LoanService, useClass: MockLoanService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoanFormComponent);
    component = fixture.componentInstance;
    loanService = TestBed.inject(LoanService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.loanForm).toBeTruthy();
    expect(component.loanForm.controls['loanAmount']).toBeDefined();
    expect(component.loanForm.controls['interestRate']).toBeDefined();
    expect(component.loanForm.controls['loanTerm']).toBeDefined();
  });

  it('should show validation errors when form is invalid', () => {
    component.onSubmit();
    expect(component.submitted).toBeTrue();
    expect(component.loanForm.invalid).toBeTrue();
  });

  it('should call generateAmortizationSchedule on valid form submission', () => {
    component.loanForm.setValue({
      loanAmount: 10000,
      interestRate: 5,
      loanTerm: 10,
      startDate: '',
      extraPayment: 100,
      paymentFrequency: 'monthly'
    });

    component.onSubmit();
    expect(loanService.generateAmortizationSchedule).toHaveBeenCalled();
    expect(loanService.setLoanScheduleData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['loan', 'schedule-list']);
  });
});
