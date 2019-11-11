import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'


@Component({
  selector: 'app-repstock',
  templateUrl: './repstock.component.html'
})
export class RepstockComponent implements OnInit {

  title = 'Angular 8 with Chart Js';
  LineChart = [];
  BarChart = [];
  BarChart2 = [];
  BarChartH = [];
  
  
  ngOnInit() {

    this.BarChart = new Chart('barChart', {
        type: 'bar',
        data: {
            labels: ['Saga Falabella', 'Sodimac', 'Ripley' ],
            datasets: [{
                label: 'Número de Contenedores',
                data: [80, 35, 31],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                    
                ],
                borderWidth: 1
            }]
        },
        options: {
          title: {
            text : "Contenedores x Cliente",
            display : true
          },
            scales: {
              xAxes:[{
                scaleLabel: {
                  display: true,
                  labelString: 'Clientes'
                },      
                barPercentage: 0.2,
                gridLines: {
                display:false
                }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Número de Contenedores'
                  }, 
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }),

    this.BarChartH = new Chart('barChartH', {
      type: 'horizontalBar',
      data: {
          labels: ['1-5', '6-11', '> 11' ],
          datasets: [{
              label: 'Abandono Legal',
              data: [65, 32, 44],
              backgroundColor: [
                  'rgba(229, 10, 9, 0.68)',
                  'rgba(255, 251, 29, 0.75)',
                  'rgba(54, 179, 63, 0.65)'
                  
              ],
              borderColor: [
                  'rgba(229, 10, 9, 1)',
                  'rgba(255, 251, 29, 1)',
                  'rgba(54, 179, 63, 1)'
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          text : "Abandono Legal x Cliente/Agencia Aduanas/Agente Cargo",
          display : true
        },
          scales: {
            xAxes:[{
              scaleLabel: {
                display: true,
                labelString: 'Número de Contenedores'
              },              
              gridLines: {
              display:false
              }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Días'
                },     
                  barPercentage: 0.4,
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  }),


    this.BarChart2 = new Chart('barChart2', {
      type: 'bar',
      data: {
          labels: ['< 15', '15-30', '> 30' ],
          datasets: [{
              label: '# de Contenedores',
              data: [55, 38, 31],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
                  
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
        title: {
          text : "Contenedores x Capacidad y Tipo",
          display : true
        },
          scales: {
            xAxes:[{
              scaleLabel: {
                display: true,
                labelString: 'Número de Días'
              }, 
              barPercentage: 0.2,
              gridLines: {
              display:false
              }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Número de Contenedores'
                }, 
  
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  }

}