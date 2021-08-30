import React from 'react';
import './topnav.scss';
import Logo from '../../media/logo.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Badge from '@material-ui/core/Badge';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const StudentTopNav = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();

	//material-ui profile Dropdown ------------------------

	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	return (
		<div>
			<div className="student-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<Button className={classes.button}>
							<Badge badgeContent={4} color="primary">
								<NotificationsIcon style={{ color: grey[50] }} />
							</Badge>
						</Button>
					</div>
					<div className="nav-content-profile">
						<Button
							ref={anchorRef}
							aria-controls={open ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}
							style={{ color: 'white' }}
						>
							<AccountCircleIcon color="inherit" />
						</Button>
						<Popper
							open={open}
							anchorEl={anchorRef.current}
							role={undefined}
							transition
							disablePortal
							style={{ zIndex: 1000 }}
						>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									style={{
										transformOrigin:
											placement === 'bottom' ? 'center top' : 'center bottom',
									}}
								>
									<Paper>
										<ClickAwayListener onClickAway={handleClose}>
											<MenuList
												autoFocusItem={open}
												id="menu-list-grow"
												onKeyDown={handleListKeyDown}
											>
												<MenuItem onClick={() => {}}>Profile</MenuItem>
												<MenuItem onClick={() => {}}>Logout</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentTopNav;
