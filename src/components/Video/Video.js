import React, { useEffect, useRef } from 'react'

const Video = (props) => {

    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = props.stream
        } else {
            videoRef.current.srcObject = null
        }
    }, [props.stream])

    return (
        <>
            <video autoPlay muted ref={videoRef}></video>
        </>
    )
}

export default Video