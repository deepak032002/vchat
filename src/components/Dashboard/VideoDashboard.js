import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Header from '../Header/Header'
import Modal from '@mui/material/Modal';
import { useNavigate, Link } from 'react-router-dom';
import shortid from 'shortid'

const VideoDashboard = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user') && !localStorage.getItem('auth_token')) {
            history('/loginsingup')
        }
    }, [history])

    return (
        <>
            <div className="dashboard w-full min-h-screen overflow-hidden">
                <Header />

                <div className="dashboard_section">

                    <p className="message">Welcome, VChater</p>
                    <div className="joinRoom">
                        <form action="" method='POST'>
                            <input type="text" />
                            <button>Join</button>
                        </form>
                    </div>
                    <span className="text-white my-2 text-poppins">Or</span>
                    <div className="createRoom">
                        <Link to={`/room/${shortid.generate()}`} >Create Room</Link>
                    </div>
                </div>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <div className="modal_body absolute top-2/4 left-2/4 bg-white">
                    <h1>Hello</h1>
                </div>

            </Modal>
        </>
    )
}

export default VideoDashboard