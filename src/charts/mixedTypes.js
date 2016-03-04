import Chart from 'chart.js';
import * as colours from '../colours.js';

const randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
};

export default function(ctx){

	var barChartData = {
		labels: ["A", "B", "C", "D", "E", "F", "G"],
		datasets: [{
			type: 'bar',
			backgroundColor: colours.mauve,
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: 'white',
			borderWidth: 2
		},{
			type: 'bar',
			backgroundColor: colours.blue,
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: 'white',
			borderWidth: 2
		},{
			type: 'line',
			backgroundColor: Chart.helpers.color(colours.yellow).alpha(0.5).rgbaString(),
			data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()],
			borderColor: Chart.helpers.color(colours.yellow).alpha(1).rgbaString(),
			borderWidth: 1,
			pointBorderColor: Chart.helpers.color(colours.yellow).alpha(1).rgbaString(),
			pointBorderWidth: 2,
			pointBackgroundColor: "white"
		} ]
	};


	const gridGrey = Chart.helpers.color(colours.grey).alpha(0.5).rgbaString();
	const axisGrey = Chart.helpers.color(colours.grey).alpha(1).rgbaString();
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
						color: gridGrey,
						zeroLineColor: axisGrey
					}
				}],
				yAxes:[{
					gridLines: {
						color: gridGrey,
						zeroLineColor: axisGrey
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
