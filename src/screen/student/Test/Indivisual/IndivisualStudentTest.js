import React from 'react';
import theme from '../../../../ThemeConfig';
import { Button, TextField, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Title from '../../../../components/Title/Title';
import StudentTopNav from '../../../../components/top nav/StudentTopNav';

const IndivisualStudentTest = (prop) => {
	return (
		<>
			<StudentTopNav />
			<IndivisualStudentTestProp
				topic={prop.name.topic}
				startDate={prop.name.startDate}
				endDate={prop.name.endDate}
				question={prop.name.question}
				grade={prop.name.grade}
			/>
		</>
	);
};
const IndivisualStudentTestProp = (props) => {
	const theme2 = createTheme({
		palette: {
			primary: {
				main: '#279225',
			},
			secondary: {
				main: '#002D9F',
			},
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<div className="detail-test">
				<div className="detail-heading">
					<Title name={props.topic} />
				</div>
				<div className="detail-date">
					<b>Date:&nbsp;</b>({props.startDate})&nbsp;-&nbsp;({props.endDate})
				</div>
				<div className="detail-question">{props.question}</div>
				<div className="detail-remaining-time">
					<b>Exam starts in:&nbsp;</b>
				</div>
				<div className="detail-remaining-time">
					<b>Time Remaining of Submission:&nbsp;</b>
				</div>
				<div className="detail-submitted-file">
					<b>Submitted File:&nbsp;</b>
				</div>
				<div className="detail-grade">
					<b>Grade:&nbsp;</b>
					{props.grade}&nbsp;/&nbsp;10
				</div>
				<ThemeProvider theme={theme2}>
					<div className="detail-action">
						<Button variant="contained" color="primary" onClick={() => {}}>
							<label for="editTestsubmission">Edit Submission</label>
						</Button>
						<input
							type="file"
							accept=".pdf,.doc,.docx"
							id="editTestsubmission"
							style={{ display: 'none' }}
						/>
						<Button variant="contained" color="secondary" onClick={() => {}}>
							<label for="UploadTestFile">Upload File</label>
						</Button>
						<input
							type="file"
							accept=".pdf,.doc,.docx"
							id="UploadTestFile"
							style={{ display: 'none' }}
						/>
					</div>
				</ThemeProvider>
			</div>
		</ThemeProvider>
	);
};

export default IndivisualStudentTest;
