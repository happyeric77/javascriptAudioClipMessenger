import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'

export default function AudioLib(props) {
    const { audioDatas, deleteAudio, updateAudioDatas} = useDatabase()
    const { currentUser} = useAuth()

    function handleDeleteAudio(audioId){
        console.log('delete audio button clicked')
        console.log(audioId)
        deleteAudio(audioId).then(()=>{
            updateAudioDatas(audioId, null)
        }).catch(e=>{
            console.log(e)
        })
    }
    

    return (
        <div className='AudioLib w-100 flex-grow-1 p-3'>
            <div className='p-3 my-2'>{props.title}</div>

            {(audioDatas) && audioDatas.map(audioData=>{
                switch (props.content){
                    case 'showLeaderMessages':
                        try {
                            if (audioData.name === 'leaderMessage' && audioData.group === currentUser.displayName){
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
                    case 'showPeerMessages':
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
                    case 'showMineMessage':
                        if (audioData.from === currentUser.email){
                            const editable = audioData.editable
                            return (
                                <>
                                    <div className='d-flex my-4' style={{backgroundColor: '#ffffff', borderRadius: '25px'}}>
                                        {editable && <i class="fas fa-trash-alt col col-1 m-auto text-center" onClick={()=>{handleDeleteAudio(audioData.audioId)}} style={{color:'red'}}></i>}
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
