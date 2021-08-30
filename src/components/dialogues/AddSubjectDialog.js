import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { AddSubject, GetSubjects } from '../../database/TeacherManagement';
import { useDispatch } from 'react-redux';

export default function AddSubjectDialogue(props) {
	const [subName, setSubName] = useState('');
	const dispatch = useDispatch();

	const addSubject = () => {
		if (subName.length < 3) {
			dispatch({
				type: 'showAlert',
				data: {
					severity: 'error',
					text: 'Enter a valid subject name',
				},
			});
			return;
		}

		AddSubject(subName)
			.then((subId) => {
				GetSubjects().then((subs) => {
					dispatch({
						type: 'updateSubjectList',
						data: subs,
					});
					dispatch({
						type: 'updateSelectedSubject',
						data: subId,
					});
					dispatch({
						type: 'showAlert',
						data: {
							severity: 'success',
							text: 'Subject Added successfully',
						},
					});
					props.handleClose();
				});
			})
			.catch((err) => {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error adding subject',
					},
				});
			});
	};

	useEffect(() => {
		if (props.open) {
			// clearing
			setSubName('');
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
			>
				<DialogTitle id="scroll-dialog-title">Add Subject</DialogTitle>
				<DialogContent dividers="paper">
					<TextField
						id="outlined-basic"
						label="Subject Name"
						variant="outlined"
						onChange={(ev) => setSubName(ev.target.value)}
						value={subName}
						placeholder="Subject Name"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} variant="contained" color="secondary">
						DISCARD
					</Button>
					<Button onClick={() => addSubject()} variant="contained" color="primary">
						ADD
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
