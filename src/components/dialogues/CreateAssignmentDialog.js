import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAssignment } from '../../database/TeacherManagement';

export default function CreateAssignmentDialogue(props) {
	// responsive dialog------------------------------------------
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [fieldErrors, setFieldErrors] = useState({});
	const selectedSubject = useSelector((state) => state.selectedSubject);

	const useStyles = makeStyles((theme) => ({
		container: {
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			margin: '10px',
		},
	}));

	const classes = useStyles();

	const createAssignmentClicked = () => {
		if (!data.title || data.title.length === 0) {
			setFieldErrors((fe) => ({ ...fe, title: true }));
			return;
		}

		if (!data.question || data.question.length === 0) {
			setFieldErrors((fe) => ({ ...fe, question: true }));
			return;
		}

		if (!data.startDateDt) {
			setFieldErrors((fe) => ({ ...fe, startDate: true }));
			return;
		}

		if (!data.endDateDt) {
			setFieldErrors((fe) => ({ ...fe, endDate: true }));
			return;
		}

		if (data.startDateDt.getTime() > data.endDateDt.getTime()) {
			dispatch({
				type: 'showAlert',
				data: {
					severity: 'error',
					text: 'Please select End date greater than start date',
				},
			});
			setFieldErrors((fe) => ({ ...fe, endDate: true }));
			return;
		}

		// creating assignment
		const finalData = {
			title: data.title,
			question: data.question,
			startDate: data.startDateDt.getTime(),
			endDate: data.endDateDt.getTime(),
		};

		CreateAssignment(selectedSubject, finalData).then((rslt) => {
			if (rslt) {
				props.updateAssignmentList();
				props.handleClose();
			} else {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error creating assignment at the moment',
					},
				});
			}
		});
	};

	useEffect(() => {
		if (props.open) {
			setData({});
		}
	}, [props.open]);

	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				scroll="paper"
				aria-labelledby="Dialogue"
				aria-describedby="dialogue-body"
				fullScreen={fullScreen}
			>
				<DialogTitle id="scroll-dialog-title">Create Assignment</DialogTitle>
				<DialogContent dividers="paper">
					<div className={classes.container}>
						<div>
							<TextField
								id="outlined-basic"
								label="Topic"
								variant="outlined"
								className={classes.textField}
								value={data.title}
								onChange={(ev) => {
									setFieldErrors((fe) => ({ ...fe, title: false }));
									setData((dt) => ({
										...dt,
										title: ev.target.value,
									}));
								}}
								error={fieldErrors.title}
								fullWidth
							/>

							<TextField
								id="outlined-multiline-static"
								label="Question"
								multiline
								rows={6}
								variant="outlined"
								value={data.question}
								onChange={(ev) => {
									setFieldErrors((fe) => ({ ...fe, question: false }));
									setData((dt) => ({
										...dt,
										question: ev.target.value,
									}));
								}}
								className={classes.textField}
								error={fieldErrors.question}
								fullWidth
							/>

							<TextField
								id="date"
								label="Start Date"
								type="date"
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
								value={data.startDate}
								onChange={(ev) => {
									setFieldErrors((fe) => ({ ...fe, startDate: false }));
									setData((dt) => ({
										...dt,
										startDate: ev.target.value,
										startDateDt: ev.target.valueAsDate,
									}));
								}}
								error={fieldErrors.startDate}
								className={classes.textField}
								fullWidth
							/>

							<TextField
								id="date"
								label="End Date"
								type="date"
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
								value={data.endDate}
								onChange={(ev) => {
									setFieldErrors((fe) => ({ ...fe, endDate: false }));
									setData((dt) => ({
										...dt,
										endDate: ev.target.value,
										endDateDt: ev.target.valueAsDate,
									}));
								}}
								error={fieldErrors.endDate}
								className={classes.textField}
								fullWidth
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} variant="contained" color="secondary">
						DISCARD
					</Button>
					<Button onClick={createAssignmentClicked} variant="contained" color="primary">
						CREATE
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
