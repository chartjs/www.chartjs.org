import Chart from 'chart.js/auto';
import {green, red, grey} from '../colours.js';

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

export default function(target) {
  return new Chart(target, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [65, 59, NaN, 48, 56, 57],
        borderColor: green,
        segment: {
          borderColor: ctx => skipped(ctx, grey) || down(ctx, red),
          borderDash: ctx => skipped(ctx, [6, 6]),
        }
      }]
    },
    options: {
      radius: 0,
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    }
  });
}

