import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import lottie from 'lottie-web';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ColorAlert({alertValue,pVe,setAlert}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open} color="white">
        <Alert 
        color="white"
        severity={pVe?'success':'warning'}
        style={{background:'rgb(53,123,255,100%)',color:"white"}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                lottie.play()
              }}
            >
              <span onClick={()=>{setAlert(null)}}><CloseIcon fontSize="inherit" /></span>
            </IconButton>
          }
        >
         {alertValue}
        </Alert>
      </Collapse>
    </div>
  );
}
