import { useDispatch } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
	profile: {},
	subjects: null,
	userType: 'student',
	alertInfo: null, // {severity: '', text}
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
		case 'showAlert':
			return {
				...state,
				alertInfo: action.data,
			};
		default:
			return state;
	}
};

export default createStore(reducer);
