import React from 'react'
import Alertbox from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alert = (props) => {
    return (
        <>
            <div className={`alertContainer ${props.alert.show ? 'alertShow ms-1' : ''} `}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alertbox severity={`${props.alert.type}`}>{props.alert.msg}</Alertbox>
                </Stack>
            </div>
        </>
    )
}

export default Alert