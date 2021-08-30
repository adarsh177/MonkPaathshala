import React from 'react';
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
import { createTheme } from '@material-ui/core/styles';
import Title from '../../../../components/Title/Title';
import TeacherTopNav from '../../../../components/top nav/TeacherTopNav';

const IndivisualTest = (prop) => {
	return (
		<>
			<TeacherTopNav />
			<IndivisualTestProp
				topic={prop.name.topic}
				startDate={prop.name.startDate}
				endDate={prop.name.endDate}
				question={prop.name.question}
				totalAppearedStudents={prop.name.totalAppearedStudents}
				submissionDateTime={prop.name.submissionDateTime}
				submission={prop.name.submission}
			/>
		</>
	);
};
const IndivisualTestProp = (props) => {
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
					<b>Total number of students appeared:</b>&nbsp;{props.totalAppearedStudents}
				</div>
				<div className="detail-submission-list">
					<div className="list-title">List of Submissions:</div>
					<div className="list-of-submissions">
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Name of Students</TableCell>
										<TableCell>Submission Time</TableCell>
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
												<TableCell>{details.submissionDateTime}</TableCell>
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

export default IndivisualTest;
