// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
function LineChart(props) {
	return (
		<div className="chart-container" style={{ margin: "auto" }}>
			<h2 style={{ textAlign: "center", color: "#cecfcf" }}>{props.title}</h2>
			<Line
				data={props.chartData}
				options={{
					plugins: {
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							ticks: {
								display: false,
							},
							grid: {
								color: "#cecfcf", // X-axis grid line color
							},
						},
						y: {
							ticks: {
								color: "#cecfcf"
							},
							grid: {
								color: "#cecfcf", // Y-axis grid line color
							},
						},
					},
				}}
			/>
		</div>
	);
}
export default LineChart;