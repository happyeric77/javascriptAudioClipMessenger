import React, {createContext, useContext, useState, useEffect} from 'react'
import app from '../firebase'

const DatabaseContext = createContext()

export function useDatabase(){
    return useContext(DatabaseContext)
}

export default function DatabaseProvider({children}) {
    const [datas, setData] = useState()
    const [loading, setLoading] = useState(true)
    const dbRef = app.database().ref('records/')

    useEffect(()=>{
        dbRef.on('value', (snapshot)=>{
            const raw = snapshot.val()
            const datas = Object.keys(raw).map(key=> {
                const tempdatas = {...raw[key], id: key}
                return tempdatas
            })            
            setData(datas)
            setLoading(false)
        })
    }, [])
    
    const value = {
        datas,
    }

    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}
