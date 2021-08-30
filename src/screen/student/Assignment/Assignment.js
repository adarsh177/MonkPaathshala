import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import '../../teacher/Assignment/assignment.scss';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { assignment } from '../../teacher/Assignment/assignment-data';
import { economicsAssignment } from './Indivisual Assignment/data-indivisual';
import IndivisualAssignment from './Indivisual Assignment/IndivisualAssignment';
const Assignment = () => {
	const [index, setIndex] = React.useState(0);

	return (
		<div className="assignment">
			<div className="assignment-heading">
				<Title name="Assignments" />
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
			<IndivisualAssignment name={economicsAssignment} />
		</div>
	);
};

export default Assignment;
