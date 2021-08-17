import Chart from 'chart.js/auto';
import {red, blue} from '../colours.js';

const count = 500000;
const randomDataSet = function() {
  var dataset = [];
  let prev = Math.random() * 100;
  for (let i = 0; i < count; i++) {
    prev += 5 - Math.random() * 10;
    dataset.push({x: i, y: prev});
  }

  return dataset;
};

var datasets = [{
  borderColor: red,
  data: randomDataSet(),
}, {
  borderColor: blue,
  data: randomDataSet(),
}];

export default function(ctx) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      radius: 0,
      borderWidth: 1,
      parsing: false,
      normalized: true,
      animation: false,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      plugins: {
        legend: false,
        decimation: {
          enabled: true
        }
      },
      scales: {
        x: {
          type: 'linear',
          display: false,
          bounds: 'data'
        },
        y: {
          type: 'linear',
          display: false,
        }
      }
    }
  });
}

