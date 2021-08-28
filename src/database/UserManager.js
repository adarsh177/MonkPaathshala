import FirebaseApp from 'firebase/compat/app';

const firestore = FirebaseApp.app().firestore();
const auth = FirebaseApp.app().auth();

export async function CreateStudent() {
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
				joinedOn: FirebaseApp.firestore.Timestamp.now(),
			});
		}
		return true;
	} catch (err) {
		console.log('UserManagement_CreateTeacher', err);
		return false;
	}
}

export async function UpdateUserProfile(updateData) {
	try {
		await firestore.collection('Students').doc(auth.currentUser.uid).update(updateData);
		return true;
	} catch (err) {
		console.log('UserManagement_UpdateUserProfile', err);
		return false;
	}
}
