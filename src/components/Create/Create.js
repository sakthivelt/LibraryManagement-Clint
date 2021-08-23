import React, { useEffect,useRef, useState } from 'react';
import './Create.css';
import Man from '../../assets/Man.svg'
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Password from '../Password/Password';
import LoadingBar from '../LoadingBar/LoadingBar'
import axios from 'axios';
import ColorAlert from '../ColorAlert/ColorAlert';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import DatePicker from '../DatePicker/DatePicker'
import {format} from 'date-fns';
//animation
import lottie from 'lottie-web';
import Loading from '../Lottie/Loading'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  
function Create() {
    const classes = useStyles();
    const [RegNo,setRegNo]=useState('');
    const [Name,setName]=useState('');
    const [Degree,setDegree]=useState('');
    const [Course,setCourse]=useState('');
    const [NewPassword,setNewPassword]=useState('');
    const [DateValue,setDateValue]=useState();
    const [DOB,setDOB]=useState('')
    const [ClickMe,setClickMe]=useState('click__me__hidden')
    const [AllValues, setAllValues] = useState(false);
    const [PrograssLoading,setPrograssLoading]=useState(false);
    const [Alert, setAlert] = useState(null);
    const date = new Date();

    useEffect(() => {
        setDOB(`${format(date, 'yyyy-MM-dd').toString()}`)
    }, [DateValue])

    const btnFun=()=>{
        lottie.stop();
        setAlert(null);
       if(!AllValues){
           setAlert(<div className="alert"><ColorAlert alertValue={"Fill out the all values"} pVe={false} setAlert={setAlert}/></div>)
       }else{
           //password validation
                if(NewPassword.length>=6){
                    setPrograssLoading(true);
                    axios.post('http://localhost:5000/Create',{
                        RegNo:RegNo,
                        Name:Name,
                        Degree:Degree,
                        Course:Course,
                        DOB:DOB,
                        Password:NewPassword,
                    }).then((res)=>{
                        setPrograssLoading(false);
                        if(res.data.OldUser===false){
                            setAlert(<div className="alert"><ColorAlert alertValue={"Account Created successfully"} pVe={true} setAlert={setAlert}/></div>)
                        }else if(res.data.OldUser===true){
                            setAlert(<div className="alert"><ColorAlert alertValue={`This user (${RegNo}) already have account`} pVe={false} setAlert={setAlert}/></div>)
                        }
                    }).catch((error)=>{
                        setPrograssLoading(false);
                        setAlert(<div className="alert"><ColorAlert alertValue={`Server Error try again`} pVe={false} setAlert={setAlert}/></div>)
                    })
                    
                }else{
                    setAlert(<div className="alert"><ColorAlert alertValue={"Password mut be 6 letters or more"} pVe={false} setAlert={setAlert}/></div>)
                }
       }
    }

    useEffect(() => {
            if(RegNo&&Name&&Degree&&Course&&NewPassword&&DOB){
                setClickMe('Click__me')
                setAllValues(true);
            }else{
                setClickMe('click__me__hidden');
                setAllValues(false)
            }
    }, [RegNo,Name,Degree,Course,NewPassword,DOB])


    //lottie animation
    const continer=useRef(null);
    useEffect(() => {
      
            lottie.loadAnimation({
            container:continer.current,
            renderer:'svg',
            loop:true,
            autoplay:true,
            animationData:require('../../assets/Man.svg')
        })

    }, [])
 


    return (
        <div className='create__main'>
            {/* <div className="alert"><ColorAlert/></div> */}
            {Alert}
            {PrograssLoading&&<div style={{width:"92%",position:"absolute",top:"0px",marginLeft:'10px'}}><LoadingBar/></div>}
            {/* <span className={ClickMe}  ><img src={Chat} alt={"chat"} className='ClickMe__img'/><p className='ClickMe__msg'>Click Me</p></span> */}
            <div className='man' onClick={btnFun}>
                <Loading/>
            </div>
            <div className='form'>
            <h1>Create User</h1>
            <div className='input__feild'>
                <div className="regNo"><Input lable={"Register No"} setitem={setRegNo} item={RegNo}/></div>
                <div className="name"><Input lable={"Name"} setName={setName} setitem={setName} item={Name}/></div>
                <div className="degree"><DropDown lable={'Degree' } DegreeValue={true} setitem={setDegree} item={Degree}/></div>
                <div className="course"><DropDown lable={"Course"} CoursesValues={true}  setitem={setCourse} item={Course} /></div>
                <div className='date__picker'><DatePicker setitem={setDateValue} lableValue={"Date of Birth"}/></div>
                <div className="CreatePassword"><Password lable={"Create Password"} setitem={setNewPassword} /></div>
            </div>
            </div>
               <div className="create__mobile__icon" onClick={btnFun}><Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon/>}
      >
        Create
      </Button></div>
        </div>
    )


}




export default Create;




























