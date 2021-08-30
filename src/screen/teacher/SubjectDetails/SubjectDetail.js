import React, { Fragment, useEffect, useState } from 'react';
import Title from '../../../components/Title/Title';
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
import Config from '../../../Config.json';

//base dialog component --------------------------------

import ConfirmationBaseDialog from '../../../components/dialogues/ConfirmationBaseDialog';

//child dialog component --------------------------------
import DeleteChild from '../../../components/dialogues/dialogueChild/DeleteChild';
import BaseDialogue from '../../../components/dialogues/BaseDialogue';
import AddSubjectChild from '../../../components/dialogues/dialogueChild/AddSubjectChild';
import { useDispatch, useSelector } from 'react-redux';
import AddBatchDialog from '../../../components/dialogues/AddBatchDialog';
import {
	DeleteSubject,
	GetSubjects,
	RemoveGroupFromSubject,
} from '../../../database/TeacherManagement';

const SubjectDetail = () => {
	// delete a single batch from subject--------------------------------
	const [showDeleteDialog, setShowDeleteDialog] = useState(null);
	const selectedSubject = useSelector((state) => state.selectedSubject);
	const subjects = useSelector((state) => state.subjects);
	const dispatch = useDispatch();

	const selectedSubjectInfo = () => {
		const sub = subjects ? subjects.filter((sub) => sub.subjectId === selectedSubject)[0] : {};
		return sub ? sub : {};
	};

	const deleteSubject = () => {
		DeleteSubject(selectedSubject)
			.then(() => {
				GetSubjects().then((subs) => {
					dispatch({
						type: 'updateSubjectList',
						data: subs,
					});
					dispatch({
						type: 'updateSelectedSubject',
						data: subs[0] ? subs[0].subjectId : null,
					});
					dispatch({
						type: 'showAlert',
						data: {
							severity: 'success',
							text: 'Subject deleted successfully',
						},
					});
				});
			})
			.catch((err) => {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error deleting subject',
					},
				});
			});
	};

	const deleteBatch = (id) => {
		RemoveGroupFromSubject(selectedSubject, id)
			.then(() => {
				GetSubjects().then((subs) => {
					dispatch({
						type: 'updateSubjectList',
						data: subs,
					});
					dispatch({
						type: 'showAlert',
						data: {
							severity: 'success',
							text: 'Group removed from this subject',
						},
					});
				});
			})
			.catch((err) => {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error deleting group',
					},
				});
			})
			.finally(() => {
				setShowDeleteDialog(null);
			});
	};

	const getBatchnameFromId = (id = '') => {
		const branchId = id.split('-')[0];
		const year = id.split('-')[1];
		return `${Config.branches[branchId]} - ${year}`;
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
			secondary: {
				main: '#b20808',
			},
		},
	});

	// useEffect(() => {

	// }, [selectedSubject, subjects]);

	if (!selectedSubject) {
		return <h1>Please Select a subject</h1>;
	}

	return (
		<ThemeProvider theme={theme}>
			<div classname="subjectdetail">
				<div className="subject-heading">
					<Title name={selectedSubjectInfo() ? selectedSubjectInfo().name || '' : ''} />
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
				<br />
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Batch</TableCell>
								{/* <TableCell>No. of Students</TableCell> */}
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{selectedSubjectInfo().groups
								? selectedSubjectInfo().groups.map((groupId) => {
										return (
											<TableRow>
												<TableCell>{getBatchnameFromId(groupId)}</TableCell>
												{/* <TableCell>{details.students}</TableCell> */}
												<TableCell>
													<Button
														className="table-content-item"
														onClick={() => setShowDeleteDialog(groupId)}
														color="secondary"
													>
														<DeleteIcon />
													</Button>
												</TableCell>
											</TableRow>
										);
								  })
								: null}
						</TableBody>
					</Table>

					{/* not group placeholder */}
					{!selectedSubjectInfo().groups || selectedSubjectInfo().groups.length === 0 ? (
						<p
							style={{
								width: '100%',
								textAlign: 'center',
								margin: '20px 0',
								fontSize: '1.2em',
							}}
						>
							No batch added yet! Add Student Batch from button above
						</p>
					) : null}
				</TableContainer>
				<div className="delete-subject-button">
					<Button
						variant="contained"
						color="secondary"
						onClick={() => setDeleteSubjectDialogue(true)}
					>
						Delete Subject
					</Button>
				</div>
			</div>
			<ConfirmationBaseDialog
				action="Delete"
				child={<h3>Are you sure?</h3>}
				open={showDeleteDialog}
				handleClose={() => setShowDeleteDialog(null)}
				onClick={() => deleteBatch(showDeleteDialog)}
			/>
			<ConfirmationBaseDialog
				action="Delete"
				child={
					<Fragment>
						<h3>Are you sure you want to delete this subject?</h3>
						<p style={{ color: 'red', fontWeight: 'bold' }}>
							This action is irreverseble.
						</p>
					</Fragment>
				}
				open={deleteSubjectDialogue}
				handleClose={() => setDeleteSubjectDialogue(false)}
				onClick={() => {
					deleteSubject();
					setDeleteSubjectDialogue(false);
				}}
			/>
			<AddBatchDialog
				open={addBatchDialogue}
				handleClose={() => setaddBatchDialogue(false)}
			/>
		</ThemeProvider>
	);
};

export default SubjectDetail;
