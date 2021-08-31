import { useEffect, useState } from 'react';
import './firebase';
import firebase from 'firebase/app';
import Teacher from './screen/teacher/Teacher';
import LoginScreen from './screen/LoginScreen/LoginScreen';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import TeacherStore from './screen/teacher/TeacherStore';
import Student from './screen/student/Student';
import StudentStore from './screen/student/StudentStore';

function App() {
	const [authChecked, setAuthChecked] = useState(null);
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setAuthChecked(user !== null);
		});

		// loading default userType if already exists
		setUserType(localStorage.getItem('userType'));

		// this will be called from inside login after successful login
		window.onLoginComplete = (userType) => {
			setUserType(userType);
		};
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<LoginScreen />
				</Route>
				<Router exact path="/dashboard">
					{authChecked !== null && userType !== null && (
						<Provider store={userType === 'teacher' ? TeacherStore : StudentStore}>
							{userType === 'teacher' ? <Teacher /> : <Student />}
						</Provider>
					)}
				</Router>
			</Switch>
		</Router>
	);
}

export default App;
