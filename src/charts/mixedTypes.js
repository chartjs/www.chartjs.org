import Chart from 'chart.js';


const randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};

export default function(ctx){

	var barChartData = {
		labels: ["A", "B", "C", "D", "E", "F", "G"],
		datasets: [{
			type: 'bar',
			backgroundColor: "rgba(160,162,184,0.8)",
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: 'white',
			borderWidth: 2
		},{
			type: 'bar',
			backgroundColor: "rgba(54,162,235,0.8)",
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: 'white',
			borderWidth: 2
		},{
			type: 'line',
			backgroundColor: "rgba(255,205,86,0.5)",
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: "rgba(255,205,86,1)",
			borderWidth: 1,
			pointBorderColor: "rgba(255,205,86,1)",
			pointBorderWidth: 2,
			pointBackgroundColor: "rgba(255,255,255,1)"
		} ]
	};

	new Chart.Bar(ctx, {
		data: barChartData,
		options: {
			tooltips:{
				enabled: false
			},
			elements: {
				point: {
					radius: 4
				}
			},
			scales: {
				xAxes: [{
					barPercentage: 0.75,
					gridLines: {
						color: 'rgba(231,233,237,0.5)',
						zeroLineColor: 'rgba(231,233,237,1)'
					}
				}],
				yAxes:[{
					gridLines: {
						color: 'rgba(231,233,237,0.5)',
						zeroLineColor: 'rgba(231,233,237,1)'
					},
					ticks: {
						display: false
					}
				}]
			},
			responsive: true,
			legend: {
				display: false
			}
		}
	});

}
