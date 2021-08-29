import React, { useState } from 'react';
import Logo from '../../media/logo.png';
import './topnav.scss';
import { Button, Select, TextField, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//Base Dialog components -------------------------------------------------

import BaseDialogue from '../dialogues/BaseDialogue';
import ConfirmationBaseDialog from '../dialogues/ConfirmationBaseDialog';

// Child dialoge components ---------------------------------------------
import ProfileChild from '../dialogues/dialogueChild/ProfileChild';
import LogoutChild from '../dialogues/dialogueChild/LogoutChild';
import AddSubjectChild from '../dialogues/dialogueChild/AddSubjectChild';

import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const subjects = [
	{
		value: 'Maths',
		label: 'Maths Name will come here',
	},
	{
		value: 'English',
		label: 'English',
	},
	{
		value: 'Hindi',
		label: 'Hindi',
	},
	{
		value: 'SST',
		label: 'SST',
	},
];

const TeacherTopNav = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const [subject, setsubject] = React.useState('Maths');

	const handleChange = (event) => {
		setsubject(event.target.value);
	};

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

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	// states for profile dialog ---------------------------
	const [profile, setProfile] = useState(false);
	const handleProfileOpen = () => {
		setProfile(true);
	};
	const handleProfileClose = () => {
		setProfile(false);
	};

	// states for Logout dialog ---------------------------
	const [Logout, setLogout] = useState(false);
	const handleLogoutOpen = () => {
		setLogout(true);
	};
	const handleLogoutClose = () => {
		setLogout(false);
	};
	// states for add Subject dialog ---------------------------
	const [addSubject, setAddSubject] = useState(false);
	const handleaddSubjectOpen = () => {
		setAddSubject(true);
	};
	const handleaddSubjectClose = () => {
		setAddSubject(false);
	};

	return (
		<div>
			<div className="teacher-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<FormControl style={{ width: '150px' }} variant="outlined" size="small">
							<Select
								id="outlined-select-subject-native"
								value={subject}
								onChange={handleChange}
								helperText="Please select your subject"
								style={{ backgroundColor: '#fff' }}
							>
								<MenuItem
									key="0"
									value="+  Add Subject"
									onClick={handleaddSubjectOpen}
								>
									+ Add Subject
								</MenuItem>
								{subjects.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
												<MenuItem onClick={handleProfileOpen}>
													Profile
												</MenuItem>
												<MenuItem onClick={handleLogoutOpen}>
													Logout
												</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				</div>
			</div>

			<BaseDialogue
				title="Subject"
				child={<AddSubjectChild />}
				open={addSubject}
				handleClose={handleaddSubjectClose}
			/>

			<BaseDialogue
				title="Profile"
				child={<ProfileChild />}
				open={profile}
				handleClose={handleProfileClose}
			/>
			<ConfirmationBaseDialog
				action="Logout"
				child={<LogoutChild />}
				open={Logout}
				handleClose={handleLogoutClose}
				onClick={async () => {
					await firebase.auth().signOut();
					window.location = '/';
				}}
			/>
		</div>
	);
};

export default TeacherTopNav;
