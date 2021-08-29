import React from 'react';
import './assignment.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { assignment } from './assignment-data';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
const Assignment = () => {
	const [index, setIndex] = React.useState(0);
	const theme2 = createTheme({
		palette: {
			primary: {
				main: '#279225',
			},
		},
	});
	const handleAddAssignment = () => {};
	return (
		<div className="assignment">
			<div className="assignment-heading">
				<Title name="Assignments" />
				<ThemeProvider theme={theme2}>
					<Button variant="contained" color="primary" onClick={handleAddAssignment}>
						+&nbsp;&nbsp;Add Assignment
					</Button>
				</ThemeProvider>
			</div>
			<div className="assignment-tab">
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
			<div className="assignment-list">
				{assignment.map((details) => {
					return (
						<div className="assignment-list-item">
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
	);
};

export default Assignment;
