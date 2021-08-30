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
// notifiaction popover-------------------------------
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IndividualNotification from '../IndividualNotification';
// notification list----------------------------------------
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const StudentTopNav = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
		notificationContainer: {
			maxHeight: 400,
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

	//notification popper -------------------------------------------------

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleNotificationClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setAnchorEl(null);
	};

	const openNotification = Boolean(anchorEl);
	const id = openNotification ? 'simple-popover' : undefined;

	return (
		<div>
			<div className="student-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<Button
							className={classes.button}
							aria-describedby={id}
							onClick={handleNotificationClick}
						>
							<Badge badgeContent={4} color="primary">
								<NotificationsIcon style={{ color: grey[50] }} />
							</Badge>
						</Button>
						<Popover
							id={id}
							open={openNotification}
							anchorEl={anchorEl}
							onClose={handleNotificationClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
						>
							<List
								className={classes.notificationContainer}
								component="nav"
								aria-label="main mailbox folders"
							>
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dgh fjd sf dsfnbd jfjs  dbf"
									/>
								</Button>
								<Divider />
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dghf jdsfd sfnbdjf js dbf"
									/>
								</Button>
								<Divider />
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dg hfjdsf  dsfnbd jfjsd bf"
									/>
								</Button>
								<Divider />
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dgh fjdsfd sfnbd jfj sdbf"
									/>
								</Button>
								<Divider />
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dghfjdsfdsfnbdjfjsdbf"
									/>
								</Button>
								<Divider />
								<Button>
									<IndividualNotification
										title="test"
										description="hi gjjdsgfj dfhjsdf dghfjdsfdsfnbdjfjsdbf"
									/>
								</Button>
								<Divider />
							</List>
						</Popover>
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
