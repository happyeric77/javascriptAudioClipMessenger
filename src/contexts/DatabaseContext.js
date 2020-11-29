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
        updateProfilePhoto,
        uploadProfilePhoto,
        retrieveUserDatas,
        listAllUserDatas,
        getUserdatas,
        getAudioDatas,
        updateUserGroup,
        uploadAudio,
        audioIdGen,
        updateAudioDatas,
        deleteAudio,
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

    function getAudioDatas(){
        audioDbRef.orderByChild('from').once('value', (snapshot)=>{
            const audioDatas =[]
            snapshot.forEach(item=>{
                audioDatas.push(item.val())
            })
        })
        return audioDatas
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
            leader: '',
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/a-whole-new-world-f31f9.appspot.com/o/images%2Fnoun_profile_970722.png?alt=media&token=7e9b9a49-5ab7-44a1-b6e8-bba762b6e8c9'
            })
        )
    }

    function writeAudioDatas(audioId, from, group, name, title, url){
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
            app.database().ref(`records/${audioId}/`).set({
                audioId: audioId,
                timestamp: date.getTime(),
                date: `${year}/${month}/${day} ${hr}:${min}:${sec}`,
                from: from,
                group: group,
                name: name,
                title: title,
                url: url,
                editable: true,
            })
        )
    }

    function updateAudioDatas(audioId, content){
        app.database().ref(`records/${audioId}/`).set(content)
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

    function uploadProfilePhoto(userId, photoFile){
        return imageStorageRef.child(`${userId}.jpg`).put(photoFile)
    }

    function updateProfilePhoto(id, photoFileUrl){
        return (
            app.database().ref(`users/${id}/`).update({photoUrl: photoFileUrl})
        )
    }

    function uploadAudio(blob, audioId){
        return audioStorageRef.child(`${audioId}.wav`).put(blob)
    }

    function deleteAudio(audioId){
        return audioStorageRef.child(`${audioId}.wav`).delete()
    }

    useEffect(()=>{
        const promises = [
            audioDbRef.on('value', (snapshot)=>{
                const raw = snapshot.val()
                const datas = Object.keys(raw).map(key=> {
                    var now = new Date()
                    const audioId = raw[key].audioId
                    now = now.getTime()
                    // Make audio clip not deletable 5 mins after created
                    if (now - raw[key].timestamp > 5*60*1000){
                        app.database().ref(`records/${audioId}/`).update({editable: false})
                    }
                    // Delete audio clip 7 days after created
                    if (now - raw[key].timestamp > 7*24*60*60*1000){
                            audioStorageRef.child(`${audioId}.wav`).delete().then(()=>{
                            console.log('over 20sec and deleted')
                            app.database().ref(`records/${audioId}/`).set(null)
                        })
                    }
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
            }),
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
