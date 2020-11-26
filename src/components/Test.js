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
        if (toWhomFilterRef.current.value !== ''){
            usersRef.on('value', (snapshot) =>{
                const users = snapshot.val();
                setToWhomList(users)
            })
        }else{
            setToWhomList(null)
        }
    }
    

    return (
        <div>
            <input ref={toWhomFilterRef} onChange={handelToWhomChange} />
            <div className='select-leader'>
            {toWhomList && Object.keys(toWhomList).map(key=>{
                if (toWhomList[key].group === getUserdatas(currentUser.email).group){
                    return <div className='btn btn-outline-dark'> {(toWhomList[key].email)}</div>
                }
            })}
            </div>

        </div>
    );
}
