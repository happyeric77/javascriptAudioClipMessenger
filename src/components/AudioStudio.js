import React, { useEffect, useRef, useState } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import { useDatabase } from '../contexts/DatabaseContext';
import {useAuth} from '../contexts/AuthContext'
import {useZoom} from '../index'

export default function AudioStudio(props) {

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ Audio: true });
    const [recordTimer, setRecordTimer] = useState(0)
    const [toWhomList, setToWhomList] = useState()
    const [recordState, setRecordState] = useState(false)
    const titleRef = useRef()
    const toWhomRef = useRef()
    const meetingIdRef = useRef()
    const meetingPasswordRef = useRef()
    const recordtimerRef = useRef()
    const {uploadAudio, audioIdGen, getUserdatas, writeAudioDatas, listAllUserDatas} = useDatabase()
    const {currentUser} = useAuth()
    const {getSignature} = useZoom()
    
    async function startUpload(audioId, userDatas){
        if (mediaBlobUrl && titleRef.current.value !== '' && toWhomRef.current.value !== ''){
            await fetch(mediaBlobUrl).then(res=>{
                res.blob().then(blob=>{
                    const uploadTask = uploadAudio(blob, audioId)
                    uploadTask.on('state_changed', (snapshot)=>{
                        alert('Audio uploaded Successfully')
                    }, (error)=>{
                        alert(error)
                    }, ()=>{
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                            console.log('File available at', downloadURL);
                            writeAudioDatas(
                                audioId, 
                                userDatas.email, 
                                userDatas.group, 
                                toWhomRef.current.value,
                                titleRef.current.value,
                                downloadURL,
                            ).then(message=>{
                                console.log(message)
                            }).catch(error=>{
                                console.log(error)
                            })
                            document.getElementById('inputAudioTitle').value = ''
                            document.getElementById('inputToWhom').value = ''
                            setRecordTimer(0)
                        })
                    })
                }).catch(error=>{
                    alert(error)
                })
            }).catch(error=>{
                alert(error)
            })
        } else {
            alert('Audio file or title or toWhom field does not exist.')
        }
    }

    function handelToWhomChange(e){
        const dataRef = listAllUserDatas(toWhomRef.current.value).limitToFirst(4)
        dataRef.on('value', (snapshot) =>{
            const toWhoms = snapshot.val();
            setToWhomList(toWhoms)
        })
    }
    function handleInputToWhom(e){
        document.getElementById('inputToWhom').value = e.target.alt
    }


    // Ｕpload Audio buttun click function
    async function handleUploadAudio(){
        const audioId = audioIdGen(currentUser.email)
        const userDatas = getUserdatas(currentUser.email)
        if (props.forLeader){
            document.getElementById('inputToWhom').value = 'leaderMessage'
        }
        if (getUserdatas(toWhomRef.current.value)){
            startUpload(audioId, userDatas)
        }else if(toWhomRef.current.value === 'leaderMessage'){
            startUpload(audioId, userDatas)
        } else {
            alert('The seleted user is not a registered user')
        }
    }

    // Effect to handle record/stop record button
    useEffect(()=>{
        if (recordState){
            startRecording().then(message=>{
                console.log('Recording started')
            }).catch(error=>{
                console.log(error)
            })
            recordtimerRef.current = setInterval(()=>{
                setRecordTimer(prev=>prev+1)
            }, 1000)
        } else{
            clearInterval(recordtimerRef.current)
            stopRecording()
        }
    },[recordState])

    return (
        <div className='AudioLib w-100 flex-grow-1 p-3'>

            <input id='inputMeetingId' className='mx-1' ref={meetingIdRef} placeholder='ルーム番号' hidden={props.forLeader ? false: true}/>
            <input id='inputMeetingPassword' className='mx-1' ref={meetingPasswordRef} placeholder='ルーム暗証番号' hidden={props.forLeader ? false: true}/>
            <div className='btn btn-danger w-30 ml-5' style={props.forLeader ? {display: 'inline-block'}: {display: 'none'}} onClick={()=>{getSignature(currentUser.email ,meetingIdRef.current.value, meetingPasswordRef.current.value)}}>GO</div>
            <hr/>
            <div className='d-flex align-items-center'>
                <div className='p-3 my-1'　onClick={()=>console.log(currentUser.uid)}>{props.title}</div>
                <input id='inputToWhom' onChange={handelToWhomChange} className='h-50' ref={toWhomRef} placeholder='誰に伝えたい' hidden={props.forLeader ? true: false}/>
                
                <input id='inputAudioTitle' className='h-50 col-5' ref={titleRef} placeholder='タイトルを入力ください' />
            </div>

            {/* ToWhom seach section  */}
            <div className='d-flex' style={{height: '300px'}}>
                {toWhomList && Object.keys(toWhomList).map(key=>{
                    const userDatas = getUserdatas(currentUser.email)
                    if (userDatas.group === toWhomList[key].group){
                        return (
                            <div onClick={handleInputToWhom} className='d-flex flex-column justify-content-center align-items-center flex-content-stretch m-3'>
                                <img className='toWhomProfile' src={toWhomList[key].photoUrl} alt={toWhomList[key].email} />
                                <div className='text-center toWhomProfileText mt-3'>{toWhomList[key].name}</div>
                                <div className='text-center toWhomProfileText'>{toWhomList[key].email}</div>
                            </div>
                        )
                    }
                })}
            </div>
            
            <div className="d-flex flex-column">
                <div className='d-flex w-100 justify-content-center'>
                    {recordState ? 
                        <img src='https://img.3dmgame.com/uploads/images/news/20200507/1588833745_696789.gif' alt='wave' style={{width: '500px', borderRadius:'30px', border:'3px solid grey', height: '100px'}} />:
                        <img src='https://cloudinary-res.cloudinary.com/image/upload/c_fill,w_770/dpr_3.0,f_auto,fl_lossy,q_auto/waveform_post.png' alt='wave' style={{width: '500px', borderRadius:'30px', border:'3px solid grey', height: '100px'}} />
                        
                    }
                    <div className='h-100'>{recordTimer}</div>
                </div>

                {/* Start/Stop/Play record section */}
                <div className='d-flex w-100 align-items-center justify-content-center'>
                    {recordState ? 
                    <i className="far fa-stop-circle m-3" onClick={()=>{setRecordState((prev)=>!prev)}} style={{fontSize:'30px'}}></i> :  
                    <i className="fas fa-microphone-alt m-3" onClick={()=>{setRecordState((prev)=>!prev)}} style={{fontSize:'30px'}}></i>}
                    <i className="fas fa-cloud-upload-alt m-3" onClick={handleUploadAudio} style={{fontSize:'30px'}}></i>
                    <audio src={mediaBlobUrl} controls/>
                </div>
            </div>
            
        </div>
    )
}