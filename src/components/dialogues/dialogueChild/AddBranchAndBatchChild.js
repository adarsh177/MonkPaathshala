import React, { useState } from 'react';
import {
	TextField,
	makeStyles,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core';

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

const years = [2016, 2017, 2018, 2019, 2020, 2021];

export default function AddBranchAndBatchChild() {
	const [value, setValue] = useState({
		branch: '',
		batch: null,
	});

	const handleChange = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		setValue((val) => ({ ...val, [name]: value }));
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
			<p>Select the branch and batch year you would like to add to this subject.</p>
			<FormControl variant="outlined">
				<InputLabel id="add-group-select-branch-label">Select Branch</InputLabel>
				<Select
					id="add-group-select-branch"
					labelId="add-group-select-branch-label"
					value={value.branch}
					onChange={handleChange}
					label="Select Branch"
					name="branch"
				>
					{branchs.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<br />

			<FormControl variant="outlined">
				<InputLabel id="add-group-select-year-label">Select Year</InputLabel>
				<Select
					id="add-group-select-year"
					labelId="add-group-select-year-label"
					value={value.batch}
					onChange={handleChange}
					label="Select Year"
					name="batch"
				>
					{years.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
