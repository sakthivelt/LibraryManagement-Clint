import React from 'react';
import './NaveBar.css';
import {Route} from 'react-router-dom';

function NaveBar(){

console.log(window)
    return(
    <div className="main">
    <div><Route exact path='/one' component={()=>{return <h1>One</h1>}} /></div>
    <div><Route exact path='/two' component={()=>{return <h1>two</h1>}} /></div>
    <div><Route exact path='/three' component={()=>{return <h1>three</h1>}} /></div>    
       <div></div>
       <div></div>
       <div></div>
       <div></div>
       <div></div>       
        </div>
    )
}
export default NaveBar ;
export const Detial={name:'sakthivel',age:20}