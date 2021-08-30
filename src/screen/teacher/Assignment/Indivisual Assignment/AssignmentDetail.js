import React from 'react';
import { assignmentEconomics } from './indivisual-data';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './assignmentdetail.scss';

import theme from '../../../../ThemeConfig';

import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	ThemeProvider,
} from '@material-ui/core';
import Title from '../../../../components/Title/Title';
import { createTheme } from '@material-ui/core/styles';

const AssignmentDetail = (prop) => {
	return (
		<AssignmentDetailProp
			topic={prop.name.topic}
			startDate={prop.name.startDate}
			endDate={prop.name.endDate}
			question={prop.name.question}
			totalSubmissions={prop.name.totalSubmissions}
			submission={prop.name.submission}
		/>
	);
};

const AssignmentDetailProp = (props) => {
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
			<div className="assignment-detail">
				<div className="detail-heading">
					<Title name={props.topic} />
				</div>
				<div className="detail-date">
					<b>Date:&nbsp;</b>({props.startDate})&nbsp;-&nbsp;({props.endDate})
				</div>
				<div className="detail-question">{props.question}</div>
				<div className="detail-total-submission">
					<b>Total number of submissions:</b>&nbsp;{props.totalSubmissions}
				</div>
				<div className="detail-submission-list">
					<div className="list-title">List of Submissions:</div>
					<div className="list-of-submissions">
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name of Students</TableCell>
										<TableCell>Submission Date</TableCell>
										<TableCell>Submitted File</TableCell>
										<TableCell style={{ textAlign: 'center' }}>
											Remarks
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.submission.map((details) => {
										return (
											<TableRow>
												<TableCell>{details.name}</TableCell>
												<TableCell>{details.submissionDate}</TableCell>
												<TableCell>submit file</TableCell>
												<TableCell style={{ textAlign: 'center' }}>
													<span style={{ color: '#279225' }}>
														{details.remarks}
													</span>
													&nbsp;/&nbsp;10
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				</div>
				<ThemeProvider theme={theme2}>
					<div className="detail-action">
						<Button variant="contained" color="primary">
							Update
						</Button>
						<Button variant="contained" color="secondary">
							Delete
						</Button>
					</div>
				</ThemeProvider>
			</div>
		</ThemeProvider>
	);
};

export default AssignmentDetail;
