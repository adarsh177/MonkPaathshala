import React, { Fragment, useEffect, useState } from 'react';
import {
	TextField,
	Button,
	makeStyles,
	FormControl,
	InputLabel,
	ListItem,
	Select,
} from '@material-ui/core';
import Logo from '../../../media/logo-100px.png';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';

// styling------------------------------------------
const styles = makeStyles({
	root: {
		width: '300px',
		marginBottom: '10px',
	},
});
// Material ui dropdown-----------------------------
const branchs = [
	{
		value: 'CSE',
		label: 'CSE',
	},
	{
		value: 'MECH',
		label: 'MECH',
	},
	{
		value: 'ECE',
		label: 'ECE',
	},
	{
		value: 'Ai & DS',
		label: 'Ai & DS',
	},
];

export default function ProfileChild() {
	const [branch, setbranch] = useState('CSE');
	const name = useSelector((state) => state.profile.name ?? '');
	const email = useSelector((state) => state.profile.email ?? '');
	const userType = useSelector((state) => state.userType);
	const [profile, setProfile] = useState({});
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setbranch(event.target.value);
	};
	const classes = styles();
}
