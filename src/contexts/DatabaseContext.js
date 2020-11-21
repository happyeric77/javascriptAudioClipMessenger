import React, {createContext, useContext, useState, useEffect} from 'react'
import app from '../firebase'

const DatabaseContext = createContext()

export function useDatabase(){
    return useContext(DatabaseContext)
}

export default function DatabaseProvider({children}) {
    const [audioDatas, setAudioDatas] = useState()
    const [userDatas, setUserDatas] = useState()
    const [loading, setLoading] = useState(true)
    const audioDbRef = app.database().ref('records/')
    const userDbRef = app.database().ref('users/')

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
            })
        ]
        Promise.all(promises).then(()=>{
            setLoading(false)
        }).catch((e)=>console.log(e))
    }, [])
    
    const value = {
        audioDatas,
        userDatas,
    }
    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}
