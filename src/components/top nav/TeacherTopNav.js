import React from 'react';
import Logo from '../../media/logo.png';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const subjects = [
	{
		value: 'Maths',
		label: 'Maths',
	},
	{
		value: 'English',
		label: 'English',
	},
	{
		value: 'Hindi',
		label: 'Hindi',
	},
	{
		value: 'SST',
		label: 'SST',
	},
];

const TeacherTopNav = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));

	const classes = useStyles();
	const [subject, setsubject] = React.useState('Maths');

	const handleChange = (event) => {
		setsubject(event.target.value);
	};

	return (
		<div>
			<div className="teacher-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<TextField
							className={classes.button}
							endIcon={<ArrowRightIcon />}
							id="outlined-select-subject-native"
							select
							label="Subject"
							value={subject}
							onChange={handleChange}
							SelectProps={{
								native: true,
							}}
							helperText="Please select your subject"
							variant="outlined"
						>
							{subjects.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</TextField>
					</div>
					<div className="nav-content-profile">
						<Button>
							<AccountCircleIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherTopNav;
