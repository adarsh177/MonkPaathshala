import React, { useState } from 'react';
import './assignment.scss';
import { assignmentEconomics } from './Indivisual Assignment/indivisual-data';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { assignment } from './assignment-data';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import BaseDialogue from '../../../components/dialogues/BaseDialogue';
import CreateAssignment from '../../../components/dialogues/dialogueChild/CreateAssignment';
import AssignmentDetail from './Indivisual Assignment/AssignmentDetail';
import theme from '../../../ThemeConfig';
const Assignment = () => {
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
	const [assignmentDialog, setassignmentDialog] = useState(false);

	const assignmentDialogOpen = () => {
		setassignmentDialog(true);
	};
	const assignmentDialogClose = () => {
		setassignmentDialog(false);
	};

	return (
		<ThemeProvider theme={theme}>
			<div className="assignment">
				<div className="assignment-heading">
					<Title name="Assignments" />
					<ThemeProvider theme={theme2}>
						<Button variant="contained" color="primary" onClick={assignmentDialogOpen}>
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
				<BaseDialogue
					title="Assignment"
					child={<CreateAssignment />}
					open={assignmentDialog}
					handleClose={assignmentDialogClose}
				/>
				<AssignmentDetail name={assignmentEconomics} />
			</div>
		</ThemeProvider>
	);
};

export default Assignment;
