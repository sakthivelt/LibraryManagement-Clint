import './App.css';
import React, { useEffect, useState } from 'react';
import Dashboard from './Main'
import { BrowserRouter } from 'react-router-dom';
// import ContentLoader from "react-content-loader"
import GmailLoader from "./components/Loader/Loder"


function App() {

  const [value, setvalue] = useState(false);
  var nLoaders=[1,2,3,4,5]

        useEffect(()=>{
        console.log('this is useEffect')
        setvalue(true)
        },[])



  return (<div className='app'>

             <BrowserRouter>
                   {value?<Dashboard/>:<>{nLoaders.map((item,index)=>{return <GmailLoader key={index}/>})}</>}
            </BrowserRouter>        
   </div>
  );
}

export default App;


// <BrowserRouter>
// {value?<Dashboard/>:<Loading/>}
//     </BrowserRouter>    

// {value?<Dashboard/>:<>{nLoaders.map((item,index)=>{return <GmailLoader key={index}/>})}</>}
