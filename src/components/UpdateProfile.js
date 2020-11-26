import React, {useRef, useState} from 'react'
import { Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useDatabase } from '../contexts/DatabaseContext'
import Profile from './Profile'

export default function UpdateProfile() {
    const [updateProfileState, setUpdateProfileState] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const groupRef = useRef()
    const groupSecretRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const photoRef = useRef()
    const confirmPassRef = useRef()   
    const {uploadProfilePhoto, 
            updateProfilePhoto, 
            retrieveUserDatas, 
            updateUserName, 
            groupDatas,
            updateUserGroup} = useDatabase()
    const {currentUser, updatePassword} = useAuth()

    async function handleUploadPhoto(e){
        e.preventDefault()
        console.log(photoRef.current.files.item(0))
        const　photoFile = photoRef.current.files.item(0)
        const uploadTask = uploadProfilePhoto(currentUser.uid, photoFile)

        uploadTask.on('state_changed', (snapshot)=>{
            setUpdateProfileState('Profile photo uploaded Successfully')
        }, (error)=>{
            setUpdateProfileState(error)
        }, ()=>{
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
                console.log('File available at', downloadURL);
                updateProfilePhoto(currentUser.uid, downloadURL).then(()=>{
                    console.log('profile photo updated')
                }).catch(error=>{
                    console.log(error)
                })
                document.getElementById('image-file').value = ''
            })
        })
    }

    async function handleUpdateName(e){
        e.preventDefault()
        setError('')
        setUpdateProfileState('')
        if (nameRef.current.value !== ''){
            await retrieveUserDatas(currentUser.email).once('value',(snapshot)=>{
                snapshot.forEach(item=>{
                    updateUserName(item.val().id, nameRef.current.value).then(message=>{
                        setUpdateProfileState('name updated successfully')
                        document.getElementById('inputName').value = ''
                    }).catch(message=>{
                        setError(message)
                    })
                })
            })
        } else {
            setError('Name cannot be empty')
        }
    }

    async function handleChangeGroup(e){
        e.preventDefault()

        setError('')
        setUpdateProfileState('')
        if (groupSecretRef.current.value === ''){
            setError('Group cannot be empty')
        }else if (groupSecretRef.current.value === JSON.stringify(groupDatas[groupRef.current.value].secret).replaceAll('"','')){
            await retrieveUserDatas(currentUser.email).once('value',(snapshot)=>{
                snapshot.forEach(item=>{
                    updateUserGroup(item.val().id, groupRef.current.value).then(message=>{
                        currentUser.updateProfile({
                            displayName: groupRef.current.value
                        })
                        setUpdateProfileState('Group updated successfully')
                        document.getElementById('inputGroup').value = ''
                        document.getElementById('inputGroupSecret').value = ''
                    }).catch(message=>{
                        setError(message)
                    })
                })
            })
        } else {
            setError('The group does not exist or secret does not match.')
        }
    }

    async function handleUpdatePassword(e){
        e.preventDefault()
        setError('')
        setUpdateProfileState('')
        console.log(passwordRef.current.value)
        console.log(confirmPassRef.current.value)
        if (passwordRef.current.value === confirmPassRef.current.value){
            currentUser.updatePassword(confirmPassRef.current.value).then(()=>{
                setUpdateProfileState('Password updated successfully')
                document.getElementById('inputPassword').value = ''
                document.getElementById('confirmPassword').value = ''
            }).catch(error=>{
                setError(error.message)
                
            })
        } else {
            setError('Confirm-password does not match')
        }
    }

    return (
        <div className='d-flex flex-column mt-5 pt-5 align-items-center'>
            <Profile image={true}/>
            
            <div className="card mt-3 p-3" style={{ width: '18rem' }} >
                
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Update Profile </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {updateProfileState && <div className="alert alert-success" role="alert">{updateProfileState}</div>}
                {loading && <div className="alert alert-dark" role="alert">Loading ... </div>}
                <form>
                    {/* Update photo section */}
                    <input ref={photoRef} id="image-file" type="file" accept="image/png, image/jpeg"  />
                    <button onClick={handleUploadPhoto} className="btn btn-warning my-2" style={{width:'100%'}}>Upload photo</button>

                    {/* Update name section */}
                    <div className="form-group">
                        <label htmlFor="inputName"><Profile name={true}/></label>
                        <input ref={nameRef} className="form-control" id="inputName" aria-describedby="nameHelp" placeholder="Enter new profile name"/>
                    </div>
                    <button onClick={handleUpdateName} className="btn btn-warning my-2" style={{width:'100%'}}>Update name</button>

                    {/* Update gruop section */}
                    <div className="form-group">
                        <label htmlFor="inputGroup"><Profile group={true}/></label>
                        <input ref={groupRef} className="form-control" id="inputGroup" aria-describedby="groupHelp" placeholder="Enter new group name"/>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="inputGroupSecret">Group Secret</label> */}
                        <input ref={groupSecretRef} className="form-control" id="inputGroupSecret" aria-describedby="groupHelp" placeholder="Enter new group secret"/>
                    </div>
                    <button onClick={handleChangeGroup} className="btn btn-warning my-2" style={{width:'100%'}}>Change group</button>

                    {/* Update password section */}
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="inputPassword" placeholder="New password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input ref={confirmPassRef} type="password" className="form-control" id="confirmPassword" placeholder="Confirm new password"/>
                    </div>                    
                    <button onClick={handleUpdatePassword} className="btn btn-warning" style={{width:'100%'}}>Update Password</button>
                    
                    <Link to='/' className='btn btn-light mt-3' style={{width:'100%'}}>Cancel</Link>
                </form>  
            </div>
        </div>
    )
}
