import { useEffect, useState } from 'react';
import firebase from 'firebase';
import Teacher from './screen/teacher/Teacher';
import LoginScreen from './screen/LoginScreen/LoginScreen';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import TeacherStore from './screen/teacher/TeacherStore';
import Student from './screen/student/Student';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<LoginScreen />
				</Route>
				<Router exact path="/dashboard">
					<Provider store={TeacherStore}>
						<Teacher />
					</Provider>
				</Router>
			</Switch>
		</Router>
	);
}

export default App;
