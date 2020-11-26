import React from 'react'
import Profile from './Profile'
import Test from './Test'

export default function SideMenu(props) {

    
    return (
        
        <div className='p-4 col col-3'>
            <div className='d-flex justify-content-center'>
                <Profile image={true} update={true}/>
            </div>
            <div className='mt-5'>
                <div className='my-5 h6'>リーダーからの話（録音）</div>
                <div className='my-5 h6' onClick={props.switch}>リーダーからの話</div>
                <div>
                    <div className='mt-5 mb-3 h6'>気持ちの交換</div>
                    <div className='m-3' onClick={props.switch}>メッセージを送信する</div>
                    <div className='m-3' onClick={props.switch}>メッセージを聞く</div>
                </div>
            </div>
        </div>
        
    )
}
