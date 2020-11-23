import React, {createContext, useContext, useState, useEffect} from 'react'
import app from '../firebase'

const DatabaseContext = createContext()

export function useDatabase(){
    return useContext(DatabaseContext)
}

export default function DatabaseProvider({children}) {
    const [audioDatas, setAudioDatas] = useState()
    const [userDatas, setUserDatas] = useState()
    const [groupDatas, setGroupDatas] = useState()
    const [loading, setLoading] = useState(true)
    const audioDbRef = app.database().ref('records/')
    const userDbRef = app.database().ref('users/')
    const groupDbRef = app.database().ref('groupctl/')
    const imageStorageRef = app.storage().ref('images/')

    const value = {
        audioDatas,
        userDatas,
        groupDatas,
        writeUserDatas,
        updateUserName,
        uuid,
        updateProfilePhoto,
        retrieveUserDatas,
        updateUserGroup,
    }
    

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    }

    function writeUserDatas(id, email, group){
        return (
            app.database().ref(`users/${id}/`).set({
            id: id,
            name: email,
            email: email,
            group: group,
            leader: 'Undifined',
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/a-whole-new-world-f31f9.appspot.com/o/images%2Fnoun_profile_970722.png?alt=media&token=7e9b9a49-5ab7-44a1-b6e8-bba762b6e8c9'
            })
        )
    }
    function updateUserName(id, name){
        return (
            app.database().ref(`users/${id}/`).update({name: name})
        )
    }
    function updateUserGroup(id, group){
        return (
            app.database().ref(`users/${id}/`).update({group: group})
        )
    }


    function retrieveUserDatas(email){
        return userDbRef.orderByChild('email').equalTo(email)
    }

    function updateProfilePhoto(userId, photoPath){
        return imageStorageRef.child(`${userId}.jpg`).put(photoPath)
    }

    useEffect(()=>{
        const promises = [
            audioDbRef.on('value', (snapshot)=>{
                const raw = snapshot.val()
                const datas = Object.keys(raw).map(key=> {
                    const tempdatas = {...raw[key], id: key}
                    return tempdatas
                })            
                setAudioDatas(datas)
            }),
            userDbRef.on('value', (snapshot)=>{
                const raw = snapshot.val()
                const datas = Object.keys(raw).map(key=> {
                    const tempdatas = {...raw[key], id: key}
                    return tempdatas
                })            
                setUserDatas(datas)
            }),
            groupDbRef.on('value', (snapshot)=>{
                const raw = snapshot.val()
                setGroupDatas(raw)
            })
        ]
        Promise.all(promises).then(()=>{
            setLoading(false)
        }).catch((e)=>console.log(e))
    }, [])
    
    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}
