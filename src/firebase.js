import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCOJ6SdygSsoBfCiDuKQQUFmZnLwLEV77Q',
	authDomain: 'monkpaathshala.firebaseapp.com',
	projectId: 'monkpaathshala',
	storageBucket: 'monkpaathshala.appspot.com',
	messagingSenderId: '449591197495',
	appId: '1:449591197495:web:af0982a75fcfb454ade4b2',
	measurementId: 'G-2JVBHTTKKC',
};

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
