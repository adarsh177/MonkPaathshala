import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyCOJ6SdygSsoBfCiDuKQQUFmZnLwLEV77Q',
	authDomain: 'monkpaathshala.firebaseapp.com',
	projectId: 'monkpaathshala',
	storageBucket: 'monkpaathshala.appspot.com',
	messagingSenderId: '449591197495',
	appId: '1:449591197495:web:af0982a75fcfb454ade4b2',
	measurementId: 'G-2JVBHTTKKC',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
