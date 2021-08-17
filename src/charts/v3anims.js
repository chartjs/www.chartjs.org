import Chart from 'chart.js/auto';
import {red, yellow, blue, green} from '../colours.js';

const count = 100;
const randomDataSet = function() {
  var dataset = [];
  let prev = Math.random() * 100;
  for (let i = 0; i < count; i++) {
    prev += 5 - Math.random() * 10;
    dataset.push({x: i, y: prev});
  }

  return dataset;
};

const totalDuration = 5000;
const delayBetweenPoints = totalDuration / count;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

var datasets = [{
  borderColor: red,
  data: randomDataSet(),
  animations: {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data') {
          return 0;
        }
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data') {
          return 0;
        }
        return ctx.index * delayBetweenPoints;
      }
    }
  }
}, {
  borderColor: blue,
  data: randomDataSet(),
  animations: {
    borderWidth: {
      easing: 'linear',
      from: 1,
      loop: true
    }
  }
}, {
  borderColor: yellow,
  borderWidth: 1,
  data: randomDataSet(),
  tension: 1,
  animations: {
    tension: {
      type: 'number',
      duration: 1000,
      easing: 'linear',
      from: 0,
      to: 1,
      loop: true
    }
  }
}, {
  borderColor: green,
  data: randomDataSet(),
  animations: {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data') {
          return 0;
        }
        return (100 - ctx.index) * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data') {
          return 0;
        }
        return (100 - ctx.index) * delayBetweenPoints;
      }
    }
  }
}];

export default function(ctx) {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: datasets
    },
    options: {
      radius: 0,
      animations: {
        y: {
          delay: (context) => 1000 * context.datasetIndex,
          easing: 'easeInOutElastic',
          from: (context) => {
            if (context.type === 'data') {
              if (context.mode === 'default' && !context.dropped) {
                context.dropped = true;
                return -10;
              }
            }
          }
        }
      },
      interaction: {
        mode: 'x',
        intersect: false
      },
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
  setInterval(() => {
    for (const dataset of chart.data.datasets) {
      dataset.data = randomDataSet();
    }
    chart.update();
  }, 10000);
}

