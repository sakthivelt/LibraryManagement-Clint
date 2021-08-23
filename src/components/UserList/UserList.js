import React, { useEffect, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './UserList.css';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Link} from 'react-router-dom'

function UserList() {

    const [Degree,setDegree]=useState('');
    const [Course,setCourse]=useState('');
    const [Batch, setBatch] = useState('');
    const [RegNo,setRegNo] = useState('');
    const [UserData,setUserData]=useState(null);
    const [UserData2,setUserData2]=useState(false);
    const [FilterData, setFilterData] = useState();
    const [SearchQuery,setSearchQuery]=useState({
        Degree:'',
        Course:'',

        RegNo:'',
    });
    const DDD=[{_id:"6120f863d0790911581afd58",RegNo:"19UCS4890",Name:"SAKTHIVEL T",Degree:"UG",Course:"Computer Science",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-21T12:58:11.704Z",__v:0},{_id:"6120f8e4d0790911581afd5e",RegNo:"19UCS4891",Name:"VISHNU K",Degree:"UG",Course:"Computer Science",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-21T13:00:20.791Z",__v:0},{_id:"6120f92fd0790911581afd62",RegNo:"19UMA4890",Name:"SINGARAM",Degree:"PG",Course:"Maths",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-21T13:01:35.157Z",__v:0},{_id:"6121d61ad0790911581afe06",RegNo:"18ucs4890",Name:"main",Degree:"PG",Course:"Computer Science",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-22T04:44:10.093Z",__v:0},{_id:"6121d6ccd0790911581afe0b",RegNo:"20ucs4890",Name:"Singaravelan S",Degree:"PG",Course:"commerce",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-22T04:47:08.389Z",__v:0},{_id:"6121d72ad0790911581afe0f",RegNo:"21ucs4890",Name:"sam",Degree:"UG",Course:"commerce",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-22T04:48:42.038Z",__v:0},{_id:"6121d739d0790911581afe12",RegNo:"21ucs4891",Name:"sam2",Degree:"UG",Course:"Maths",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-22T04:48:57.663Z",__v:0},{_id:"6121da54d0790911581afe19",RegNo:"19UCS40",Name:"test",Degree:"PG",Course:"English",DOB:"2021-08-21",Books:[],TimeStamp:"2021-08-22T05:02:12.476Z",__v:0}];
    const getData= async ()=>{
            const data= await axios.get('http://localhost:5000/list').then((item)=>{
                setUserData(item.data);
                return item.data;
            }).then((item)=>{
                setUserData2(item.map((item,index)=>{
    return <Link to={`/UserInfo/${item.RegNo}`} key={index} style={{ color: 'gray',textDecoration:'none' }}><ListItem key={index} Name={item.Name} Degree={item.Degree} Course={item.Course} RegNo={item.RegNo}/></Link>

                }))
            }).catch(error=>console.log(error));
    }

    useEffect(() => {
       getData();
    }, [])

    useEffect(() => {
        setSearchQuery('');
        setSearchQuery({
          Degree:Degree.toLowerCase(),
          Course:Course.toLowerCase(),
        
          RegNo:RegNo.toLowerCase(),
      })
      
    }, [Degree,Course,Batch,RegNo])


    useEffect(() => {
        fltrfun();
    }, [SearchQuery])

    function fltrfun(){
        if(UserData){
            var data=UserData.filter((item)=>{
                var TorF=true;
                for(let i in SearchQuery){
                    if(item[i]===undefined||item[i].toLowerCase().includes(SearchQuery[i].toLowerCase())||item[i].toLowerCase()===SearchQuery[i].toLowerCase()||SearchQuery[i]===''){
                        TorF=true;
                    }else{
                        TorF=false;
                        break;
                    }
                }
                return(TorF);
            })

        }
        console.log(data);
        setFilterData(data);
    
    }




    return (<>
    <div className='search__bar'>
        <div className="search__bar__item"><DropDown lable={'Degree' } DegreeValue={true} setitem={setDegree} item={Degree}/></div>
        <div className="search__bar__item"><DropDown lable={"Course"} CoursesValues={true}  setitem={setCourse} item={Course} /></div>
        <div className="search__bar__item"><TextField id="input-with-icon-grid" label={"Register No"} value={RegNo} onChange={(e)=>{setRegNo(e.target.value)}}/></div>
    </div>
        <div className='user__list'>
           {FilterData?FilterData.map((item,index)=>{
    return <Link to={`/UserInfo/${item.RegNo}`} key={index} style={{ color: 'gray',textDecoration:'none' }}><ListItem key={index} Name={item.Name} Course={item.Course} RegNo={item.RegNo} Degree={item.Degree}/></Link>
           }):UserData2&&UserData2}
           {!UserData&&<h1>User Data was Empt </h1>}
           {(FilterData==0)&&<h1>search item was note found</h1>}
        </div>
        </>
    )
}

export default UserList;


  // useEffect(() => {
    //    setQuery({
    //        Degree:Degree,
    //        Course:Course,
    //        Batch,
    //        RegNo,
    //    })
    // }, [Degree,Course,Batch,RegNo])
  
    // return <Link to={`/UserInfo/${item.RegNo}`} style={{ color: 'gray',textDecoration:'none' }}><ListItem Name={item.Name} Degree={item.Course} RegNo={item.RegNo}/></Link>
    // useEffect(()=>{
    //     if(Degree&&UserData){
    //         let sample=UserData.filter((item)=>{
    //            if(item.Degree.toUpperCase()===Degree.toUpperCase()){
    //                return true;
    //            }else{
    //                return false;
    //            }
    //         })
    //     setFilterData(sample)
    //     }
        
    // },[Degree])    

    // useEffect(()=>{
    //     if(Course&&UserData){
    //         if(FilterData){
    //             let sample=FilterData.filter((item)=>{
    //                 if(item.Course.toUpperCase()===Course.toUpperCase()){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //              })
    //          setFilterData(sample)
    //         }else{
    //             let sample=UserData.filter((item)=>{
    //                 if(item.Course.toUpperCase()===Course.toUpperCase()){
    //                     return true;
    //                 }else{
    //                     return false;
    //                 }
    //              })
    //              setFilterData(sample)
    //         }
    //     }
        
    // },[Course])    
