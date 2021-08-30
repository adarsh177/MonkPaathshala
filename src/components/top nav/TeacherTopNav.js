import React, { useEffect, useState } from 'react';
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
import firebase from '../../firebase';

//Base Dialog components -------------------------------------------------

import BaseDialogue from '../dialogues/BaseDialogue';
import ConfirmationBaseDialog from '../dialogues/ConfirmationBaseDialog';

// Child dialoge components ---------------------------------------------
import LogoutChild from '../dialogues/dialogueChild/LogoutChild';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDialog from '../dialogues/ProfileDialog';
import { GetSubjects } from '../../database/TeacherManagement';
import AddSubjectDialogue from '../dialogues/AddSubjectDialog';

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
	const subjects = useSelector((state) => state.subjects);
	const selectedSubject = useSelector((state) => state.selectedSubject);

	const handleChange = (event) => {
		if (event.target.value === 'add') {
			// add new dialog
			setAddSubject(true);
			return;
		}
		dispatch({
			type: 'updateSelectedSubject',
			data: event.target.value,
		});
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

	useEffect(() => {
		if (subjects === null) {
			// loading subjects
			GetSubjects()
				.then((subs) => {
					console.log('Subs', subs);
					if (subs.length > 0) {
						dispatch({
							type: 'updateSelectedSubject',
							data: subs[0].subjectId,
						});
					}
					dispatch({
						type: 'updateSubjectList',
						data: subs,
					});
				})
				.catch((err) => {
					console.log('Error loading subs', err);
				});
		}
	}, [subjects]);

	return (
		<div>
			<div className="teacher-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<FormControl style={{ width: '150px' }} variant="outlined" size="small">
							<Select
								id="outlined-select-subject-native"
								value={
									subjects === null || subjects.length === 0
										? 'select'
										: selectedSubject
								}
								placeholder="Select Subject"
								onChange={handleChange}
								style={{ backgroundColor: '#fff' }}
							>
								{subjects === null || subjects.length === 0 ? (
									<MenuItem key="select" value="select">
										Select Subject
									</MenuItem>
								) : null}
								<MenuItem key="0" value="add">
									+ New Subject
								</MenuItem>
								{subjects
									? subjects.map((option) => (
											<MenuItem
												key={option.subjectId}
												value={option.subjectId}
											>
												{option.name}
											</MenuItem>
									  ))
									: null}
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

			<AddSubjectDialogue open={addSubject} handleClose={() => setAddSubject(false)} />

			<ProfileDialog open={profile} handleClose={handleProfileClose} />
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
