import Chart from 'chart.js/auto';
import {red, yellow, blue, green} from '../colours.js';

export default function(target) {
  return new Chart(target, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        data: [10, 30, 50, 20, 25, 44, 15],
        backgroundColor: [red, yellow, green],
        borderWidth: 0
      }, {
        type: 'line',
        borderColor: blue,
        data: ['ON', 'ON', 'OFF', 'ON', 'OFF', 'OFF', 'ON'],
        radius: 0,
        stepped: true,
        yAxisID: 'y2'
      }]
    },
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          display: false
        },
        y: {
          type: 'linear',
          position: 'left',
          stack: 'demo',
          stackWeight: 2,
          grid: {
            borderColor: red,
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            color: red
          }
        },
        y2: {
          type: 'category',
          labels: ['ON', 'OFF'],
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
          grid: {
            borderColor: blue,
            drawOnChartArea: false,
            drawTicks: false
          },
          ticks: {
            color: blue
          }
        }
      }
    }
  });
}

