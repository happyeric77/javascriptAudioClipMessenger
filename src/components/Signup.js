import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPassRef = useRef()
    const {signup, currentUser} = useAuth()
    const [error, setError] = useState()
    const [signupState, setSignupState] = useState()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        if (passwordRef.current.value !== confirmPassRef.current.value){
            setError('Passwords do not match')
        }else{
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value).then(userCred=>{
                setSignupState('You have signed up')
                setError(null)
            }).catch(error=>{
                setError(error.message)
            });
            setLoading(false)
        }
    }

    return (
        <div className='d-flex justify-content-center mt-5 pt-5'>
            <div className="card mt-5 p-3" style={{ width: '18rem' }} >
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Sign up </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {signupState && <div className="alert alert-success" role="alert">{signupState}</div>}
                {loading && <div className="alert alert-dark" role="alert">{loading}</div>}
                <form>
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
        </div>
    )
}
