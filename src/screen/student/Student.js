import React, { useEffect } from 'react';
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
import firebase from '../../firebase';
import { GetStudentProfile } from '../../database/StudentManagement';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
const Student = () => {
	const [index, setIndex] = React.useState(0);
	const dispatch = useDispatch();
	const alertInfo = useSelector((state) => state.alertInfo);

	useEffect(() => {
		const authListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				GetStudentProfile().then((profile) => {
					dispatch({
						type: 'updateProfile',
						data: profile,
					});
				});
			} else {
				window.location = '/';
			}
			authListener();
		});
	}, []);

	// autoclose alert
	useEffect(() => {
		if (alertInfo) {
			setTimeout(() => {
				dispatch({
					type: 'showAlert',
					data: null,
				});
			}, 2000);
		}
	}, [alertInfo]);

	return (
		<div>
			{alertInfo ? (
				<Alert className="alert-toast" severity={alertInfo.severity}>
					{alertInfo.text}
				</Alert>
			) : null}
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
