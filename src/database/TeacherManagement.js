import FirebaseApp from 'firebase/compat/app';

const firestore = FirebaseApp.app().firestore();
const auth = FirebaseApp.app().auth();

export async function CreateTeacher() {
	try {
		const userInfo = await firestore
			.collection('Teachers')
			.where('userId', '==', auth.currentUser.uid)
			.get();
		if (userInfo.empty) {
			// user doesn't exists
			await firestore.collection('Teachers').doc(auth.currentUser.uid).set({
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

export async function UpdateTeacherProfile(name, imageUrl) {
	try {
		const userInfo = await firestore.collection('Teachers').doc(auth.currentUser.uid).update({
			name: name,
			image: imageUrl,
		});
		return true;
	} catch (err) {
		console.log('UserManagement_UpdateTeacherProfile', err);
		return false;
	}
}

export async function GetTeacherProfile() {
	try {
		const userInfo = await firestore.collection('Teachers').doc(auth.currentUser.uid).get();
		return userInfo;
	} catch (err) {
		console.log('UserManagement_GetTeacherProfile', err);
		return false;
	}
}

export async function GetSubjects() {
	try {
		const Subjects = await firestore
			.collection('Subjects')
			.where('teacherId', '==', auth.currentUser.uid)
			.get();
		return Subjects.docs;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function AddSubject(subjectName, image) {
	try {
		const result = await firestore.collection('Subjects').add({
			name: subjectName,
			teacherId: auth.currentUser.uid,
			image: image,
		});
		return result.id;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function AddGroupToSubject(subjectId, groupId) {
	try {
		await firestore
			.collection('Subjects')
			.doc(subjectId)
			.update({
				groups: FirebaseApp.firestore.FieldValue.arrayUnion(groupId),
			});
		return true;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function GetAssignments() {
	try {
		const assignments = await firestore
			.collection('Teachers')
			.doc(auth.currentUser.uid)
			.collection('assignments')
			.orderBy('startTime', 'desc')
			.get();
		return assignments.docs;
	} catch (err) {
		console.log('UserManagement_GetAssignments', err);
		return false;
	}
}

export async function GetTests() {
	try {
		const assignments = await firestore
			.collection('Teachers')
			.doc(auth.currentUser.uid)
			.collection('tests')
			.orderBy('startTime', 'desc')
			.get();
		return assignments.docs;
	} catch (err) {
		console.log('UserManagement_GetTests', err);
		return false;
	}
}
