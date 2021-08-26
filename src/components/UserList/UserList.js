import React, { useEffect, useState } from 'react';
import ListItem from '../ListItem/ListItem';
import './UserList.css';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Aos from 'aos';
import "aos/dist/aos.css"
//importing lottie animations
import SearchEmpty from '../Lottie/SearchEmpty'
import MiniLoader from '../Lottie/MiniLoader';

function UserList() {

    const [Degree,setDegree]=useState('');
    const [Course,setCourse]=useState('');
    const [Name, setName] = useState('');
    const [RegNo,setRegNo] = useState('');
    const [UserData,setUserData]=useState(null);
    const [UserData2,setUserData2]=useState(false);
    const [FilterData, setFilterData] = useState();
    const [SearchQuery,setSearchQuery]=useState({
        Degree:'',
        Course:'',
        Name:'',
        RegNo:'',
    });

    const getData= async ()=>{
            const data= await axios.get('http://localhost:5000/list').then((item)=>{
                setUserData(item.data);
                return item.data;
            }).then((item)=>{
                setUserData2(item.map((item,index)=>{
    return <Link data-aos='zoom-in' to={`/UserInfo/${item.RegNo}/Show`} key={index} style={{ color: 'gray',textDecoration:'none' }}><ListItem key={index} Name={item.Name} Degree={item.Degree} Course={item.Course} RegNo={item.RegNo}/></Link>

                }))
            }).catch(error=>console.log(error));
    }

    useEffect(() => {
        Aos.init({duration:2000})
       getData();
    }, [])

    useEffect(() => {
        setSearchQuery('');
        setSearchQuery({
          Degree:Degree.toLowerCase(),
          Course:Course.toLowerCase(),
          Name:Name.toLocaleLowerCase(),
          RegNo:RegNo.toLowerCase(),
      })
      
    }, [Degree,Course,Name,RegNo])


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

    console.log(document.body.scrollHeight)



    return (<>
    <div className='search__bar'>
        <div data-aos='zoom-in'  className="search__bar__item"><DropDown className='Input__feild' lable={'Degree' } DegreeValue={true} setitem={setDegree} item={Degree}/></div>
        <div data-aos='zoom-in' className="search__bar__item"><DropDown className='Input__feild' lable={"Course"} CoursesValues={true}  setitem={setCourse} item={Course} /></div>
        <div data-aos='zoom-in' className="search__bar__item"><TextField className='Input__feild' className='Input__feild'  id="input-with-icon-grid" label={"Name"} value={Name} onChange={(e)=>{setName(e.target.value)}}/></div>
        <div data-aos='zoom-in' className="search__bar__item"><TextField className='Input__feild' id="input-with-icon-grid" label={"Register No"} value={RegNo} onChange={(e)=>{setRegNo(e.target.value)}}/></div>
    </div>
        <div className='user__list'>
           {FilterData?FilterData.map((item,index)=>{
    return <Link data-aos='flip-left' to={`/UserInfo/${item.RegNo}/Show`} key={index} style={{ color: 'gray',textDecoration:'none' }}><ListItem key={index} Name={item.Name} Course={item.Course} RegNo={item.RegNo} Degree={item.Degree}/></Link>
           }):UserData2&&UserData2}
           {!UserData&&<MiniLoader/>}
           {(FilterData==0)&&<SearchEmpty/>}
        </div>
        </>
    )
}

export default UserList;
