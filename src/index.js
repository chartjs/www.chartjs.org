import Chart from 'chart.js/auto';

import backgroundBars from './charts/backgroundBars';
import mixedTypes from './charts/mixedTypes';
import axisTypes from './charts/axisTypes';
import animatedChart from './charts/animatedChart';
import v3anims from './charts/v3anims';
import v3perf from './charts/v3perf';
import v31segments from './charts/v31segments';
import v34subtitle from './charts/v34subtitle';
import v35box from './charts/v35box';

(()=>{
  Chart.defaults.plugins.tooltip.enabled = false;
  backgroundBars(document.getElementById('background-bar').getContext('2d'));
  mixedTypes(document.getElementById('mixed-chart').getContext('2d'));
  axisTypes(document.getElementById('axis-chart').getContext('2d'));
  animatedChart(document.getElementById('animate-chart').getContext('2d'));
  v3anims('v3anims');
  v3perf('v3perf');
  v31segments('v31segments');
  v34subtitle('v34subtitle');
  v35box('v35box');
})();
