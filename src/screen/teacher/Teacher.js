import React from 'react';

import TeacherTopNav from '../../components/top nav/TeacherTopNav';

import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Home from './Home/Home';
import Assignment from './Assignment/Assignment';
import Test from './Test/Test';
import SubjectDetail from './SubjectDetails/SubjectDetail';

const Teacher = () => {
	const [index, setIndex] = React.useState(0);

	return (
		<div>
			<TeacherTopNav />
			<div className="teacher-side-nav">
				<div
					className="side-nav-item"
					onClick={() => {
						setIndex(0);
					}}
				>
					<Tooltip title="Home" arrow placement="right">
						<HomeIcon />
					</Tooltip>
				</div>
				<div
					className="side-nav-item"
					onClick={() => {
						setIndex(1);
					}}
				>
					<Tooltip title="Assignment" arrow placement="right">
						<AssignmentIcon />
					</Tooltip>
				</div>
				<div
					className="side-nav-item"
					onClick={() => {
						setIndex(2);
					}}
				>
					<Tooltip title="Test" arrow placement="right">
						<BorderColorIcon />
					</Tooltip>
				</div>
				<div
					className="side-nav-item"
					onClick={() => {
						setIndex(3);
					}}
				>
					<Tooltip title="Subject" arrow placement="right">
						<ReceiptIcon />
					</Tooltip>
				</div>
			</div>
			<div className="teacher-main">
				{index === 0 && <Home />}
				{index === 1 && <Assignment />}
				{index === 2 && <Test />}
				{index === 3 && <SubjectDetail />}
			</div>
		</div>
	);
};

export default Teacher;
