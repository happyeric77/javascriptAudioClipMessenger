import React from 'react'
import {useDatabase} from '../contexts/DatabaseContext'
import {useAuth} from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile(props) {
    const {userDatas} = useDatabase()
    const {logout, currentUser} = useAuth()
    
    function handleLogout(e){
        logout().then(()=>{
            console.log('You logged out successfully')
        }).catch(()=>{
            console.log('Fail to log out')
        })
    }

    return (
        <div>
            {userDatas && userDatas.map((userData)=>{
                var returnObj = null
                if (userData.email === currentUser.email){
                    returnObj = (
                        <>
                            {props.image && <img src={userData.photoUrl} alt={userData.name} className='img-thumbnail profilePhoto' />}
                            
                            {props.id && <div>User ID: {userData.id}</div>}

                            {props.name && <div> Name: {userData.name} </div>}
                            
                            {props.email && <div>Email: {userData.email}</div>}

                            {props.leader && <div>Leader: {userData.leader}</div>}

                            {props.group && <div>Group: {userData.group}</div>}
                            
                            {props.update && (
                                <div className="dropdown show mt-2">
                                    <div className="btn btn-outline-light dropdown-toggle" style={{borderRadius: '20px', width: '150px', overflow: 'hidden'}} role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {userData.name}
                                    </div>
                                    <div className="dropdown-menu dropdown-menu-left" >
                                        <Link className="dropdown-item" to='/update-profile'>Update profile</Link>
                                        <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                                    </div>
                            
                                </div>)
                            }
                        </>
                    )
                }
                return returnObj
            })}
        </div>
    )
}
