import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

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

export default function AddBranchAndBatchChild() {
	const [value, setValue] = useState({
		branch: '',
		batch: '',
	});

	const handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		setValue({ [name]: value });
	};
	console.log(value);
	return (
		<div>
			<TextField
				style={{ display: '' }}
				id="outlined-select-branch-native"
				select
				label="Native select"
				value={value.branch}
				onChange={handleChange}
				SelectProps={{
					native: true,
				}}
				variant="outlined"
				name="branch"
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
				onChange={handleChange}
				value={value.batch}
				name="batch"
			/>
		</div>
	);
}
