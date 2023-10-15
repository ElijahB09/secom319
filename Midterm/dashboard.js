/* globals Chart:false */
let temperatures = null;
let snowflake = document.getElementById('weather-snowflake');
let sun = document.getElementById('weather-sun');
let upButton = document.getElementById('upButton');
let downButton = document.getElementById('downButton');
let tempText = document.getElementById('temp-text');

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
	averageTmp = averageTmp / temperatures?.data.length;
	setImage(averageTmp);
	tempText.innerHTML = `${Math.trunc(averageTmp)}°F`;

	// Graphs
	const ctx = document.getElementById('myChart')
	// eslint-disable-next-line no-unused-vars

	const myChart = new Chart(ctx, chartJson)
}

function setImage(temp) {
	sun.style.display = 'none';
	snowflake.style.display = 'none';
	let weatherIcon = temp > 50 ? sun : snowflake;
	console.log(temp);
	if (temp > 80) {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'red';

	} else if (temp > 50) {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'cornflowerblue';
	} else {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'blue';

	}
}

upButton.addEventListener('click', () => {
	let temp = parseInt(tempText.innerHTML.substring(0, tempText.innerHTML.length-2));
	temp += 10;
	tempText.innerHTML = `${temp}°F`;
	setImage(temp);
});

downButton.addEventListener('click', () => {
	let temp = parseInt(tempText.innerHTML.substring(0, tempText.innerHTML.length-2));
	temp -= 10;
	tempText.innerHTML = `${temp}°F`;
	setImage(temp);
});
