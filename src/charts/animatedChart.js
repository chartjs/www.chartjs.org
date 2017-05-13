import Chart from 'chart.js';

import {red, yellow, blue, green, grey} from '../colours.js';

const randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 85);
};

const randomDataPoint = function() {
	const radius = Math.abs(randomScalingFactor()) / 5;
	return {
		x: randomScalingFactor(),
		y: randomScalingFactor(),
		r: radius
	};
};

const randomDataSet = function(count = 10) {
	var dataset = [];
	for (let i = count - 1; i >= 0; i--) {
		dataset.push(randomDataPoint());
	}

	return dataset;
};

const shuffle = function(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
};

const colours = [grey, red, yellow, blue, green];

var datasets = [{
	backgroundColor: grey,
	data: randomDataSet()
}, {
	backgroundColor: red,
	data: randomDataSet()
}, {
	backgroundColor: blue,
	data: randomDataSet()
}, {
	backgroundColor: yellow,
	data: randomDataSet()
}, {
	backgroundColor: green,
	data: randomDataSet()
}];

export default function(ctx) {
	const randomize = function() {
		const shuffledColours = shuffle(colours);
		datasets.forEach((dataset, index) => {
			dataset.data = randomDataSet();
			dataset.backgroundColor = shuffledColours[index];
		});
	};

	let tickOptions = {
		min: -100,
		max: 100
	};

	var timeout;

	var bubbleChart = new Chart.Bubble(ctx, {
		data: {
			datasets: datasets
		},
		options: {
			legend: {
				display: false
			},
			elements: {
				point: {
					borderColor: 'rgba(0,0,0,0)',
					hoverRadius: 0
				}
			},
			animation: {
				onComplete: () => {
					if (timeout) {
						clearTimeout(timeout);
					}

					timeout = setTimeout(()=>{
						randomize();
						bubbleChart.update();
					}, 1000);
				}
			},
			scales: {
				xAxes: [{
					display: false,
					ticks: tickOptions
				}],
				yAxes: [{
					display: false,
					ticks: tickOptions
				}]
			}
		}
	});
}
