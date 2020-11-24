import React, { useRef, useState } from 'react'
import { useReactMediaRecorder } from "react-media-recorder";
import { useDatabase } from '../contexts/DatabaseContext';
import {useAuth} from '../contexts/AuthContext'
import Test from './Test';

export default function AudioStudio(props) {

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ Audio: true });
    const [recordTimer, setRecordTimer] = useState(0)
    const [toWhomList, setToWhomList] = useState()
    const titleRef = useRef()
    const toWhomRef = useRef()
    const recordtimerRef = useRef()
    const {uploadAudio, audioIdGen, getUserdatas, writeAudioDatas, listAllUserDatas} = useDatabase()
    const {currentUser} = useAuth()

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

    async function handleUploadAudio(){
        const audioId = audioIdGen(currentUser.email)
        const userDatas = getUserdatas(currentUser.email)
        if (getUserdatas(toWhomRef.current.value)){
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
        } else {
            alert('The seleted user is not a registered user')
        }
        
        
    }

    function handleStartRecording(){
        startRecording()
        recordtimerRef.current = setInterval(()=>{
            setRecordTimer(prev=>prev+1)
        }, 1000)
    }

    function handleStopRecording(){
        clearInterval(recordtimerRef.current)
        stopRecording()
    }

    return (
        <div className='AudioLib w-100 flex-grow-1 p-3'>
            <div className='d-flex align-items-center'>
                <div className='p-3 my-2'　onClick={()=>console.log(currentUser.uid)}>{props.title}</div>
                <input id='inputToWhom' onChange={handelToWhomChange} className='h-50' ref={toWhomRef} placeholder='誰に伝えたい' />
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
                    <img src='https://cloudinary-res.cloudinary.com/image/upload/c_fill,w_770/dpr_3.0,f_auto,fl_lossy,q_auto/waveform_post.png' alt='wave' style={{width: '500px', borderRadius:'30px', border:'3px solid grey', height: '100px'}} />
                    <div className='h-100'>{recordTimer}</div>
                </div>
                <div className='d-flex w-100 align-items-center justify-content-center'>
                    <i className="fas fa-microphone-alt m-3" onClick={handleStartRecording} style={{fontSize:'30px'}}></i>
                    <i className="far fa-stop-circle m-3" onClick={handleStopRecording} style={{fontSize:'30px'}}></i>
                    <i className="fas fa-cloud-upload-alt m-3" onClick={handleUploadAudio} style={{fontSize:'30px'}}></i>

                    <audio src={mediaBlobUrl} controls/>
                </div>
            </div>
            
        </div>
    )
}