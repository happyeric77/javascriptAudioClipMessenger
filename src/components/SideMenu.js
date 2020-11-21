import React from 'react'
import {useDatabase} from '../contexts/DatabaseContext'
import {useAuth} from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function SideMenu() {
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
        <div className='p-3'>
            {userDatas && userDatas.map((userData)=>{
                var returnObj = null
                if (userData.email === currentUser.email){
                    returnObj = (
                        <>
                            <img src={userData.photoUrl} alt={userData.name} className='img-thumbnail profilePhoto' />
                            
                            <div class="dropdown show">
                                <a class="btn btn-outline-light dropdown-toggle" style={{borderRadius: '20px'}} href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userData.name}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <Link class="dropdown-item">Update profile</Link>
                                    <a class="dropdown-item" onClick={handleLogout}>Logout</a>
                                </div>
                            </div>
                        </>
                    )
                }else{
                    returnObj = null
                }
                return returnObj
            })}
        </div>
    )
}
