import Chart from 'chart.js';

Chart.defaults.global.tooltips.enabled = false;

import backgroundBars from './charts/backgroundBars';
import axisTypes from './charts/axisTypes';

backgroundBars(document.getElementById('background-bar').getContext('2d'));
axisTypes(document.getElementById('axis-chart').getContext('2d'));
