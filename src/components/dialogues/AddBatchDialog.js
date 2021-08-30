import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Config from '../../Config.json';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AddGroupToSubject, GetSubjects } from '../../database/TeacherManagement';

export default function AddBatchDialog(props) {
	const [selectedBranch, setSelectedBranch] = useState();
	const [selectedYear, setSelectedYear] = useState();
	const [branchError, setBranchError] = useState(false);
	const [yearError, setYearError] = useState(false);
	const selectedSubjectId = useSelector((state) => state.selectedSubject);
	const dispatch = useDispatch();

	const addBatch = () => {
		if (!selectedBranch) {
			setBranchError(true);
			return;
		}
		if (!selectedYear) {
			setYearError(true);
			return;
		}

		AddGroupToSubject(selectedSubjectId, `${selectedBranch}-${selectedYear}`)
			.then((bool) => {
				if (bool) {
					GetSubjects()
						.then((subs) => {
							dispatch({
								type: 'updateSubjectList',
								data: subs,
							});
						})
						.finally(() => {
							props.handleClose();
							dispatch({
								type: 'showAlert',
								data: {
									severity: 'success',
									text: 'Batch added successfully',
								},
							});
						});
				} else {
					dispatch({
						type: 'showAlert',
						data: {
							severity: 'error',
							text: 'Error adding batch',
						},
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error adding batch',
					},
				});
			});
	};

	useEffect(() => {
		if (props.open) {
			setSelectedBranch(null);
			setSelectedYear(null);
		}
	}, [props.open]);

	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			scroll="paper"
			aria-labelledby="Dialogue"
			aria-describedby="dialogue-body"
		>
			<DialogTitle id="scroll-dialog-title">Add Batch</DialogTitle>
			<DialogContent dividers="paper">
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
					<p>Select the branch and batch year you would like to add to this subject.</p>
					<FormControl variant="outlined">
						<InputLabel id="add-group-select-branch-label">Select Branch</InputLabel>
						<Select
							id="add-group-select-branch"
							labelId="add-group-select-branch-label"
							value={selectedBranch}
							error={branchError}
							onChange={(ev) => {
								setBranchError(false);
								setSelectedBranch(ev.target.value);
							}}
							label="Select Branch"
							name="branch"
						>
							{Object.keys(Config.branches).map((option) => (
								<MenuItem key={option} value={option}>
									{Config.branches[option]}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<br />

					<FormControl variant="outlined">
						<InputLabel id="add-group-select-year-label">Select Year</InputLabel>
						<Select
							id="add-group-select-year"
							labelId="add-group-select-year-label"
							value={selectedYear}
							error={yearError}
							onChange={(ev) => {
								setYearError(false);
								setSelectedYear(ev.target.value);
							}}
							label="Select Year"
							name="batch"
						>
							{Config.years.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} variant="contained" color="secondary">
					DISCARD
				</Button>
				<Button onClick={addBatch} variant="contained" color="primary">
					ADD
				</Button>
			</DialogActions>
		</Dialog>
	);
}
