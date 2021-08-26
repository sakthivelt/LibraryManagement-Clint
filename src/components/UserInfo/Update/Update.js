import React, { useEffect, useState,useRef } from 'react';
import './Update.css'
import { makeStyles } from '@material-ui/core/styles';
import Input from '../../Input/Input'
import DropDown from './DropDown/DropDown'
import DatePicker from './DatePicker/DatePicker';
import ColorAlert from '../../ColorAlert/ColorAlert'; 
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
//For Dialog Box
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
//lottie
import lottie from 'lottie-web';
import Updating from '../../Lottie/Updating';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function Update({regno,name,degree,course,dob}) {

    const [RegNo,setRegNo]=useState(regno)
    const [Name,setName]=useState(name);
    const [Degree,setDegree]=useState(degree);
    const [Course,setCourse]=useState(course);
    const [DOB,setDOB]=useState(dob);
    const [Alert, setAlert] = useState(null);
    const history = useHistory();
    const [overlayerstate,setoverlayerstate]=useState(false)

    //For DialogBox
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };  
    const handleClose = () => {
      setOpen(false);
    };
    //For dialog box end  

   function btnfun(){
       setAlert(null)
       if(!(Name&&Degree&&DOB&&Course)){
        setAlert(<div className="alert"><ColorAlert alertValue={"Fill out the all values"} pVe={false} setAlert={setAlert}/></div>)      
       }else{
        handleClickOpen()
       }
   }

   function agreebtnfun(){
       var updatestate=false;

    handleClose();
    setoverlayerstate(true);
    setTimeout(() => {
        setoverlayerstate(false)
        setAlert(<div className="alert"><ColorAlert alertValue={"Update Sucessfully"} pVe={true} setAlert={setAlert}/></div>)
        setTimeout(()=>{ window.location.reload(false)},1000)      
    },4000 );
    axios.put(`http://localhost:5000/Update/${RegNo}`,{
        RegNo:RegNo,
        Name:Name,
        Degree:Degree,
        Course:Course,
        DOB:DOB,
    }).then((item)=>{
       updatestate=true;       
    }).catch((error)=>{
        console.log('error');
    })
   }

   console.log(history)
    return (
        <div className='update__section'>
            {Alert}
            {/* OverLayer */}
            <div className={`overlayer ${!overlayerstate&&'overlayer__hidden'}`}>
            <Updating/>
            </div>
            {/* OverLayer */}

                    {/* dialogBox */}                        
                        <div>
                    <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle id="alert-dialog-slide-title">{"Update"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        Are you sure You Agree to Update the user Informations ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                        Disagree
                        </Button>
                        <Button onClick={agreebtnfun} color="primary">
                        Agree
                        </Button>
                    </DialogActions>
                    </Dialog>
                    </div>
                    {/* dialogBox */}

            <div className="name"><Input lable={"Name"} setName={setName} setitem={setName} item={Name} / ></div>
                <div className="degree"><DropDown lable={'Degree' } DegreeValue={true} setitem={setDegree} item={Degree} /></div>
                <div className="course"><DropDown lable={"Course"} CoursesValues={true}  setitem={setCourse} item={Course} /></div>
                <div className='date__picker'><DatePicker setitem={setDOB} item={DOB} lableValue={"Date of Birth"} /></div>
                <Button
                onClick={()=>{
                btnfun()
                }}
                 variant="contained"
                 color="primary"
                endIcon={<EditIcon/>}
                >
                    Update
                </Button>
        </div>
    )
}

export default Update;

