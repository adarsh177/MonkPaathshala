import { createStore } from 'redux';

const initialState = {
	profile: {},
	subjects: [],
	selectedSubject: null,
	userType: 'teacher',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'updateProfile':
			return {
				...state,
				profile: {
					...state.profile,
					...action.data,
				},
			};
		case 'updateSubjectList':
			return {
				...state,
				subjects: action.data,
			};
		case 'updateSelectedSubject':
			return {
				...state,
				selectedSubject: action.data,
			};
		default:
			return state;
	}
};

export default createStore(reducer);
