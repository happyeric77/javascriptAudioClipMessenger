import React from 'react'
import { useReactMediaRecorder } from "react-media-recorder";

export default function Test(){
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ Audio: true });
    
    return (
        <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <audio src={mediaBlobUrl} controls/>
        <div>{mediaBlobUrl}</div>
        </div>
    );
}
