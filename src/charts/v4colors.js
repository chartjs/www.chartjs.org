import Chart from 'chart.js/auto';

const count = 100;
const randomDataSet = function(index) {
  var dataset = [];
  let prev = -10 * index;
  for (let i = 0; i < count; i++) {
    prev -= 1;
    dataset.push({x: i, y: prev});
  }
  return dataset;
};

var datasets = new Array(7).fill(0).map((x, i) => ({
  data: randomDataSet(i)
}));

export default function(ctx) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      radius: 0,
      plugins: {
        legend: false
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

