import './App.css';
import React, { useEffect, useState } from 'react';
import Dashboard from './Main'
import { BrowserRouter } from 'react-router-dom';
// import ContentLoader from "react-content-loader"
import GmailLoader from "./components/Loader/Loder"
import CircleLoading from './components/Lottie/CircleLoading'



function App() {

  const [value, setvalue] = useState(false);

        useEffect(()=>{
            setTimeout(function(){
                  setvalue(true) 
                  }, 1);
        },[])



  return (<div className='app'>

             <BrowserRouter>
                   {value?<Dashboard/>:<CircleLoading/>}
            </BrowserRouter>        
   </div>
  );
}

export default App;


// <BrowserRouter>
// {value?<Dashboard/>:<Loading/>}
//     </BrowserRouter>    

// {value?<Dashboard/>:<>{nLoaders.map((item,index)=>{return <GmailLoader key={index}/>})}</>}
