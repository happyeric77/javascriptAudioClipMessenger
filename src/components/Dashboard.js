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
    const [manageMessageLib, setManageMessageLib] = useState(false)
    
    

    function handleSwitch(e){
        switch(e.target.innerHTML) {
            
            case 'リーダーからの話（録音）':
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(true)
                setManageMessageLib(false)
                break;
            case 'リーダーからの話':
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                setManageMessageLib(false)
                break;
            case 'メッセージを聞く':
                setLeaderMessageLib(false)
                setAllMessageLib(true)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                setManageMessageLib(false)
                break;
            case 'メッセージを送信する':
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(true)
                setLeaderStudioRoom(false)
                setManageMessageLib(false)
                break;
            case '送信履歴':
                setManageMessageLib(true)
                setLeaderMessageLib(false)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                break;               
            default:
                setLeaderMessageLib(true)
                setAllMessageLib(false)
                setStudioRoom(false)
                setLeaderStudioRoom(false)
                setManageMessageLib(false)
        }
    }


    return (
        <>  
            <div className="d-flex ">
                <SideMenu switch={handleSwitch} />
                
                {leaderStudioRoom && <AudioStudio title='リーダーからの話（録音）' forLeader={true} />}
                {leaderMessageLib && <AudioLib  title='リーダーからの話' content='showLeaderMessages' />}
                {allMessagesLib && <AudioLib title='メッセージを聞く' content='showPeerMessages'/>}
                {studioRoom && <AudioStudio title='メッセージを送信する' forLeader={false} />}
                {manageMessageLib && <AudioLib title='送信履歴' titles='okoktest' content='showMineMessage' />}

            </div>
        </>
    )
}
