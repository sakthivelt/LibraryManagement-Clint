import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'


export default function Updating(){
    const continer=useRef(null);
    useEffect(() => {
      
        lottie.loadAnimation({
            container:continer.current,
            renderer:'svg',
            loop:true,
            autoplay:true,
            animationData:require('../../assets/Updating.json')
        })

    }, [])

    return (
        <div  className='circleLoader' >
        <div ref={continer} style={{width:'420px',height:"420px"}}>
        </div>
        </div>
    )

}

// width:'100%',height:"100vh",display:'flex',justifyContent:'center',alignContent:'center'