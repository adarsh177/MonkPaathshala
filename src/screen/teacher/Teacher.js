import React, { useEffect, useState } from 'react';
import './teacher.scss';
import TeacherTopNav from '../../components/top nav/TeacherTopNav';
import '../../firebase';
import firebase from 'firebase/app';
import Tooltip from '@material-ui/core/Tooltip';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Home from './Home/Home';
import Assignment from './Assignment/Assignment';
import Test from './Test/Test';
import SubjectDetail from './SubjectDetails/SubjectDetail';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetTeacherProfile } from '../../database/TeacherManagement';

const Teacher = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const storeState = useSelector((state) => state);
	const [currentTab, setCurrentTab] = useState('');

	const GetQueryObj = (str = '') => {
		const obj = {};
		str.replace('?', '')
			.split('&')
			.forEach((el) => {
				obj[el.split('=')[0]] = el.split('=')[1];
			});

		return obj;
	};

	const changeTabParam = (tabName) => {
		const param = new URLSearchParams();
		if (tabName && tabName !== '') {
			param.append('tab', tabName);
		}
		history.push({
			search: param.toString(),
		});
	};

	const getScreen = () => {
		if (currentTab == 'assignment') return <Assignment />;
		else if (currentTab == 'test') return <Test />;
		else if (currentTab == 'subject') return <SubjectDetail />;
		else return <Home />;
	};

	useEffect(() => {
		setCurrentTab(GetQueryObj(history.location.search).tab ?? '');

		const authListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				GetTeacherProfile().then((profile) => {
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

		return history.listen((location) => {
			setCurrentTab(GetQueryObj(location.search).tab ?? '');
		});
	}, []);

	useEffect(() => {
		changeTabParam(currentTab);
	}, [currentTab]);

	useEffect(() => {
		console.log('Profile...', storeState.profile);
	}, [storeState.profile]);

	return (
		<div>
			<TeacherTopNav />
			<div className="teachers-dashboard">
				<div className="teacher-side-nav">
					<div
						className={`side-nav-item ${currentTab === '' && 'active-nav'}`}
						onClick={() => {
							setCurrentTab('');
						}}
					>
						<Tooltip title="Home" arrow placement="right">
							<HomeIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${currentTab === 'assignment' && 'active-nav'}`}
						onClick={() => {
							setCurrentTab('assignment');
						}}
					>
						<Tooltip title="Assignment" arrow placement="right">
							<AssignmentIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${currentTab === 'test' && 'active-nav'}`}
						onClick={() => {
							setCurrentTab('test');
						}}
					>
						<Tooltip title="Test" arrow placement="right">
							<BorderColorIcon />
						</Tooltip>
					</div>
					<div
						className={`side-nav-item ${currentTab === 'subject' && 'active-nav'}`}
						onClick={() => {
							setCurrentTab('subject');
						}}
					>
						<Tooltip title="Subject" arrow placement="right">
							<ReceiptIcon />
						</Tooltip>
					</div>
				</div>
				<div className="teacher-main">{getScreen()}</div>
			</div>
		</div>
	);
};

export default Teacher;
