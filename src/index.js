import Chart from 'chart.js';

Chart.defaults.global.tooltips.enabled = false;

import backgroundBars from './charts/backgroundBars';


backgroundBars(document.getElementById('background-bar').getContext('2d'));
