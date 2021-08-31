import Firebase from 'firebase';
import firebaseApp from '../firebase';

export async function CreateStudent() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const userInfo = await firestore
			.collection('Students')
			.where('userId', '==', auth.currentUser.uid)
			.get();
		if (userInfo.empty) {
			// user doesn't exists
			await firestore.collection('Students').doc(auth.currentUser.uid).set({
				userId: auth.currentUser.uid,
				email: auth.currentUser.email,
				name: auth.currentUser.displayName,
				joinedOn: Firebase.firestore.Timestamp.now(),
			});
		}
		return true;
	} catch (err) {
		console.log('UserManagement_CreateTeacher', err);
		return false;
	}
}

export async function UpdateStudentProfile(data) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const userInfo = await firestore
			.collection('Students')
			.doc(auth.currentUser.uid)
			.update(data);
		return true;
	} catch (err) {
		console.log('UserManagement_UpdateStudentProfile', err);
		return false;
	}
}

export async function GetStudentProfile() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const userInfo = await firestore.collection('Students').doc(auth.currentUser.uid).get();
		return userInfo.data();
	} catch (err) {
		console.log('UserManagement_GetTeacherProfile', err);
		return false;
	}
}
