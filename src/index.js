import Chart from 'chart.js';

Chart.defaults.global.tooltips.enabled = false;

import backgroundBars from './charts/backgroundBars';
// import chartLogo from './charts/chartLogo';
import mixedTypes from './charts/mixedTypes';
import axisTypes from './charts/axisTypes';
import animatedChart from './charts/animatedChart';


backgroundBars(document.getElementById('background-bar').getContext('2d'));
// chartLogo(document.getElementById('logo-chart').getContext('2d'));
mixedTypes(document.getElementById('mixed-chart').getContext('2d'));
axisTypes(document.getElementById('axis-chart').getContext('2d'));
animatedChart(document.getElementById('animate-chart').getContext('2d'));
