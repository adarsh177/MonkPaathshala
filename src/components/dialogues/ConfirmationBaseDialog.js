import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationBaseDialog(props) {
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				scroll="paper"
				aria-labelledby="Dialogue"
				aria-describedby="dialogue-body"
			>
				<DialogTitle id="scroll-dialog-title">{props.action}</DialogTitle>
				<DialogContent
					style={{
						minWidth: '200px',
					}}
					dividers="paper"
				>
					{props.child}
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} variant="contained" color="secondary">
						Cancel
					</Button>
					<Button onClick={props.onClick} variant="contained" color="primary">
						{props.action}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
