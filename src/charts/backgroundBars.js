import Chart from 'chart.js/auto';

export default function(ctx) {

  const randomize = function() {
    return (Math.random() * 80) + 20;
  };

  const count = 100;

  const randomBar = function() {
    return Math.min(count - 1, Math.round(Math.random() * count));
  };

  var data = [];

  var timeout, barChart;

  for (let i = count - 1; i >= 0; i--) {
    data.push({x: 'lbl' + i, y: randomize()});
  }

  var barChartConfig = {
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: false
      },
      scales: {
        y: {
          display: false,
          beginAtZero: true
        },
        x: {
          display: false
        }
      },
      animation: {
        onComplete: () => {
          if (timeout) {
            clearTimeout(timeout);
          }

          timeout = setTimeout(()=>{
            const randomCount = randomBar();

            for (let i = randomCount - 1; i >= 0; i--) {
              data[randomBar()].y = randomize();
            }

            barChart.update();
          }, 2000);
        }
      }
    },
    data: {
      datasets: [{
        backgroundColor: 'rgba(0,0,0,0.05)',
        hoverBackgroundColor: 'rgba(0,0,0,0.1)',
        data: data
      }]
    }
  };

  barChart = new Chart(ctx, barChartConfig);
}
