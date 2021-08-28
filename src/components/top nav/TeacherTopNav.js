import React from "react";
import Logo from "../../media/logo.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const TeacherTopNav = () => {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <div className="teacher-top-nav">
        <img src={Logo} alt="logo" className="top-nav-logo" />
        <div className="top-nav-content">
          <div className="nav-content-list">
            <Button className={classes.button} endIcon={<ArrowRightIcon />}>
              Subjects
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

export default TeacherTopNav;
