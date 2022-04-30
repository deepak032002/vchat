import React from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loader = (props) => {

    return (
        <div>
            <LoadingBar
                color='#f11946'
                progress={props.progress}
                onLoaderFinished={() => props.setProgress(0)}
            />
        </div>
    )
}

export default Loader