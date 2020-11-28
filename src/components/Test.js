// import React from 'react'
// import { ZoomMtg } from '@zoomus/websdk'
// ZoomMtg.setZoomJSLib('https://source.zoom.us/1.8.1/lib', '/av')
// ZoomMtg.preLoadWasm()
// ZoomMtg.prepareJssdk()

// export default function Test(){
// // ZoomMtg.setZoomJSLib('/Users/macbookpro4eric/Documents/dev/Projects/js/react-firebase-audio/node_modules/@zoomus/websdk/dist/lib', '/av')
    


//     const zoomMeeting = document.getElementById("zmmtg-root")
//     // zoomMeeting.hidden=true
//     zoomMeeting.className='w-50 h-50'

//     const crypto = require('crypto') // crypto comes with Node.js

//     function generateSignature(apiKey, apiSecret, meetingNumber, role) {

//         // Prevent time sync issue between client signature generation and zoom 
//         const timestamp = new Date().getTime() - 30000
//         const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
//         const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
//         const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

//         return signature
//     }

//     function getSignature() {
//         const userName = 'Test'
//         const apiKey = 'KThrD0gjQZ2xm2D2WNK5ig'
//         const apiSecret = 'zPs8lc3Am1ZibKrTMgcIULAVJ6eP9X6TrYIS'
//         const meetingNumber = 72378979559
//         const role = 0
//         const leaveUrl =  'https://ericlee.cf/'
//         const passWord = '44TiKm'

//         setTimeout(()=>{
//             ZoomMtg.init({
//                 leaveUrl: leaveUrl,
//                 isSupportAV: true,
//                 success: function() {
//                     console.log('Start initing')
//                     ZoomMtg.join({
//                         signature: generateSignature(apiKey, apiSecret , meetingNumber , role),
//                         apiKey: apiKey,
//                         meetingNumber: meetingNumber,
//                         userName: userName,
//                         passWord: passWord,
//                     })
//                 },
//                 error: (res) => {
//                     console.log('Error point 1:', res)
//                 }
//             })
//         console.log('done')
//         },3000)
//     }




    
    
    
//     return (
//         <div>
//             <div className='btn btn-danger w-100' onClick={()=>{getSignature()}}>button</div>
//             <div id="zmmtg-root" className='w-50 h-50'></div>
            
//         </div>
//     );
// }
