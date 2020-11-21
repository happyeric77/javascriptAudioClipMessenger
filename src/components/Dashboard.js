import React, {useState, useEffect} from 'react'
import {useAuth} from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useDatabase } from '../contexts/DatabaseContext'

export default function Dashboard() {
    const [error, setError] = useState()
    const {logout, currentUser} = useAuth()
    const { datas } = useDatabase()
    var audioArry = {}

    async function handleSubmit(e){
        e.preventDefault()
        await logout().then(()=>{
            console.log('You logged out successfully')
        }).catch(()=>{
            console.log('Fail to log out')
        })
    }

    function handlePlayAudio(e){
        audioArry[e.target.value].play()
    }

    function handlePauseAudio(e){
        audioArry[e.target.value].pause()
    }

    function handleStopAudio(e){
        audioArry[e.target.value].pause()
        audioArry[e.target.value].currentTime = 0
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">whole-new-world</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {currentUser.email}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to='/' className="dropdown-item btn btn-primary mt-3" style={{width:'100%'}}>Update profile</Link>
                                <button onClick={handleSubmit} className="dropdown-item btn btn-primary mt-3" style={{width:'100%'}}>Logout</button>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            {datas.map(data=>{
                const newAudio = new Audio(data.url)
                audioArry[data.id] = newAudio
                return (
                    <>
                        <div>{data.title}</div>
                        <div>{data.date}</div>
                        <div>{data.name}</div>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={handlePlayAudio} value={data.id}>Play</button>
                        <button className="btn btn-outline-warning my-2 my-sm-0" onClick={handlePauseAudio} value={data.id}>Pause</button>
                        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={handleStopAudio} value={data.id}>Stop</button>
                    </>
                )
            })}                      
        </>
    )
}
