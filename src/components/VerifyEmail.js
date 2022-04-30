import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const VerifyEmail = ({ showAlert }) => {
    const history = useNavigate()
    const { email } = useParams()

    useEffect(() => {
        axios.get(`/api/auth/verifyEmail/${email}`, {
            method: 'GET'
        }).then(res => {
            console.log(res);
            if (res.data.success) {
                showAlert(res.data.msg, res.data.type)
            } else {
                showAlert(res.data.msg, res.data.type)
            }
            history('/loginsingup')
        })
    }, [email, showAlert, history])


    return (
        <></>
    )
}

export default VerifyEmail