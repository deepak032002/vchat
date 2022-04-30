import React, { useContext, useState } from 'react'
import './room.css'
import { VideoContext } from '../../VideoContext'
import Header from '../Header/Header'

const Room = () => {
    const [idToCall, setIdToCall] = useState('');
    const { call, callAccepted, myVideo, userVideo, stream, name, callEnded, me, callUser, leaveCall, answerCall, } = useContext(VideoContext);
    return (
        <>
            <div className="room ">
                <Header />
                <div className="video_grid h-3/4 flex justify-center items-center gap-4">

                    {
                        stream && (
                            <div className="myVideo">
                                <p className="text-white text-poppins text-lg">{name || 'Name'}</p>
                                <video playsInline ref={myVideo} muted autoPlay></video>
                            </div>
                        )
                    }

                    {
                        callAccepted && !callEnded && (
                            <div className="userVideo">
                                <p>{call.name || 'Name'}</p>
                                <video playsInline ref={userVideo} muted autoPlay></video>
                            </div>
                        )
                    }
                </div>
                <div className="controller my-6 flex h-1/4 justify-center items-center gap-4">
                    <div className="myId">
                        <span className="infoText">Copy Your Id:&nbsp;&nbsp;</span>
                        <span>{me}</span>
                    </div>

                    <div className="callInterface">
                        <div className="input">
                            <div className="form">
                                <input type="text" placeholder="Enter Your Peer Id" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                                {
                                    callAccepted && !callEnded ? <button onClick={leaveCall}>Hang Up</button>
                                        : <button onClick={() => callUser(idToCall)}>Call</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {call.isReceivingCall && !callAccepted && (
                    <div className="flex gap-4 items-center justify-center">
                        <h1 className="text-white">{call.name} is calling:</h1>
                        <button className="bg-yellow-300 hover:bg-yellow-600 py-2 px-6" onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Room