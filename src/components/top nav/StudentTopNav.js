import React from 'react';
import './topnav.scss';
import Logo from '../../media/logo.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const StudentTopNav = () => {
	const useStyles = makeStyles((theme) => ({
		button: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();

	return (
		<div>
			<div className="student-top-nav">
				<img src={Logo} alt="logo" className="top-nav-logo" />
				<div className="top-nav-content">
					<div className="nav-content-list">
						<Button className={classes.button}>
							<Badge badgeContent={4} color="primary">
								<NotificationsIcon />
							</Badge>
						</Button>
					</div>
					<div className="nav-content-profile">
						<Button>
							<AccountCircleIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentTopNav;
