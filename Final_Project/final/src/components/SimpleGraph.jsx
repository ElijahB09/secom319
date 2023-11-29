import React, { useState, useEffect, useRef } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const SimpleGraph = ({ data, forecastLine, setForecastLine }) => {
	const [previousYears, setPreviousYears] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const resize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', resize);
		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	const chartRef = useRef(null);

	return (
		<>
			<ResponsiveContainer height={500}>
				<LineChart
					margin={{
						top: 26,
						right: 16,
						bottom: 15,
						left: windowWidth < 1500 ? -16 : 24,
					}}
				>
					<CartesianGrid opacity={0.3} stroke={windowWidth < 1500 ? 'white' : 'black'} vertical={false} />
					<Legend
						layout={windowWidth < 1500 ? 'horizontal' : 'vertical'}
						verticalAlign="top"
						align="right"
						wrapperStyle={{
							paddingLeft: '32px',
							paddingBottom: '32px',
						}}
					/>
					<XAxis
						dataKey="month"
						stroke="black"
						allowDuplicatedCategory={false}
						tickMargin={15}
					/>
					<YAxis
						stroke="black"
						tickMargin={15}
						domain={[0, 100]}
					/>
					{/* Other components like ReferenceLine, Tooltip, etc. can be added as needed */}
					<Line
						data={data}
						name="Example Line"
						isAnimationActive={false}
						dataKey="pbh"
						dot={false}
						stroke="blue"
						strokeWidth={previousYears ? 2 : 0}
					/>
				</LineChart>
			</ResponsiveContainer>

			<div>
				{/* Additional controls */}
				<label>
					Show previous years
					<input
						type="checkbox"
						checked={previousYears}
						onChange={() => setPreviousYears(!previousYears)}
					/>
				</label>

				<label>
					Show forecast
					<input
						type="checkbox"
						checked={forecastLine}
						onChange={() => setForecastLine(!forecastLine)}
					/>
				</label>
			</div>
		</>
	);
};

export default SimpleGraph;