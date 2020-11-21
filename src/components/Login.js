import React, {useRef, useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError] = useState()
    const [loginState, setLoginState] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value).then((user)=>{
            setError(null)
            setLoginState('You have logged in successfully')
            history.push('/')
        }).catch((error)=>{
            setError(error.message)
        })
        setLoading(false)
    }

    return (
        <div className='d-flex flex-column mt-5 pt-5 align-items-center'>
            <div className="card mt-5 p-3" style={{ width: '18rem' }} >
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Login </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {loginState && <div className="alert alert-success" role="alert">{loginState}</div>}
                {loading && <div className="alert alert-dark" role="alert">Loading...</div>}
                <form>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input ref={emailRef} type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>                    
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{width:'100%'}}>Submit</button>
                    <Link to='/reset-password'>Forgot the password?</Link>
                </form>  
            </div> 
            <div className="mt-2">Need an account? <Link to='/signup'>Sign up</Link></div>         
        </div>
    )
}
