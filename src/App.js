import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Teacher from './screen/teacher/Teacher';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		getAuth().onAuthStateChanged((user) => {
			setLoggedIn(user !== null);
		});
	}, []);

	return (
		<div className="App">
			<div>Monk pathshala</div>
			<Teacher />
		</div>
	);
}

export default App;
