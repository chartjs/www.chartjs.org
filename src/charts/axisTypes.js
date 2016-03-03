import Chart from 'chart.js';


export default function(ctx){

	var scatterChartData = {
		datasets: [{
			borderColor: 'rgba(252,98,132,1)',
			backgroundColor: 'rgba(252,98,132, 0.5)',
			pointBorderColor: 'rgba(252,98,132,1)',
			pointBackgroundColor: '#FFFFFF',
			pointBorderWidth: 2,
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


	new Chart.Scatter(ctx, {
		data: scatterChartData,
		options: {
			legend: {
				display: false
			},
			elements: {
				point: {
					radius: 4
				}
			},
			scales: {
				xAxes: [{
					type: 'logarithmic',
					position: 'top',
					gridLines: {
						color: 'rgba(231,233,237,0.5)',
						zeroLineColor: 'rgba(231,233,237,1)'
					},
					ticks: {
						display: false
					}
				}],
				yAxes: [{
					type: 'linear',
					gridLines: {
						color: 'rgba(231,233,237,0.5)',
						zeroLineColor: 'rgba(231,233,237,1)'
					},
					ticks: {
						display: false
					}
				}]
			}
		}
	});



}
