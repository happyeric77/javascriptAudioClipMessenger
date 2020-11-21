import React from 'react'
import { Route } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
import Dashboard from './Dashboard'
import Login from './Login'


export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} = useAuth()
    return (
        <Route {...rest} component={(props)=>{return currentUser ? <Component {...props}/> : <Login/> }} />
    )
}
