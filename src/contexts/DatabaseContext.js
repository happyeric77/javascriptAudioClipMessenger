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
    const audioStorageRef = app.storage().ref('records/')

    const value = {
        audioDatas,
        userDatas,
        groupDatas,
        writeUserDatas,
        writeAudioDatas,
        updateUserName,
        uuid,
        updateProfilePhoto,
        retrieveUserDatas,
        listAllUserDatas,
        getUserdatas,
        updateUserGroup,
        uploadAudio,
        audioIdGen,
    }
    

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    }

    function audioIdGen(userEmail){
        // {group}-{email}-{date}
        var audioId = null
        retrieveUserDatas(userEmail).once('value',(snapshot)=>{
            snapshot.forEach(item=>{
                audioId = `${item.val().group}-${item.val().id}-${Date.now()}`
            })
        })
        return audioId
    }
    
    function retrieveUserDatas(email){
        return userDbRef.orderByChild('email').equalTo(email)
    }
    //Retrieve specific user data object by email adress
    function getUserdatas(userEmail){
        var user = null
        retrieveUserDatas(userEmail).once('value',(snapshot)=>{
            snapshot.forEach(item=>{
                user = item.val()
            })
        })
        return user
    }

    //Retrieve all users' list by the order
    function listAllUserDatas(keyword){
        return userDbRef.orderByChild('email').startAt(keyword)
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

    function writeAudioDatas(AudioId, from, group, name, title, url){
        const date = new Date()
        const [year, month, day, hr, min, sec] = [
            date.getFullYear(),
            date.getMonth()+1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        ]
        return (
            app.database().ref(`records/${AudioId}/`).set({
                date: `${year}/${month}/${day} ${hr}:${min}:${sec}`,
                from: from,
                group: group,
                name: name,
                title: title,
                url: url,
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

    function updateProfilePhoto(userId, photoPath){
        return imageStorageRef.child(`${userId}.jpg`).put(photoPath)
    }

    function uploadAudio(blob, audioId){
        return audioStorageRef.child(`${audioId}.wav`).put(blob)
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
