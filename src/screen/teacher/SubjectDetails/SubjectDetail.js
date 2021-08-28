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

const SubjectDetail = () => {
	const [deleteDialogue, setDeleteDialogue] = useState(false);
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
					<Button variant="contained" color="primary" className="add-batch">
						+&nbsp;&nbsp;Add Batch
					</Button>
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
				<div className="delete-subject">
					<Button variant="contained" color="secondary">
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
		</ThemeProvider>
	);
};

export default SubjectDetail;
