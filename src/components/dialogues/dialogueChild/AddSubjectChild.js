import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

export default function AddSubjectChild() {
	const [value, setValue] = useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
		console.log(value);
	};

	return (
		<div>
			<TextField
				id="outlined-basic"
				label="Subject Name"
				variant="outlined"
				onChange={() => handleChange}
				value={value}
				placeholder="Subject Name"
			/>
		</div>
	);
}
