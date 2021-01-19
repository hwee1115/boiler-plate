import React,{useEffect} from 'react'
import axios from 'axios';
function LandingPage() {
    
    useEffect(()=>{
        axios.get('/api/hello') //Request를 보내기 위한 라이브러리
        .then(response => console.log(response.data))
    },[])

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            ,width:'100%', height:'100vh'
        }}>
            <h2>시작페이지</h2>
        </div>
    )
}

export default LandingPage
