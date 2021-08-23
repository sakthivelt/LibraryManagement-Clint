import React,{useEffect,useRef} from 'react'
import lottie from 'lottie-web'


function Status() {

    const continer=useRef(null);
    useEffect(() => {
      
        lottie.loadAnimation({
            container:continer.current,
            renderer:'svg',
            loop:true,
            autoplay:true,
            animationData:require('../../assets/Man.json')
        })

    }, [])

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100vh"}}>
        <div ref={continer} style={{width:'100px',height:"100px"}}>
        </div>
        </div>
    )
}

export default Status
