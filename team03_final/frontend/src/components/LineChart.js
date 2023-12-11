// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
function LineChart(props) {
	return (
		<div className="chart-container" style={{ width: "40%", margin: "auto" }}>
			<h2 style={{ textAlign: "center" }}>{props.title}</h2>
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
								color: "#CCCCCC", // X-axis grid line color
							},
						},
						y: {
							ticks: {
								color: "#333333"
							},
							grid: {
								color: "#CCCCCC", // Y-axis grid line color
							},
						},
					},
				}}
			/>
		</div>
	);
}
export default LineChart;