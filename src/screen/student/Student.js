import React from 'react';
import StudentTopNav from '../../components/top nav/StudentTopNav';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Home from './Home/Home';
import Assignment from './Assignment/Assignment';
import Test from './Test/Test';
import Class from './Class/Class';
import './student.scss';
const Student = () => {
	const [index, setIndex] = React.useState(0);
	return (
		<div>
			<StudentTopNav />
			<div className="students-dashboard">
				<div className="student-side-nav">
					<div
						className={`side-nav-item ${index === 0 && 'active-nav'}`}
						onClick={() => {
							setIndex(0);
						}}
					>
						<Tooltip title="Home" arrow placement="right">
							<HomeIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${index === 1 && 'active-nav'}`}
						onClick={() => {
							setIndex(1);
						}}
					>
						<Tooltip title="Class" arrow placement="right">
							<ClassIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${index === 2 && 'active-nav'}`}
						onClick={() => {
							setIndex(2);
						}}
					>
						<Tooltip title="Assignment" arrow placement="right">
							<AssignmentIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${index === 3 && 'active-nav'}`}
						onClick={() => {
							setIndex(3);
						}}
					>
						<Tooltip title="Test" arrow placement="right">
							<BorderColorIcon />
						</Tooltip>
					</div>
				</div>
				<div className="student-main">
					{index === 0 && <Home />}
					{index === 1 && <Class />}
					{index === 2 && <Assignment />}
					{index === 3 && <Test />}
				</div>
			</div>
		</div>
	);
};

export default Student;
