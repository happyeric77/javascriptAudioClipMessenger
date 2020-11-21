import React from 'react'
import { useDatabase } from '../contexts/DatabaseContext'

export default function AudioLib() {
    const { audioDatas } = useDatabase()
    return (
        <div>
            {audioDatas && audioDatas.map(audioData=>{
                return (
                    <>
                        <div>{audioData.title}</div>
                        <div>{audioData.date}</div>
                        <div>{audioData.name}</div>
                        <audio src={audioData.url} controls />
                    </>
                )
            })} 
        </div>
    )
}
