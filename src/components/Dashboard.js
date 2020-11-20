import React, {useState} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState()
    const {logout, currentUser} = useAuth()

    async function handleSubmit(){
        await logout().then(()=>{
            console.log('You logged out successfully')
        }).catch(()=>{
            console.log('Fail to log out')
        })
    }

    return (
        <div className='d-flex flex-column mt-5 pt-5 align-items-center'>
            <div className="card mt-5 p-3" style={{ width: '18rem' }} >
                <div className="h1 mb-3" style={{textAlign: 'center'}}> Profile </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="h5 w-100">Email:</div>
                <div>{currentUser.email}</div>
                <Link to='/' className="btn btn-primary mt-3" style={{width:'100%'}}>Update profile</Link>
                <button onClick={handleSubmit} className="btn btn-primary mt-3" style={{width:'100%'}}>Logout</button>            
            </div>       
        </div>
    )
}
