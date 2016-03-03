import Chart from 'chart.js';

export default function(ctx){

	const randomize = function(){
		return (Math.random() * 80) + 20;
	}


	const count = 100;

	const randomBar = function(){
		return Math.round(Math.random() * count);
	}

	var data = [];

	for (var i = count - 1; i >= 0; i--) {
		data.push(randomize());
	}

	var barChartConfig = {
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false
			},
			scales:{
				yAxes:[{
					display: false,
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes:[{
					display: false
				}]
			}
		},
		data: {
			labels: new Array(count),
			datasets: [{
				backgroundColor: "#DBDDE0",
				data: data
			}]
		}
	};


	const barChart = new Chart.Bar(ctx, barChartConfig);

	setInterval(function(){
		const randomCount = randomBar();

		for (let i = randomCount - 1; i >= 0; i--) {
			data[randomBar()] = randomize();
		}

		barChart.update();
	}, 2000);
}
