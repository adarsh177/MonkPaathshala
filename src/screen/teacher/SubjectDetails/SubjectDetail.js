import React from 'react';
import Title from '../../../components/Title/Title';
import { subjectDetailData } from './subjectDetailData';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const SubjectDetail = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();
	const handleDelete = () => {};
	return (
		<div classname="subjectdetail">
			<div className="subject-heading">
				<Title name="Engineering Economics" />
				<Button className={classes.button} endIcon={<AddIcon />}>
					Add Course
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
							<div className="table-content-item" onClick={handleDelete}>
								<DeleteIcon />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SubjectDetail;
