import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className="grid grid-cols-12 h-12">

                <div className="logo_wrapper col-span-2 grid justify-center ">
                    <Link to="/" className="flex items-center text-bangers text-2xl text-white">
                        <span className="text-red-500 mx-1">V</span>Chat
                    </Link>
                </div>

                <div className="menu col-span-10 grid items-center justify-end mx-3 text-poppins">
                    <ul className="w-100 h-100 flex items-center justify-center gap-8">
                        <li className="text-gray-300 hover:text-white font-semibold"><Link to="/about">About Us</Link></li>
                        <li className="text-gray-300 hover:text-white">

                            {
                                localStorage.getItem('user') && localStorage.getItem('auth_token') ?
                                    <Link to="/pofile" className="flex gap-2 items-center justify-center">
                                        <img className="rounded-full h-8 w-8" src={JSON.parse(localStorage.getItem('user')).picture} alt="profile" />
                                        <span>{JSON.parse(localStorage.getItem('user')).name}</span>
                                    </Link> :
                                    null
                            }

                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header