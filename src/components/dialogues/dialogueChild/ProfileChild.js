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
import './ProfileChild.css';
import theme from '../../../ThemeConfig';
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

	return (
		<ThemeProvider theme={theme}>
			<div className="ProfileDialog">
				<div className="dialogLeft">
					<img
						className="dialogProfileImg"
						src={Logo}
						alt="profile"
						className="profileImage"
					/>
					<Button variant="outlined">
						<label for="changeProfileImage" className="dialogChangeImageButton">
							Change
						</label>
					</Button>
					<input
						id="changeProfileImage"
						type="file"
						accept="image/*"
						style={{ display: 'none' }}
					/>
				</div>
				<div className="dialogueRight">
					<TextField
						className={classes.root}
						id="outlined-basic"
						label="Name"
						variant="outlined"
						value={name}
						InputLabelProps={{ shrink: true }}
						onChange={(ev) =>
							dispatch({
								type: 'updateProfile',
								data: {
									name: ev.target.name,
								},
							})
						}
					/>

					<TextField
						className={classes.root}
						id="outlined-basic"
						label="Email"
						variant="outlined"
						value={email}
						disabled
						InputLabelProps={{ shrink: true }}
					/>

					{userType === 'student' && (
						<Fragment>
							<FormControl variant="outlined" className={classes.root}>
								<InputLabel id="profile-branch-select-label">
									Select Branch
								</InputLabel>
								<Select
									id="profile-branch-select"
									labelId="profile-branch-select-label"
									label="Select Branch"
									value={branch}
									onChange={handleChange}
								>
									{branchs.map((option) => (
										<ListItem key={option.value} value={option.value}>
											{option.label}
										</ListItem>
									))}
								</Select>
							</FormControl>

							<TextField
								className={classes.root}
								style={{ display: '' }}
								id="outlined-basic"
								label="Batch year"
								variant="outlined"
							/>

							<TextField
								className={classes.root}
								id="outlined-basic"
								label="Status"
								variant="outlined"
							/>
						</Fragment>
					)}
				</div>
			</div>
		</ThemeProvider>
	);
}
