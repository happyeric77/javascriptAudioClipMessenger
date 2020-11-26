import React, { useRef} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

export default function AudioLib(props) {
    const { audioDatas} = useDatabase()
    const { currentUser} = useAuth()
    return (
        <div className='AudioLib w-100 flex-grow-1 p-3'>
            <div className='p-3 my-2'>{props.title}</div>

            {(audioDatas) && audioDatas.map(audioData=>{
                switch (props.fromLeader){
                    case true:
                        try {
                            if (audioData.name === currentUser.email && audioData.group === currentUser.displayName && currentUser.photoURL.replaceAll(' ', '') === audioData.from){
                                return (
                                    <> 
                                        <div className='d-flex my-4' style={{backgroundColor: '#ffffff', borderRadius: '25px'}}>
                                            <div className='col col-2 m-auto text-center'>{audioData.date}</div>
                                            <div className='col col-4 m-auto'>{audioData.title}</div>
                                            <div className='col col-2 m-auto'> {audioData.from}</div>
                                            <audio className='flex-grow-1' src={audioData.url} controls  />
                                        </div>
                                    </>
                                )
                            }
                        }catch{
                            console.log('no auido clip from leader')
                        }

                        break;
                    case false:
                        if (audioData.name === currentUser.email && audioData.group === currentUser.displayName){
                            return (
                                <>
                                    <div className='d-flex my-4' style={{backgroundColor: '#ffffff', borderRadius: '25px'}}>
                                        <div className='col col-2 m-auto text-center'>{audioData.date}</div>
                                        <div className='col col-4 m-auto'>{audioData.title}</div>
                                        <div className='col col-2 m-auto'> {audioData.from}</div>
                                        <audio className='flex-grow-1' src={audioData.url} controls  />
                                    </div>
                                    
                                </>
                            )
                        }
                        break;
                }
            })} 
        </div>
    )
}
