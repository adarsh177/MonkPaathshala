import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

function CreateAssignment() {
	//date picker -------------------------------

	const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	const useStyles = makeStyles((theme) => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: 500,
			margin: '10px 0',
		},
	}));
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<TextField
				id="outlined-basic"
				label="Topic"
				variant="outlined"
				className={classes.textField}
			/>
			<br />

			<TextField
				id="outlined-multiline-static"
				label="Question"
				multiline
				rows={6}
				variant="outlined"
				className={classes.textField}
			/>
			<br />
			<TextField
				id="date"
				label="Start Date"
				type="date"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
				className={classes.textField}
			/>

			<TextField
				id="date"
				label="End Date"
				type="date"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
				className={classes.textField}
			/>
		</div>
	);
}

export default CreateAssignment;
