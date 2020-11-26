import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import {useDatabase} from '../contexts/DatabaseContext'

export default function Signup() {
    const groupRef = useRef()
    const groupSecretRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()
    const {signup} = useAuth()
    const {groupDatas, writeUserDatas} = useDatabase()
    const [error, setError] = useState()
    const [signupState, setSignupState] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        setError('')
        setSignupState('')
        e.preventDefault()
        if (passwordRef.current.value !== confirmPassRef.current.value){
            setError('Passwords do not match')
        }else if (groupSecretRef.current.value !== JSON.stringify(groupDatas[groupRef.current.value]).replaceAll('"','')){
            setError('Group secret does not match')
        }else{
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then(userCred=>{
                const user =userCred.user
                user.updateProfile({
                    displayName: groupRef.current.value
                })
                writeUserDatas(user.uid, user.email, groupRef.current.value).then(()=>{
                    setError(null)
                    setSignupState('You have signed up')
                    history.push('/')
                }).catch(error=>{
                    setError(error.message)
                })
            }).catch(error=>{
                setError(error.message)
            });

            setLoading(false)
        }
    }

    return (
        <div className='d-flex flex-column mt-5 pt-5 align-items-center'>
            <div className="card mt-5 p-3" style={{ width: '18rem' }} >
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Sign up </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {signupState && <div className="alert alert-success" role="alert">{signupState}</div>}
                {loading && <div className="alert alert-dark" role="alert">Loading ... </div>}
                <form>
                    <div className="form-group">
                        <label htmlFor="inputGroup">Group</label>
                        <input ref={groupRef} className="form-control" id="inputGroup" aria-describedby="groupHelp" placeholder="Enter Group Name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputGroupSecret">Group Secret</label>
                        <input ref={groupSecretRef} className="form-control" id="inputGroupSecret" aria-describedby="groupHelp" placeholder="Enter Group Secret"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input ref={emailRef} type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input ref={confirmPassRef} type="password" className="form-control" id="confirmPassword" placeholder="Password"/>
                    </div>
                    
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{width:'100%'}}>Submit</button>
                </form>  
            </div>
            <div className="mt-2">Aready have an account? <Link to='/login'>login</Link></div>
        </div>
    )
}
