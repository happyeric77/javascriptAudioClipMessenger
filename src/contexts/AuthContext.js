import React, {useContext, useState, useEffect} from 'react'
import app from '../firebase'

// IMPORTANT: 
// 1. Firebase default Authentification's "displayName" field is used as "group name" of user
// 2. Firebase default Authentification's "photoUrl field is used as "leader" of user


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
        updatePasword,
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

    function updatePasword(user, password){
        return user.updatePassword(password)
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
