/* globals Chart:false */
let temperatures = null;
let snowflake = document.getElementById('weather-snowflake');
let sun = document.getElementById('weather-sun');
let upButton = document.getElementById('upButton');
let downButton = document.getElementById('downButton');
let tempText = document.getElementById('temp-text');
let tempTable = document.getElementById('temp-table');
let tempRow = document.createElement('tr');
let interval = 0;
let lineGraph;

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

getData();
setInterval(getData, 5000);

function getData() {
	fetch('./data.json')
		.then(response => response.json())
		.then(data => {
			temperatures = data;
			initializeChart();
			loadTable();
			interval++;
		});
}


function initializeChart() {
	if (interval !== 0) {
		lineGraph.destroy();
		chartJson.data.labels = [];
		chartJson.data.datasets[0].data = [];
	}
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
	let ctx = document.getElementById('myChart')
	// eslint-disable-next-line no-unused-vars

	lineGraph = new Chart(ctx, chartJson)
}

function loadTable() {
	while (tempTable.firstChild) {
		tempTable.removeChild(tempTable.firstChild);
	}

	temperatures?.data.forEach((tempObj) => {
		let tempDate = new Date(tempObj.time);
		tempRow = document.createElement('tr');
		let cellDate = document.createElement('td');
		cellDate.textContent = tempDate.toLocaleDateString();
		tempRow.appendChild(cellDate);

		let cellTempF = document.createElement('td');
		cellTempF.textContent = tempObj.temperature_f;
		tempRow.appendChild(cellTempF);

		let cellTempC = document.createElement('td');
		cellTempC.textContent = tempObj.temperature_c;
		tempRow.appendChild(cellTempC);

		let cellHumidity = document.createElement('td');
		cellHumidity.textContent = tempObj.humidity;
		tempRow.appendChild(cellHumidity);

		tempTable.appendChild(tempRow);

		chartJson.data.labels.push(tempDate.toLocaleDateString());
		chartJson.data.datasets[0].data.push(tempObj.temperature_f);
	});
}

function setImage(temp) {
	sun.style.display = 'none';
	snowflake.style.display = 'none';
	let weatherIcon = temp > 75 ? sun : snowflake;
	console.log(temp);
	if (temp > 75) {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'red';

	} else if (temp > 60) {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'cornflowerblue';
	} else {
		weatherIcon.style.display = 'block';
		weatherIcon.style.fill = 'blue';

	}
}

upButton.addEventListener('click', () => {
	let temp = parseInt(tempText.innerHTML.substring(0, tempText.innerHTML.length - 2));
	temp += 10;
	tempText.innerHTML = `${temp}°F`;
	setImage(temp);
});

downButton.addEventListener('click', () => {
	let temp = parseInt(tempText.innerHTML.substring(0, tempText.innerHTML.length - 2));
	temp -= 10;
	tempText.innerHTML = `${temp}°F`;
	setImage(temp);
});
