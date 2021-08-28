import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		getAuth().onAuthStateChanged((user) => {
			setLoggedIn(user !== null);
		});
	}, []);

	return (
		<div className="App">
			<dib>Monk pathshala</dib>
		</div>
	);
}

export default App;
