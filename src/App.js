import { useEffect, useState } from 'react';
import './firebase';
import firebase from 'firebase/app';
import Teacher from './screen/teacher/Teacher';
import LoginScreen from './screen/LoginScreen/LoginScreen';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import TeacherStore from './screen/teacher/TeacherStore';
import Student from './screen/student/Student';

function App() {
	const [authChecked, setAuthChecked] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setAuthChecked(user !== null);
		});
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<LoginScreen />
				</Route>
				<Router exact path="/dashboard">
					{authChecked !== null && (
						<Provider store={TeacherStore}>
							<Teacher />
						</Provider>
					)}
				</Router>
			</Switch>
		</Router>
	);
}

export default App;
