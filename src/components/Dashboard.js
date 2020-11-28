import React, { useState, useEffect } from 'react'
import AudioLib from './AudioLib'
import AudioStudio from './AudioStudio'
import SideMenu from './SideMenu'
import Test from './Test'


export default function Dashboard() {
    const [allMessagesLib, setAllMessageLib] = useState(true)
    const [leaderMessageLib, setLeaderMessageLib] = useState(false)
    const [studioRoom, setStudioRoom] = useState(false)
    const [leaderStudioRoom, setLeaderStudioRoom] = useState(false)
    
    

    function handleSwitch(e){
        switch(e.target.innerHTML) {
            case 'リーダーからの話（録音）':
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(true)
                break;
            case 'リーダーからの話':
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                break;
            case 'メッセージを聞く':
                setLeaderMessageLib(false)
                setAllMessageLib(true)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                break;
            case 'メッセージを送信する':
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(true)
                setLeaderStudioRoom(false)
                break;
            default:
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
        }
    }


    return (
        <>  
            <div className="d-flex ">
                <SideMenu switch={handleSwitch} />
                
                {leaderStudioRoom && <AudioStudio title='リーダーからの話（録音）' forLeader={true} />}
                {leaderMessageLib && <AudioLib  title='リーダーからの話' fromLeader={true} />}
                {allMessagesLib && <AudioLib title='メッセージを聞く' fromLeader={false}/>}
                {studioRoom && <AudioStudio title='メッセージを送信する' forLeader={false} />}

            </div>
        </>
    )
}