// import React, { useEffect, useState } from 'react';
// import './Create.css';
// import Man from '../../assets/Man.svg'
// import Input from '../Input/Input';
// import DropDown from '../DropDown/DropDown';
// import Password from '../Password/Password';
// import LoadingBar from '../LoadingBar/LoadingBar'
// import axios from 'axios';
// import ColorAlert from '../ColorAlert/ColorAlert';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import { makeStyles } from '@material-ui/core/styles';
// import SendIcon from '@material-ui/icons/Send';
// import DatePicker from '../DatePicker/DatePicker'
// import {format} from 'date-fns';


// const useStyles = makeStyles((theme) => ({
//     button: {
//       margin: theme.spacing(1),
//     },
//   }));
  
// function Create() {
//     const classes = useStyles();
//     const [RegNo,setRegNo]=useState('');
//     const [Name,setName]=useState('');
//     const [Degree,setDegree]=useState('');
//     const [Course,setCourse]=useState('');
//     const [NewPassword,setNewPassword]=useState('');
//     const [DateValue,setDateValue]=useState();
//     const [DOB,setDOB]=useState('')
//     const [ClickMe,setClickMe]=useState('click__me__hidden')
//     const [AllValues, setAllValues] = useState(false);
//     const [PrograssLoading,setPrograssLoading]=useState(false);
//     const [Alert, setAlert] = useState(null);
//     const date = new Date();

//     useEffect(() => {
//         setDOB(`${format(date, 'yyyy-MM-dd').toString()}`)
//     }, [DateValue])

//     const btnFun=()=>{
//         setAlert(null);
//        if(!AllValues){
//            setAlert(<div className="alert"><ColorAlert alertValue={"Fill out the all values"} pVe={false} setAlert={setAlert}/></div>)
//        }else{
//            //password validation
//                 if(NewPassword.length>=6){
//                     setPrograssLoading(true);
//                     axios.post('http://localhost:5000/Create',{
//                         RegNo:RegNo,
//                         Name:Name,
//                         Degree:Degree,
//                         Course:Course,
//                         DOB:DOB,
//                         Password:NewPassword,
//                     }).then((res)=>{
//                         setPrograssLoading(false);
//                         if(res.data.OldUser===false){
//                             setAlert(<div className="alert"><ColorAlert alertValue={"Account Created successfully"} pVe={true} setAlert={setAlert}/></div>)
//                         }else if(res.data.OldUser===true){
//                             setAlert(<div className="alert"><ColorAlert alertValue={`This user (${RegNo}) already have account`} pVe={false} setAlert={setAlert}/></div>)
//                         }
//                     }).catch((error)=>{
//                         setPrograssLoading(false);
//                         setAlert(<div className="alert"><ColorAlert alertValue={`Server Error try again`} pVe={false} setAlert={setAlert}/></div>)
//                     })
                    
//                 }else{
//                     setAlert(<div className="alert"><ColorAlert alertValue={"Password mut be 6 letters or more"} pVe={false} setAlert={setAlert}/></div>)
//                 }
//        }
//     }

//     useEffect(() => {
//             if(RegNo&&Name&&Degree&&Course&&NewPassword&&DOB){
//                 setClickMe('Click__me')
//                 setAllValues(true);
//             }else{
//                 setClickMe('click__me__hidden');
//                 setAllValues(false)
//             }
//     }, [RegNo,Name,Degree,Course,NewPassword,DOB])

//     return (
//         <div className='create__main'>
//             {/* <div className="alert"><ColorAlert/></div> */}
//             {Alert}
//             {PrograssLoading&&<div style={{width:"92%",position:"absolute",top:"0px",marginLeft:'10px'}}><LoadingBar/></div>}
//             {/* <span className={ClickMe}  ><img src={Chat} alt={"chat"} className='ClickMe__img'/><p className='ClickMe__msg'>Click Me</p></span> */}
//             <img src={Man} className='man' alt="Man SVG" onClick={btnFun}/>
//             <div className='form'>
//             <h1>Create User</h1>
//             <div className='input__feild'>
//                 <div className="regNo"><Input lable={"Register No"} setitem={setRegNo} item={RegNo}/></div>
//                 <div className="name"><Input lable={"Name"} setName={setName} setitem={setName} item={Name}/></div>
//                 <div className="degree"><DropDown lable={'Degree' } DegreeValue={true} setitem={setDegree} item={Degree}/></div>
//                 <div className="course"><DropDown lable={"Course"} CoursesValues={true}  setitem={setCourse} item={Course} /></div>
//                 <div className='date__picker'><DatePicker setitem={setDateValue} lableValue={"Date of Birth"}/></div>
//                 <div className="CreatePassword"><Password lable={"Create Password"} setitem={setNewPassword} /></div>
//             </div>
//             </div>
//                <div className="create__mobile__icon" onClick={btnFun}><Button
//         variant="contained"
//         color="primary"
//         className={classes.button}
//         endIcon={<SendIcon/>}
//       >
//         Create
//       </Button></div>
//         </div>
//     )


// }




// export default Create;

