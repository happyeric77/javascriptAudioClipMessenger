import React from 'react'



export default function Test() {
    function handleStartRecord(){
        try{
            navigator.mediaDevices.getUserMedia({audio: true}).then(
                stream => {
                    console.log("Mic authorized！");
                }).catch(() => {
                    console.error("Fail to get Mic!");
                });
        } catch {
            console.error("Browser does not support getUserMedia");
        }
    }
    
    

    return (
        <div>
            <audio>?? dcdcdcdc</audio>
            <button className='btn btn-primary' onClick={handleStartRecord}>start</button>
        </div>
    )
}
