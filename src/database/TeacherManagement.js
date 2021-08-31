import Firebase from 'firebase';
import firebaseApp from '../firebase';

export async function CreateTeacher() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
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

export async function UpdateTeacherProfile(name, imageUrl) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const userInfo = await firestore
			.collection('Teachers')
			.doc(auth.currentUser.uid)
			.update({
				name: name,
				image: imageUrl ? imageUrl : null,
			});
		return true;
	} catch (err) {
		console.log('UserManagement_UpdateTeacherProfile', err);
		return false;
	}
}

export async function GetTeacherProfile() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const userInfo = await firestore.collection('Teachers').doc(auth.currentUser.uid).get();
		return userInfo.data();
	} catch (err) {
		console.log('UserManagement_GetTeacherProfile', err);
		return false;
	}
}

export async function GetSubjects() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const Subjects = await firestore
			.collection('Subjects')
			.where('teacherId', '==', auth.currentUser.uid)
			.get();
		return Subjects.docs.map((doc) => doc.data());
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function AddSubject(subjectName) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const push = firestore.collection('Subjects').doc();
		const result = await push.set({
			name: subjectName,
			teacherId: auth.currentUser.uid,
			subjectId: push.id,
		});
		return push.id;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function DeleteSubject(subjectId) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		await firestore.collection('Subjects').doc(subjectId).delete();
		return true;
	} catch (err) {
		console.log('UserManagement_DeleteSubject', err);
		return false;
	}
}

export async function AddGroupToSubject(subjectId, groupId) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		await firestore
			.collection('Subjects')
			.doc(subjectId)
			.update({
				groups: Firebase.firestore.FieldValue.arrayUnion(groupId),
			});
		return true;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function RemoveGroupFromSubject(subjectId, groupId) {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		await firestore
			.collection('Subjects')
			.doc(subjectId)
			.update({
				groups: Firebase.firestore.FieldValue.arrayRemove(groupId),
			});
		return true;
	} catch (err) {
		console.log('UserManagement_GetSubjects', err);
		return false;
	}
}

export async function GetOngoingAssignments(subjectId) {
	const firestore = firebaseApp.firestore();
	const currTime = new Date();
	currTime.setHours(23, 59, 59);
	try {
		const assignments = await firestore
			.collection('Subjects')
			.doc(subjectId)
			.collection('Assignments')
			.orderBy('endDate', 'desc')
			.where('endDate', '>=', currTime.getTime())
			.get();
		return assignments.docs.map((doc) => doc.data());
	} catch (err) {
		console.log('UserManagement_GetOngoingAssignments', err);
		return false;
	}
}

export async function GetFinishedAssignments(subjectId) {
	const firestore = firebaseApp.firestore();
	const currTime = new Date();
	currTime.setHours(23, 59, 59);
	try {
		const assignments = await firestore
			.collection('Subjects')
			.doc(subjectId)
			.collection('Assignments')
			.orderBy('endDate', 'desc')
			.where('endDate', '<', currTime.getTime())
			.get();
		return assignments.docs.map((doc) => doc.data());
	} catch (err) {
		console.log('UserManagement_GetFinishedAssignments', err);
		return false;
	}
}

export async function GetOngoingTest(subjectId) {
	const firestore = firebaseApp.firestore();
	const currTime = new Date();
	currTime.setHours(23, 59, 59);
	try {
		const assignments = await firestore
			.collection('Subjects')
			.doc(subjectId)
			.collection('Assignments')
			.orderBy('endDate', 'desc')
			.where('endDate', '>=', currTime.getTime())
			.get();
		return assignments.docs.map((doc) => doc.data());
	} catch (err) {
		console.log('UserManagement_GetOngoingAssignments', err);
		return false;
	}
}

export async function GetFinishedTest(subjectId) {
	const firestore = firebaseApp.firestore();
	const currTime = new Date();
	currTime.setHours(23, 59, 59);
	try {
		const assignments = await firestore
			.collection('Subjects')
			.doc(subjectId)
			.collection('Assignments')
			.orderBy('endDate', 'desc')
			.where('endDate', '<', currTime.getTime())
			.get();
		return assignments.docs.map((doc) => doc.data());
	} catch (err) {
		console.log('UserManagement_GetFinishedAssignments', err);
		return false;
	}
}

export async function GetTests() {
	const firestore = firebaseApp.firestore();
	const auth = firebaseApp.auth();
	try {
		const assignments = await firestore
			.collection('Teachers')
			.doc(auth.currentUser.uid)
			.collection('tests')
			.orderBy('startDate', 'desc')
			.get();
		return assignments.docs;
	} catch (err) {
		console.log('UserManagement_GetTests', err);
		return false;
	}
}

export async function CreateAssignment(subjectId, assignmentData) {
	const firestore = firebaseApp.firestore();
	try {
		const assignmentPush = await firestore
			.collection('Subjects')
			.doc(subjectId)
			.collection('Assignments')
			.doc();
		await assignmentPush.set({
			assignmentId: assignmentPush.id,
			...assignmentData,
		});
		return assignmentPush.id;
	} catch (err) {
		console.log('UserManagement_CreateAssignment', err);
		return false;
	}
}
