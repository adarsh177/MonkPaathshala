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

	// return <Teacher />;

	return (
		<div className="App">
			<Teacher />
		</div>
	);
}

export default App;
