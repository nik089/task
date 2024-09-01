import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";
import { LoanService } from '../loan.service';
import { Router } from '@angular/router';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-chart',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})


export class VisualizationComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | undefined;
  private chartInstance2: ApexCharts | null = null
  isLoader: boolean = true
  schedule: any = []

  constructor(
    private loanService: LoanService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loanService.loanSchedule$.subscribe((res: any) => {
      this.schedule = res;
      this.isLoader = true
      if (this.schedule?.length) {
        setTimeout(() => {
          this.getChart()
        }, 1000);
      } else {
        this.router.navigate(['loan'])
      }
    })
  }

  back() {
    this.router.navigate(['loan'])

  }

  getChart() {
    const labels = this.schedule.map((payment: any) => `Month ${payment.month}`);
    const principalData = this.schedule.map((payment: any) => this.parseNumber(payment.principalPayment));
    const interestData = this.schedule.map((payment: any) => this.parseNumber(payment.interestPayment));
    const remainingBalanceData = this.schedule.map((payment: any) => this.parseNumber(payment.remainingBalance));

    const chartOptions = {
      series: [
        {
          name: "Principal Payment",
          data: principalData
        },
        {
          name: "Interest Payment",
          data: interestData
        },
        {
          name: "Remaining Balance",
          data: remainingBalanceData
        }
      ],
      chart: {
        type: "bar",
        height: '100%',
        width: '100%'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: "bottom",
        fontSize: "11px",
        fontWeight: "bold",
        markers: {
          width: 10,
          height: 10
        }
      },
      xaxis: {
        categories: labels,
        title: {
          text: 'Months'
        },
        labels: {
          rotate: -45
        }
      },
      yaxis: {
        title: {
          text: 'Amount (₹)'
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (value: any, { seriesIndex }: { seriesIndex: number }) {
            return `₹${value.toFixed(2)}`;
          }
        }
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: '80%'
            },
            legend: {
              position: 'bottom'
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            },
            xaxis: {
              labels: {
                rotate: -30
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: 'bottom'
            },
            xaxis: {
              labels: {
                rotate: -45
              }
            }
          }
        }
      ]
    };

    if (this.chartInstance2) {
      this.chartInstance2.updateOptions(chartOptions);
    } else {
      this.chartInstance2 = new ApexCharts(
        document.querySelector("#loanVisualization"),
        chartOptions
      );
      this.chartInstance2.render();
    }
    this.isLoader = false;
  }


  parseNumber(value: any): number {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  }

}
