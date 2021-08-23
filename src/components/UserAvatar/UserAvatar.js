import React from 'react';
import './UserAvatar.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    colorDefault:{
        color:'gray',
    },
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    white: {
      color: "gray",
      background: "#EEF0F4",
      borderRadius: "100%",
    },
  }));

export default function UserAvatar() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Avatar src="/broken-image.jpg" style={{width:'80px',height:'80px'}}  className={classes.white} ></Avatar>
    </div>
  );
}
