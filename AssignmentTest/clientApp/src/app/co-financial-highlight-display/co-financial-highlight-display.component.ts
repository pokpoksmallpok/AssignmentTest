import { Component, Inject, OnInit } from '@angular/core'; 
import Chart from 'chart.js/auto';
import { ApiAssignmentService } from 'src/app/api-assignment.service';

@Component({
  selector: 'app-co-financial-highlight-display',
  templateUrl: './co-financial-highlight-display.component.html',
  styleUrls: ['./co-financial-highlight-display.component.css']
})
export class CoFinancialHighlightDisplayComponent implements OnInit {

  dataChart: any;
  constructor(private ApiAssignmentService: ApiAssignmentService) {
  
  }

  canvas: any
  ctx: any;

  ngOnInit() {
    this.getDataChart(); 
  }
   
  async getDataChart() { 
    await this.ApiAssignmentService.loadChart().subscribe(data => { //เรียกใช้API
      this.dataChart = data;
      console.log(this.dataChart);
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      let myChart = new Chart(this.ctx, {
        type: 'bar',
        data: { 
          labels: this.dataChart.labelTopic,
          datasets: [
            {
              //label: 'Total Asset',
              //data: [65, 59, 80, 81, 56, 55, 60],
              label: this.dataChart.dataSet[0].label,
              data: this.dataChart.dataSet[0].data,
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)',
                'rgba(255, 99, 132)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              stack: "0"
            },
            {
              //label: 'Total Liabilities',
              //data: [56, 44, 34, 24, 67, 66, 77],
              label: this.dataChart.dataSet[1].label,
              data: this.dataChart.dataSet[1].data,
              backgroundColor: [
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)',
                'rgba(201, 203, 207)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ], stack: "1"
            }, {
              //label: 'Total Equities',
              //data: [56, 44, 34, 24, 67, 66, 77],
              label: this.dataChart.dataSet[2].label,
              data: this.dataChart.dataSet[2].data,
              backgroundColor: [
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)',
                'rgba(75, 192, 192)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ], stack: "1"
            },
          ]
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            tooltip: {
              callbacks: { 
                label: function (context) {
                  let label = context.dataset.label || '';

                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label +=  context.parsed.y + ' MB.';
                  }
                  return label;
                }
              }
            },
             
          }
        }
      });


    });
  }
}
