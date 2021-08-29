import React, { useState } from 'react';
import Title from '../../../components/Title/Title';
import { subjectDetailData } from './subjectDetailData';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, ThemeProvider } from '@material-ui/core';
import theme from '../../../ThemeConfig';
import { createTheme } from '@material-ui/core/styles';
import './subject.scss';

//base dialog component --------------------------------

import ConfirmationBaseDialog from '../../../components/dialogues/ConfirmationBaseDialog';

//child dialog component --------------------------------
import DeleteChild from '../../../components/dialogues/dialogueChild/DeleteChild';
import BaseDialogue from '../../../components/dialogues/BaseDialogue';
import AddSubjectChild from '../../../components/dialogues/dialogueChild/AddSubjectChild';
import AddBranchAndBatchChild from '../../../components/dialogues/dialogueChild/AddBranchAndBatchChild';

const SubjectDetail = () => {
	// delete a single batch from subject--------------------------------
	const [deleteDialogue, setDeleteDialogue] = useState(false);
	const handleDeleteOpen = () => {
		setDeleteDialogue(true);
	};
	const handleDeleteClose = () => {
		setDeleteDialogue(false);
	};

	// delete subject -------------------------------
	const [deleteSubjectDialogue, setDeleteSubjectDialogue] = useState(false);
	const handleDeleteSubjectOpen = () => {
		setDeleteSubjectDialogue(true);
	};
	const handleDeleteSubjectClose = () => {
		setDeleteSubjectDialogue(false);
	};

	// Add batch subject -------------------------------
	const [addBatchDialogue, setaddBatchDialogue] = useState(false);
	const handleaddBatchOpen = () => {
		setaddBatchDialogue(true);
	};
	const handleaddBatchClose = () => {
		setaddBatchDialogue(false);
	};

	const theme2 = createTheme({
		palette: {
			primary: {
				main: '#279225',
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<div classname="subjectdetail">
				<div className="subject-heading">
					<Title name="Engineering Economics" />
					<ThemeProvider theme={theme2}>
						<Button
							variant="contained"
							color="primary"
							className="add-batch"
							onClick={handleaddBatchOpen}
						>
							+&nbsp;&nbsp;Add Batch
						</Button>
					</ThemeProvider>
				</div>
				<div className="subject-table">
					<div className="subject-table-heading">
						<div className="table-heading-item">Batch</div>
						<div className="table-heading-item">No. of Students</div>
						<div className="table-heading-item">Action</div>
					</div>
					{subjectDetailData.map((details) => {
						return (
							<div className="subject-table-content">
								<div className="table-content-item">
									{details.branch}&nbsp;{details.batchyear}
								</div>
								<div className="table-content-item">{details.students}</div>
								<Button
									className="table-content-item"
									onClick={handleDeleteOpen}
									color="secondary"
								>
									<DeleteIcon />
								</Button>
							</div>
						);
					})}
				</div>
				<div className="delete-subject-button">
					<Button variant="contained" color="secondary" onClick={handleDeleteSubjectOpen}>
						Delete Subject
					</Button>
				</div>
			</div>
			<ConfirmationBaseDialog
				action="Delete"
				child={<DeleteChild />}
				open={deleteDialogue}
				handleClose={handleDeleteClose}
			/>
			<ConfirmationBaseDialog
				action="Delete"
				child={<DeleteChild />}
				open={deleteSubjectDialogue}
				handleClose={handleDeleteSubjectClose}
			/>
			<BaseDialogue
				open={addBatchDialogue}
				handleClose={handleaddBatchClose}
				title="Add Batch"
				child={<AddBranchAndBatchChild />}
			/>
		</ThemeProvider>
	);
};

export default SubjectDetail;
