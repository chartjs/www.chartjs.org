import Chart from 'chart.js/auto';
import * as helpers from 'chart.js/helpers';
import * as colours from '../colours.js';

const randomScalingFactor = function() {
  return Math.round(Math.random() * 100);
};

export default function(ctx) {

  var barChartData = {
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    datasets: [{
      type: 'bar',
      backgroundColor: colours.mauve,
      data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
      borderColor: 'white',
      borderWidth: 2
    }, {
      type: 'bar',
      backgroundColor: colours.blue,
      data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
      borderColor: 'white',
      borderWidth: 2
    }, {
      type: 'line',
      backgroundColor: helpers.color(colours.yellow).alpha(0.5).rgbString(),
      data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
      borderColor: helpers.color(colours.yellow).alpha(1).rgbString(),
      borderWidth: 1,
      pointBorderColor: helpers.color(colours.yellow).alpha(1).rgbString(),
      pointBorderWidth: 2,
      pointBackgroundColor: 'white',
      fill: true
    }]
  };


  const gridGrey = helpers.color(colours.grey).alpha(0.5).rgbString();
  const axisGrey = helpers.color(colours.grey).alpha(1).rgbString();
  return new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      radius: 4,
      barPercentage: 0.75,
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          grid: {
            color: gridGrey,
            borderColor: axisGrey
          }
        },
        y: {
          grid: {
            color: gridGrey,
            borderColor: axisGrey
          },
          ticks: {
            display: false
          }
        }
      },
      responsive: true,
      plugins: {
        legend: false,
        tooltip: false
      }
    }
  });
}
