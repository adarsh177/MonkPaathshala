import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import Logo from '../../../media/logo-100px.png';
import './ProfileChild.css';
import theme from '../../../ThemeConfig';
import { ThemeProvider } from '@material-ui/styles';

// styling------------------------------------------
const styles = makeStyles({
	root: {
		margin: '10px 0 10px 0',
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
					/>
					<TextField
						className="classes.root"
						id="outlined-basic"
						label="Email"
						variant="outlined"
					/>
					<TextField
						className={classes.root}
						style={{ display: '' }}
						id="outlined-select-branch-native"
						select
						label="Native select"
						value={branch}
						onChange={handleChange}
						SelectProps={{
							native: true,
						}}
						variant="outlined"
					>
						{branchs.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</TextField>

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
				</div>
			</div>
		</ThemeProvider>
	);
}
