import React, { useState } from 'react';
import Title from '../../../components/Title/Title';
import { subjectDetailData } from './subjectDetailData';
import DeleteIcon from '@material-ui/icons/Delete';
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
	const [deleteDialogue, setDeleteDialogue] = useState(false);
	const [showAddGroup, setShowAddGroup] = useState(false);

	const handleDeleteOpen = () => {
		setDeleteDialogue(true);
	};
	const handleDeleteClose = () => {
		setDeleteDialogue(false);
	};

	const theme = createTheme({
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
			<div classname="subjectdetail">
				<div className="subject-heading">
					<Title name="Engineering Economics" />
					<Button
						variant="contained"
						color="primary"
						className="add-batch"
						onClick={() => setShowAddGroup(true)}
					>
						+&nbsp;&nbsp;Add Batch
					</Button>
				</div>
				<br />
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Batch</TableCell>
								<TableCell>No. of Students</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{subjectDetailData.map((details) => {
								return (
									<TableRow>
										<TableCell>
											{details.branch}&nbsp;{details.batchyear}
										</TableCell>
										<TableCell>{details.students}</TableCell>
										<TableCell>
											<Button
												className="table-content-item"
												onClick={handleDeleteOpen}
												color="secondary"
											>
												<DeleteIcon />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<div className="delete-subject-button">
					<Button variant="contained" color="secondary" onClick={handleDeleteOpen}>
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
			<BaseDialogue
				open={showAddGroup}
				handleClose={() => {
					setShowAddGroup(false);
				}}
				title="Add Group"
				positiveButtonTitle="Add Group"
				child={<AddBranchAndBatchChild />}
			/>
		</ThemeProvider>
	);
};

export default SubjectDetail;
