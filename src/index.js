import Chart from 'chart.js';


import backgroundBars from './charts/backgroundBars';
import mixedTypes from './charts/mixedTypes';
import axisTypes from './charts/axisTypes';
import animatedChart from './charts/animatedChart';
import render from './docs.js';


(()=>{
	// If we're on the docs page render the docs blocks
	// else we'll render the homepage chart visuals
	if (document.location.pathname.match(/\/docs/)){
		render('bar-chart', [2,0]);
		render('line-chart', [2,1]);
		render('radar-chart');
		render('polar-area-chart');
		render('doughnut-pie-chart', [2, 0]);
		render('doughnut-pie-chart', [2, 1], 1);
	}
	else {
		Chart.defaults.global.tooltips.enabled = false;
		backgroundBars(document.getElementById('background-bar').getContext('2d'));
		mixedTypes(document.getElementById('mixed-chart').getContext('2d'));
		axisTypes(document.getElementById('axis-chart').getContext('2d'));
		animatedChart(document.getElementById('animate-chart').getContext('2d'));
	}
})();
