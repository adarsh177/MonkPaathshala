import React from 'react';
import theme from '../../../../ThemeConfig';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Title from '../../../../components/Title/Title';
import './indivisual.scss';
import StudentTopNav from '../../../../components/top nav/StudentTopNav';

const IndivisualAssignment = (prop) => {
	return (
		<>
			<StudentTopNav />
			<IndivisualAssignmentProp
				topic={prop.name.topic}
				startDate={prop.name.startDate}
				endDate={prop.name.endDate}
				question={prop.name.question}
				grade={prop.name.grade}
			/>
		</>
	);
};

const IndivisualAssignmentProp = (props) => {
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
			<div className="detail-assignment">
				<div className="detail-heading">
					<Title name={props.topic} />
				</div>
				<div className="detail-date">
					<b>Date:&nbsp;</b>({props.startDate})&nbsp;-&nbsp;({props.endDate})
				</div>
				<div className="detail-question">{props.question}</div>
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
							Edit Submission
						</Button>
						<Button variant="contained" color="secondary" onClick={() => {}}>
							Upload File
						</Button>
					</div>
				</ThemeProvider>
			</div>
		</ThemeProvider>
	);
};

export default IndivisualAssignment;
