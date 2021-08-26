import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'


export default function CircleLoading(){
    const continer=useRef(null);
    useEffect(() => {
      
        lottie.loadAnimation({
            container:continer.current,
            renderer:'svg',
            loop:true,
            autoplay:true,
            animationData:require('../../assets/CircleLoading.json')
        })

    }, [])

    return (
        <div style={{position:'absolute',top:'25vh',left:'35%'}} className='circleLoader'>
        <div ref={continer} style={{width:'420px',height:"420px"}}>
        </div>
        </div>
    )

}

// width:'100%',height:"100vh",display:'flex',justifyContent:'center',alignContent:'center'