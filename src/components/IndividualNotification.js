import React from 'react';
import './IndividualNotification.css';

function IndividualNotification(props) {
	return (
		<div className="notifiactionContainer">
			<h3>{props.title}</h3>
			<p>{props.description}</p>
		</div>
	);
}

export default IndividualNotification;
