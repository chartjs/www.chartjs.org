import Chart from 'chart.js/auto';
import {red, yellow, blue, green} from '../colours.js';

export default function(target) {
  return new Chart(target, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [65, 59, 20, 48],
        backgroundColor: [red, yellow, blue, green],
        borderWidth: 0
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: false,
        title: {
          display: true,
          text: 'Main title'
        },
        subtitle: {
          display: true,
          text: 'Secondary title',
          padding: {
            bottom: 10
          }
        }
      },
    }
  });
}

