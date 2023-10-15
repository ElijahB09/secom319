/* globals Chart:false */
let temperatures = null;
let snowflake = document.getElementById('snowflake-graph');
let chartJson = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			data: [],
			lineTension: 0,
			backgroundColor: 'transparent',
			borderColor: '#007bff',
			borderWidth: 4,
			pointBackgroundColor: '#007bff'
		}]
	},
	options: {
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				boxPadding: 3
			}
		}
	}
}

fetch('./dummyData.json')
	.then(response => response.json())
	.then(data => {
		temperatures = data;
		initializeChart();
	});

function initializeChart() {
	let averageTmp = 0;
	temperatures?.data.forEach((tempObj) => {
		averageTmp += tempObj.temperature_f;
		let tempDate = new Date(tempObj.time);
		chartJson.data.labels.push(tempDate.toLocaleDateString());
		chartJson.data.datasets[0].data.push(tempObj.temperature_f);
	});
	averageTmp = averageTmp/temperatures?.data.length;
	if(averageTmp > 80) {
		snowflake.classList.add('red-snowflake');
	} else if (averageTmp > 50) {
		snowflake.classList.add('light-blue-snowflake')
	} else {
		snowflake.classList.add('blue-snowflake');
	}

	// Graphs
	const ctx = document.getElementById('myChart')
	// eslint-disable-next-line no-unused-vars

	const myChart = new Chart(ctx, chartJson)
}
