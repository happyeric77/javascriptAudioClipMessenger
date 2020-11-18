import React, {useContext, useState, useEffect} from 'react'
import app from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const value = {
        currentUser,
        signup,
    }

    function signup(email, password){
        return app.auth().createUserWithEmailAndPassword(email, password)
    }

    useEffect(()=>{
        const unsubscribe = app.auth().onAuthStateChanged(user=>{
            setCurrentUser(user)
        })
        return unsubscribe
    },[])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
