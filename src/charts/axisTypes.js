import Chart from 'chart.js/auto';

import * as colours from '../colours.js';

export default function(ctx) {
  let red = Chart.helpers.color(colours.red);

  var scatterChartData = {
    datasets: [{
      borderColor: red.alpha(1).rgbString(),
      backgroundColor: red.alpha(0.5).rgbString(),
      pointBorderColor: red.alpha(1).rgbString(),
      pointBackgroundColor: '#FFFFFF',
      pointBorderWidth: 2,
      showLine: true,
      fill: true,
      data: [{
        x: 1,
        y: -1.711e-2
      }, {
        x: 1.58,
        y: -4.285e-2
      }, {
        x: 2.51,
        y: -1.068e-1
      }, {
        x: 3.98,
        y: -2.635e-1
      }, {
        x: 6.31,
        y: -6.339e-1
      }, {
        x: 10.00,
        y: -1.445
      }, {
        x: 15.8,
        y: -2.992
      }, {
        x: 25.1,
        y: -5.429
      }, {
        x: 39.8,
        y: -8.607
      }, {
        x: 63.1,
        y: -1.223e1
      }, {
        x: 100.00,
        y: -1.607e1
      }]
    }]
  };

  return new Chart(ctx, {
    type: 'scatter',
    data: scatterChartData,
    options: {
      plugins: {
        legend: false
      },
      elements: {
        point: {
          radius: 4
        }
      },
      scales: {
        x: {
          type: 'logarithmic',
          position: 'top',
          grid: {
            color: 'rgba(231,233,237,0.5)',
            borderColor: 'rgba(231,233,237,1)'
          },
          ticks: {
            autoSkip: false,
            callback: function(tick) {
              var remain = tick / (Math.pow(10, Math.floor(Chart.helpers.log10(tick))));
              if (remain === 1 || remain === 2 || remain === 5) {
                return tick.toString();
              }
              return '';
            },
          }
        },
        y: {
          type: 'linear',
          grid: {
            color: 'rgba(231,233,237,0.5)',
            borderColor: 'rgba(231,233,237,1)'
          },
          ticks: {
            display: false
          }
        }
      }
    }
  });
}
