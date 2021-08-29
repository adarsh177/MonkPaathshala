import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function BaseDialogue(props) {
	const [open, setOpen] = React.useState(false);

	// const handleClickOpen = () => () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (open) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [open]);

	return (
		<div>
			{/* <Button onClick={handleClickOpen()}>Click</Button> */}
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				scroll="paper"
				aria-labelledby="Dialogue"
				aria-describedby="dialogue-body"
			>
				<DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
				<DialogContent dividers="paper">
					<div>{props.child}</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} variant="contained" color="secondary">
						DISCARD
					</Button>
					<Button onClick={props.onClick} variant="contained" color="primary">
						{props.positiveButtonTitle ?? 'SAVE'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
