import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

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

	return (
		<React.Fragment>
			<div className="dialogLeft">
				<img className="dialogProfileImg" src="#" alt="profile" />
				<label for="changeProfileImage" className="dialogChangeImageButton">
					Change
				</label>
				<input
					id="changeProfileImage"
					type="file"
					accept="image/*"
					style={{ display: 'none' }}
				/>
			</div>
			<div className="dialogueRight">
				<TextField id="outlined-basic" label="Name" variant="outlined" />
				<TextField id="outlined-basic" label="Email" variant="outlined" />
				<TextField
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
					style={{ display: '' }}
					id="outlined-basic"
					label="Batch year"
					variant="outlined"
				/>
				<TextField id="outlined-basic" label="Status" variant="outlined" />
			</div>
		</React.Fragment>
	);
}
