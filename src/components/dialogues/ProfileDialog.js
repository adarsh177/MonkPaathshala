import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import theme from '../../ThemeConfig';
import './ProfileDialog.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	FormControl,
	TextField,
	ThemeProvider,
	InputLabel,
	Select,
	ListItem,
	makeStyles,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import Logo from '../../media/logo.png';
import Config from '../../Config.json';
import { GetInputImageData } from '../../Utils';
import '../../firebase';
import firebase from 'firebase/app';
import { UpdateTeacherProfile } from '../../database/TeacherManagement';
import { UpdateStudentProfile } from '../../database/StudentManagement';

const styles = makeStyles({
	root: {
		width: '300px',
		marginBottom: '10px',
	},
});

export default function ProfileDialog(props) {
	const [branch, setbranch] = useState(Object.keys(Config.branches)[0]);
	const userType = useSelector((state) => state.userType);
	const storeProfile = useSelector((state) => state.profile);
	const [localProfile, setLocalProfile] = useState({});
	const [profilePicLoading, setProfilePicLoading] = useState(false);
	const [profileSaving, setProfileSaving] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({});

	const dispatch = useDispatch();
	const classes = styles();

	const onSavePressed = (ev) => {
		if (ev) ev.preventDefault();
		let promise = null;
		if (userType === 'student') {
			// handle student save
			if (!localProfile.name || localProfile.name.length < 3) {
				setFieldErrors((err) => ({
					...err,
					nameField: true,
				}));
				return;
			}
			if (!localProfile.branch) {
				setFieldErrors((err) => ({
					...err,
					branchField: true,
				}));
				return;
			}
			if (!localProfile.year) {
				setFieldErrors((err) => ({
					...err,
					yearField: true,
				}));
				return;
			}

			const dataToSave = {
				image: localProfile.image !== storeProfile.image ? localProfile.image : null,
				branch: storeProfile.branch ? null : localProfile.branch,
				year: storeProfile.year ? null : localProfile.year,
				name: localProfile.name,
			};
			Object.keys(dataToSave).forEach((key) => {
				if (!dataToSave[key]) {
					delete dataToSave[key];
				}
			});
			promise = UpdateStudentProfile(dataToSave);
		} else {
			if (!localProfile.name || localProfile.name.length < 3) {
				setFieldErrors((err) => ({
					...err,
					nameField: true,
				}));
				return;
			}
			promise = UpdateTeacherProfile(localProfile.name, localProfile.image);
		}

		setProfileSaving(true);
		promise
			.then((bool) => {
				if (!bool) {
					dispatch({
						type: 'showAlert',
						data: {
							severity: 'error',
							text: 'Error saving profile',
						},
					});
					return;
				}
				dispatch({
					type: 'updateProfile',
					data:
						userType === 'teacher'
							? {
									name: localProfile.name,
									image: localProfile.image ? localProfile.image : null,
							  }
							: {
									name: localProfile.name,
									image: localProfile.image ? localProfile.image : null,
									branch: localProfile.branch,
									year: localProfile.year,
							  },
				});
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'success',
						text: 'Profile saved successfully',
					},
				});
				props.handleClose();
			})
			.catch((err) => {
				dispatch({
					type: 'showAlert',
					data: {
						severity: 'error',
						text: 'Error saving profile',
					},
				});
			})
			.finally(() => setProfileSaving(false));
	};

	const onImageSelected = (file) => {
		if (!file) return;

		setProfilePicLoading(true);
		firebase
			.storage()
			.ref(`/profile/${userType}/${firebase.auth().currentUser.uid}`)
			.put(file)
			.then((snap) => {
				snap.ref
					.getDownloadURL()
					.then((url) => {
						setLocalProfile((lp) => ({
							...lp,
							image: url,
						}));
					})
					.catch((err) => {
						console.log('Error uploading profile pic-url', err);
						alert('Error uploading profile picture');
					})
					.finally(() => setProfilePicLoading(false));
			})
			.catch((err) => {
				setProfilePicLoading(false);
				console.log('Error uploading profile pic', err);
				alert('Error uploading profile picture');
			});
	};

	useEffect(() => {
		setLocalProfile(storeProfile ? storeProfile : {});
	}, [storeProfile]);

	// responsive dialog------------------------------------------
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			open={props.open}
			scroll="paper"
			aria-labelledby="Dialogue"
			aria-describedby="dialogue-body"
			fullScreen={fullScreen}
		>
			<DialogTitle id="scroll-dialog-title">
				{userType === 'student' ? 'Student' : 'Teacher'}'s Profile
			</DialogTitle>
			<DialogContent dividers="paper">
				<ThemeProvider theme={theme}>
					<div className="ProfileDialog">
						<div className="dialogLeft">
							<img
								className="dialogProfileImg"
								src={localProfile.image ? localProfile.image : Logo}
								alt="profile"
								className="profileImage"
							/>
							<Button disabled={profilePicLoading} variant="outlined">
								<label for="changeProfileImage" className="dialogChangeImageButton">
									{profilePicLoading ? 'Loading...' : 'Change'}
								</label>
							</Button>
							<input
								id="changeProfileImage"
								type="file"
								accept="image/*"
								onChange={(ev) => onImageSelected(ev.target.files[0])}
								style={{ display: 'none' }}
							/>
						</div>
						<div className="dialogueRight">
							<TextField
								id="outlined-basic"
								label="Name"
								variant="outlined"
								className={classes.root}
								value={localProfile.name}
								error={fieldErrors.nameField}
								InputLabelProps={{ shrink: true }}
								onChange={(ev) => {
									setFieldErrors((err) => ({
										...err,
										nameField: false,
									}));
									setLocalProfile((lp) => ({
										...lp,
										name: ev.target.value,
									}));
								}}
							/>

							<TextField
								id="outlined-basic"
								className={classes.root}
								label="Email"
								variant="outlined"
								value={localProfile.email}
								disabled
								InputLabelProps={{ shrink: true }}
							/>

							{userType === 'student' && (
								<Fragment>
									<FormControl
										error={fieldErrors.branchField}
										className={classes.root}
										variant="outlined"
									>
										<InputLabel id="profile-branch-select-label">
											Select Branch
										</InputLabel>
										<Select
											id="profile-branch-select"
											labelId="profile-branch-select-label"
											label="Select Branch"
											value={localProfile.branch}
											disabled={storeProfile.branch}
											onChange={(ev) => {
												setFieldErrors((err) => ({
													...err,
													branchField: false,
												}));
												setLocalProfile((lp) => ({
													...lp,
													branch: ev.target.value,
												}));
											}}
										>
											{Object.keys(Config.branches).map((key) => (
												<ListItem key={key} value={key}>
													{Config.branches[key]}
												</ListItem>
											))}
										</Select>
									</FormControl>

									<FormControl
										error={fieldErrors.yearField}
										className={classes.root}
										variant="outlined"
									>
										<InputLabel id="profile-yera-select-label">
											Select Year
										</InputLabel>
										<Select
											id="profile-year-select"
											labelId="profile-year-select-label"
											label="Select Year"
											value={localProfile.year}
											disabled={storeProfile.year}
											onChange={(ev) => {
												setFieldErrors((err) => ({
													...err,
													yearField: false,
												}));
												setLocalProfile((lp) => ({
													...lp,
													year: ev.target.value,
												}));
											}}
										>
											{Config.years.map((year) => (
												<ListItem key={year} value={year}>
													{year}
												</ListItem>
											))}
										</Select>
									</FormControl>
								</Fragment>
							)}
						</div>
					</div>
				</ThemeProvider>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} variant="contained" color="secondary">
					DISCARD
				</Button>
				<Button onClick={onSavePressed} variant="contained" color="primary">
					SAVE
				</Button>
			</DialogActions>
		</Dialog>
	);
}
