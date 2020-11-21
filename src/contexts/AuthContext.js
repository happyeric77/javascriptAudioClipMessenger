import React, {useContext, useState, useEffect} from 'react'
import app from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export default function AuthProvider({children}) {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    }

    function signup(email, password){
        return app.auth().createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return app.auth().signOut()
    }

    function resetPassword(email){
        return app.auth().sendPasswordResetEmail(email)
    }

    useEffect(()=>{
        const unsubscribe = app.auth().onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
