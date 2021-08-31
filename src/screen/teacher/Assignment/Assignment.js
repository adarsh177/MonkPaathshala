import React, { useEffect, useState } from 'react';
import './assignment.scss';
import { assignmentEconomics } from './Indivisual Assignment/indivisual-data';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { assignment } from './assignment-data';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import AssignmentDetail from './Indivisual Assignment/AssignmentDetail';
import theme from '../../../ThemeConfig';
import CreateAssignmentDialogue from '../../../components/dialogues/CreateAssignmentDialog';
import { GetFinishedAssignments, GetOngoingAssignments } from '../../../database/TeacherManagement';
import { useSelector } from 'react-redux';
const Assignment = () => {
	const [index, setIndex] = React.useState(0);
	const [ongoingAssignments, setOngoingAssignments] = useState([]);
	const [finishedAssignments, setFinishedssignments] = useState([]);
	const selectedSubject = useSelector((state) => state.selectedSubject);
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

	const loadAssignments = () => {
		GetOngoingAssignments(selectedSubject).then((asmts) => {
			console.log('Ongoing', asmts);
			setOngoingAssignments(asmts ? asmts : []);
		});
		GetFinishedAssignments(selectedSubject).then((asmts) => {
			console.log('Finished', asmts);
			setFinishedssignments(asmts ? asmts : []);
		});
	};

	useEffect(() => {
		loadAssignments();
	}, [selectedSubject]);

	return (
		<ThemeProvider theme={theme}>
			<div className="assignment">
				<div className="assignment-heading">
					<Title name="Assignments" />
					<ThemeProvider theme={theme2}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setassignmentDialog(true)}
						>
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
						&nbsp;&nbsp;Ongoing
					</Button>
					<Button
						className={`tab-item ${index === 1 && 'active-change'}`}
						onClick={() => {
							setIndex(1);
						}}
					>
						<FiberManualRecordIcon className="complete-dot"></FiberManualRecordIcon>
						&nbsp;&nbsp;Finished
					</Button>
				</div>
				<div className="assignment-list">
					{(index === 0 ? ongoingAssignments : finishedAssignments).map((details) => {
						return (
							<div key={details.assignmentId} className="assignment-list-item">
								<div className="topic">
									<b>Topic:</b>&nbsp;{details.title}
								</div>
								<div className="date">
									<b>Date:</b>&nbsp;({new Date(details.startDate).toDateString()}
									)-({new Date(details.endDate).toDateString()})
								</div>
								<div className="detail">
									<Router color="primary">
										<Link to={`/${details.id}`}>
											<Button
												onClick={() => {
													console.log('Open: ', details.assignmentId);
												}}
											>
												Show Details&nbsp;&nbsp;
												<ArrowRightAltIcon />
											</Button>
										</Link>
									</Router>
								</div>
							</div>
						);
					})}
					{(index === 0 && ongoingAssignments.length === 0) ||
					(index === 1 && finishedAssignments.length === 0) ? (
						<h3>No {index === 0 ? 'Ongoing' : 'Finished'} Assignment Found</h3>
					) : null}
				</div>
				<CreateAssignmentDialogue
					open={assignmentDialog}
					handleClose={() => setassignmentDialog(false)}
					updateAssignmentList={loadAssignments}
				/>
			</div>
		</ThemeProvider>
	);
};

export default Assignment;
