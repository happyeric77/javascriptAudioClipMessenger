import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ZoomMtg } from '@zoomus/websdk'


ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av')
ZoomMtg.preLoadWasm()
ZoomMtg.prepareJssdk()

const zoomMeeting = document.getElementById("zmmtg-root")
zoomMeeting.style.display = 'none'

const ZoomContext = React.createContext()

export function useZoom(){
  return useContext(ZoomContext)
}

export default function ZoomProvider({children}){
  const value = {
    getSignature
  }

  const crypto = require('crypto') // crypto comes with Node.js
  function generateSignature(apiKey, apiSecret, meetingNumber, role) {

    // Prevent time sync issue between client signature generation and zoom 
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
    const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

    return signature
  }
  console.log(process.env.ZOOM_API_KEY)
  console.log(process.env.ZOOM_API_SECRET)
  function getSignature(userEmail, meetingId, meetingPassword) {
    zoomMeeting.style.display='inline-block'
    const userName = userEmail
    const apiKey = process.env.REACT_APP_ZOOM_API_KEY
    const apiSecret = process.env.REACT_APP_ZOOM_API_SECRET
    const meetingNumber = meetingId
    const role = 0
    const leaveUrl =  'http://localhost:3000/'
    const passWord = meetingPassword
    
    ZoomMtg.init({
      leaveUrl: leaveUrl,
      isSupportAV: true,
      success: function() {
          console.log('Start initing')
          ZoomMtg.join({
              signature: generateSignature(apiKey, apiSecret , meetingNumber , role),
              apiKey: apiKey,
              meetingNumber: meetingNumber,
              userName: userName,
              passWord: passWord,
          })
      },
      error: (res) => {
          console.log('Error point 1:', res)
      }
    })
  console.log('done')
    
  }

  return (
      <ZoomContext.Provider value={value}>
          {children}
      </ZoomContext.Provider>
  )

}



ReactDOM.render(
  <React.StrictMode>
    <>
    <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

