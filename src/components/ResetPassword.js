import React, {useState, useRef} from 'react'
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'

export default function ResetPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [resetState, setResetState] = useState()

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        setError(null)
        setResetState(null)
        await resetPassword(emailRef.current.value).then((message)=>{
            setResetState(()=>'Password reset instruction has been sent to the eamil.')
            
        }).catch((message)=>{
            setError(message.message)
        })
        setLoading(false)
    }

    return (
        <div className='d-flex flex-column mt-5 pt-5 align-items-center'>
            <div className="card mt-5 p-3" style={{ width: '18rem' }} >
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Password Reset </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {resetState && <div className="alert alert-success" role="alert">{resetState}</div>}
                {loading && <div className="alert alert-dark" role="alert">Loading...</div>}
                <form>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input ref={emailRef} type="email" className="form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>            
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary" style={{width:'100%'}}>Rest password</button>
                </form>  
            </div> 
            <div className="mt-2"> Back to <Link to='/login'>Login page</Link></div>         
        </div>
    )
}
