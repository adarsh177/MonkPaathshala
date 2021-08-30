import React from 'react';
import theme from '../../../ThemeConfig';
import { test } from './test-data';
import './test.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Title from '../../../components/Title/Title';
import IndivisualTest from './Indivisual Test/IndivisualTest';
import { indivisualtestdata } from './Indivisual Test/indivisualtestdata';
const Test = () => {
	const [index, setIndex] = React.useState(0);
	const theme2 = createTheme({
		palette: {
			primary: {
				main: '#279225',
			},
			secondary: {
				main: '#b20808',
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<div className="test">
				<div className="test-heading">
					<Title name="Test" />
					<ThemeProvider theme={theme2}>
						<Button variant="contained" color="primary">
							+&nbsp;&nbsp;Add Test
						</Button>
					</ThemeProvider>
				</div>
				<div className="test-tab">
					<Button
						className={`tab-item ${index === 0 && 'active-change'}`}
						onClick={() => {
							setIndex(0);
						}}
					>
						<FiberManualRecordIcon className="current-dot"></FiberManualRecordIcon>
						&nbsp;&nbsp;Current
					</Button>
					<Button
						className={`tab-item ${index === 1 && 'active-change'}`}
						onClick={() => {
							setIndex(1);
						}}
					>
						<FiberManualRecordIcon className="complete-dot"></FiberManualRecordIcon>
						&nbsp;&nbsp;Completed
					</Button>
				</div>
				<div className="test-list">
					{test.map((details) => {
						return (
							<div className="test-list-item">
								<div className="topic">
									<b>Topic:</b>&nbsp;{details.topic}
								</div>
								<div className="date">
									<b>Date:</b>&nbsp;({details.startDate})-({details.endDate})
								</div>
								<div className="detail">
									<Router color="primary">
										<Link to={`/${details.id}`}>
											<Button onClick={() => {}}>
												Show Details&nbsp;&nbsp;
												<ArrowRightAltIcon />
											</Button>
										</Link>
									</Router>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{/* <IndivisualTest name={indivisualtestdata} /> */}
		</ThemeProvider>
	);
};

export default Test;
