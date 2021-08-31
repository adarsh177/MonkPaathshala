import '../../firebase';
import { Card, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import Firebase from 'firebase';
import firebase from '../../firebase';
import './LoginScreen.scss';
import { useHistory } from 'react-router-dom';
import { CreateTeacher } from '../../database/TeacherManagement';
import { CreateStudent } from '../../database/StudentManagement';

function LoginScreen(props) {
	const [userType, setUserType] = useState('student'); // student, teacher
	const [showLoginUi, setShowLoginUi] = useState(false);
	const history = useHistory();

	const firebaseui = require('firebaseui');
	var uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: async (auth, redirect) => {
				setUserType((type) => {
					localStorage.setItem('userType', type);

					if (type === 'student') {
						// do something
						CreateStudent().then((bool) => {
							if (bool) {
								history.push('/dashboard');
							} else {
								alert('Error logging you In, try again');
								firebase.auth().signOut();
							}
						});
					} else {
						CreateTeacher().then((bool) => {
							if (bool) {
								history.push('/dashboard');
							} else {
								alert('Error logging you In, try again');
								firebase.auth().signOut();
							}
						});
					}
					// updating parent component with userType
					if (window.onLoginComplete) window.onLoginComplete(type);
					return type;
				});
				return false;
			},
			signInFailure: (err) => {
				alert('Error Signing you in, please try again later');
				console.error('Signin error', err);
			},
		},
		signInFlow: 'popup',
		signInSuccessUrl: false,
		signInOptions: [
			{
				provider: Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				requireDisplayName: true,
			},
			{
				provider: Firebase.auth.EmailAuthProvider.PROVIDER_ID,
				requireDisplayName: true,
			},
		],
	};

	useEffect(() => {
		if (firebaseui.auth.AuthUI.getInstance()) {
			const ui = firebaseui.auth.AuthUI.getInstance();
			ui.start('#FirebaseLoginContainer', uiConfig);
		} else {
			const ui = new firebaseui.auth.AuthUI(firebase.auth());
			ui.start('#FirebaseLoginContainer', uiConfig);
		}

		const authListener = firebase.auth().onAuthStateChanged((user) => {
			setShowLoginUi(true);
			if (user !== null) {
				history.push('/dashboard');
			}
			// unsubscribing
			authListener();
		});
	}, []);

	return (
		<div className="LoginScreen">
			<img className="LoginScreen-Backdrop"></img>
			<Card className="LoginScreen-Dialog" component={Paper}>
				{/* <FormControl style={{ width: '100%' }} variant="outlined">
					<InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={userType}
						onChange={(ev) => setUserType(ev.target.value)}
						label="User Type"
					>
						<MenuItem value={'student'}>Student</MenuItem>
						<MenuItem value={'teacher'}>Teacher</MenuItem>
					</Select>
				</FormControl> */}

				<ToggleButtonGroup
					orientation="horizontal"
					value={userType}
					exclusive
					onChange={(ev) => setUserType(ev.target.value ?? 'student')}
				>
					<ToggleButton value="student" aria-label="list">
						<p>Student</p>
					</ToggleButton>
					<ToggleButton value="teacher" aria-label="module">
						<p>Teacher</p>
					</ToggleButton>
				</ToggleButtonGroup>
				<div
					style={{ visibility: showLoginUi ? 'visible' : 'hidden' }}
					id="FirebaseLoginContainer"
				></div>
				<p>Monk Paathshala</p>
			</Card>
		</div>
	);
}

export default LoginScreen;
