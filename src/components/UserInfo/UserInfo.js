import React, { useEffect,useState } from 'react';
import './UserInfo.css'
import Update from './Update/Update'

import { makeStyles } from '@material-ui/core/styles';
import { useParams,useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import UserAvatar from '../UserAvatar/UserAvatar'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Route,Switch,Link } from 'react-router-dom';
import {format} from 'date-fns';
import Aos from 'aos';
import "aos/dist/aos.css"
import FullWidthTabs from './Tabs/Tabs';

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


function UserInfo() {
const classes = useStyles();
const params=useParams();
const Backbtn=useHistory();
const [UserData,setUserData]=useState();
//show render component
const [ShowRender, setShowRender] = useState(null)
//Batch calculation
const date = new Date();
var tempdate=`${format(date, 'yyyy-MM-dd').toString().slice(2,4)}`;

        const getData= async ()=>{
            const data= await axios.get(`http://localhost:5000/UserInfo/${params.id}`).then((item)=>{
                setUserData(item.data);
                return item.data;
            }).then((item)=>{
               showRenderfun(item) 
            }).catch((error)=>{
                console.log(error)
            })
        }

    //show Render Function
    function showRenderfun(item){
         var tempBatch=()=>{
            if(tempdate-`${item[0].RegNo.slice(0,2)}`>=3){
                return (`${item[0].RegNo.slice(0,2)} Pass out`)
            }else if(item[0].Degree==='UG'){
                if(tempdate-`${item[0].RegNo.slice(0,2)}`===0){
                    return `1 year`
                }else if(tempdate-`${item[0].RegNo.slice(0,2)}`===1){
                    return `2 year`
                }else if(tempdate-`${item[0].RegNo.slice(0,2)}`===2){
                    return `3 year`
                }
            }else if(item[0].Degree==='PG'){
                if(tempdate-`${item[0].RegNo.slice(0,2)}`===0){
                    return `1 year`
                }else if(tempdate-`${item[0].RegNo.slice(0,2)}`===1){
                    return `2 year`
                }else  if(tempdate-`${item[0].RegNo.slice(0,2)}`>=2){
                    return (`${item[0].RegNo.slice(0,2)} Pass out`)
                }
            }
        }
        var Batch=tempBatch()
    
        setShowRender(
            <div className='show__Render'>
            <div>Reg No : {item[0].RegNo&&item[0].RegNo.toUpperCase()}</div>
            <div>Name : {item[0].Name&&item[0].Name.toUpperCase()}</div>
            <div>Department: {`${item[0].Degree.toUpperCase()}. ${item[0].Course}`}</div>
            <div>Status : {Batch}</div>
            <div>DOB:{item[0].DOB&&item[0].DOB}</div>
            </div>
            )
    }

    useEffect(() => {
        getData();
        Aos.init({duration:2000})

    }, [])

 
    return (
        <div className='user__info' data-aos='zoom-in' >
            <div className="back__btn">
                <Link to='/UserList'>
                 <IconButton >
                 <ArrowBackIcon />
                 </IconButton>
                </Link>
            </div>

            <div className="info__section">
                <Switch>
                {/* Manin options section */}
                <Route path='/Userinfo/:id' exact component={()=>{
                        return <div className='option' data-aos='zoom-in'>
                            <Link to={`/Userinfo/${params.id}/show`}>
                                <IconButton className='potion__icon' style={{transition:'0.2s ease-in-out',width:'80px',height:'80px'}}><UserAvatar/></IconButton>
                            </Link>
                            <Link to={`/Userinfo/${params.id}/Update`}>
                            
                                <IconButton style={{width:'80px',height:'80px'}} className={`${classes.white} potion__icon`}><EditIcon style={{width:'50px',height:'50px'}} /></IconButton>
                            </Link>
                            <Link to={`/Userinfo/${params.id}/Password`}>
                                
                                <IconButton style={{width:'80px',height:'80px',}} className={`${classes.white} potion__icon`}><LockOpenIcon style={{width:'50px',height:'50px'}} /></IconButton>
                            </Link>
                            <Link to={`/Userinfo/${params.id}/Delete`}>
                                
                                <IconButton style={{width:'80px',height:'80px'}} className={`${classes.white} potion__icon`}><DeleteOutlineIcon style={{width:'50px',height:'50px'}} /></IconButton>
                            </Link>
                        </div>
                    }}/>

                    {/* Show section */}
                    <Route path='/Userinfo/:id/Show' exact component={()=>{
                        return <div className='show'  data-aos='zoom-in'>
                                <div className="back__btn__show">
                                    <Link to={`/Userinfo/${params.id}`}>
                                        <IconButton >
                                        <ArrowBackIcon />
                                        </IconButton>
                                    </Link>
                                </div>

                                <UserAvatar/>
                             {ShowRender}                        
                        </div>
                    }}/>
                
                    {/* Update section */}
                    <Route path='/Userinfo/:id/Update' component={()=>{
                        return <div className='update' data-aos='zoom-in'>
                                    <div className="back__btn__show">
                                        <Link to={`/Userinfo/${params.id}`}>
                                            <IconButton >
                                            <ArrowBackIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                                    <Update regno={UserData&&UserData[0].RegNo} name={UserData&&UserData[0].Name} degree={UserData&&UserData[0].Degree} course={UserData&&UserData[0].Course} dob={UserData&&UserData[0].DOB}/>

                        </div>
                    }}/>

                    {/* Password */}
                    <Route path='/Userinfo/:id/Password' component={()=>{
                        return <div className='password' data-aos='zoom-in'>
                                    <div className="back__btn__show">
                                        <Link to={`/Userinfo/${params.id}`}>
                                            <IconButton >
                                            <ArrowBackIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                            
                        </div>
                    }}/>

                    {/* Delete section */}
                    <Route path='/Userinfo/:id/Delete' component={()=>{
                        return <div className='delete' data-aos='zoom-in'>
                                <div className="back__btn__show">
                                        <Link to={`/Userinfo/${params.id}`}>
                                            <IconButton >
                                            <ArrowBackIcon />
                                            </IconButton>
                                        </Link>
                                    </div>
                            
                        </div>
                    }}/>
                </Switch>
            </div>


            <div className='book__section'>
                    <FullWidthTabs/>
            </div>

        </div>
    )
}

export default UserInfo;
