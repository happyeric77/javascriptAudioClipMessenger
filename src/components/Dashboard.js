import React, { useState } from 'react'
import AudioLib from './AudioLib'
import AudioStudio from './AudioStudio'
import SideMenu from './SideMenu'

export default function Dashboard() {
    const [allMessagesLib, setAllMessageLib] = useState(true)
    const [leaderMessageLib, setLeaderMessageLib] = useState(false)
    const [studioRoom, setStudioRoom] = useState(false)
    
    function handleSwitch(e){
        switch(e.target.innerHTML) {
            case 'リーダーからの話':
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
                break;
            case 'メッセージを聞く':
                setLeaderMessageLib(false)
                setAllMessageLib(true)
                setStudioRoom(false)
                break;
            case 'メッセージを送信する':
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(true)
                break;
            default:
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
        }
    }


    return (
        <>  
        
            <div className="d-flex ">
                <SideMenu switch={handleSwitch} />
                {leaderMessageLib && <AudioLib  title='リーダーからの話' fromLeader={true} />}
                {allMessagesLib && <AudioLib title='メッセージを聞く' fromLeader={false}/>}
                {studioRoom && <AudioStudio title='メッセージを送信する' />}

            </div>
        </>
    )
}
