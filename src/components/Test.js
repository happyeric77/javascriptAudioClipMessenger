import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';

export default function Test(){
    const toWhomFilterRef = useRef()
    const {listAllUserDatas, getUserdatas} = useDatabase()
    const [toWhomList, setToWhomList] = useState()
    const {currentUser} = useAuth()

    
    function handelToWhomChange(e){
        const usersRef = listAllUserDatas(toWhomFilterRef.current.value).limitToFirst(5)
        usersRef.on('value', (snapshot) =>{
            const users = snapshot.val();
            setToWhomList(users)
        })
    }
    

    return (
        <div>
            <input ref={toWhomFilterRef} onChange={handelToWhomChange} />
            {toWhomList && Object.keys(toWhomList).map(key=>{
                {/* console.log(toWhomList[key].group === getUserdatas(currentUser.email).group) */}
                var returnObj = null
                if (toWhomList[key].group === getUserdatas(currentUser.email).group){
                    return <div>ok</div>
                }
                return <div>{toWhomList[key].group} {getUserdatas(currentUser.email).group} </div>
            })}
        </div>
    );
}
