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
						title: {
							display: true,
							text: "Users Gained between 2016-2020",
							color: "#333333"
						},
						legend: {
							display: false
						}
					},
					scales: {
						x: {
							ticks: {
								color: "#333333", // X-axis number color
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