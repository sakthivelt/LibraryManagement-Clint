import React from 'react';
import './UserInfo.css'
import { useParams,useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function UserInfo() {

const params=useParams();
const Backbtn=useHistory();
    
    return (
        <div className='user__info' onClick={()=>{Backbtn.goBack()}}>
            <div className="back__btn">
        <IconButton >
        <ArrowBackIcon />
      </IconButton>
            </div>
            Hi {params.id}
        </div>
    )
}

export default UserInfo;
