import React, { useEffect, useState } from 'react';
import './loginsignup.css';
import Header from '../Header/Header';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PasswordIcon from '@mui/icons-material/Password';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = (props) => {
    const history = useNavigate();
    const { showAlert, setProgress } = props
    const [loginData, setLoginData] = useState({ email: '', pass: '' })
    const [signupData, setSignupData] = useState({ name: '', email: '', pass: '', cpass: '' })
    const [isCheckEmailMsg, setIsCheckEmailMsg] = useState(false)


    if (localStorage.getItem('auth_token')) {
        showAlert("You already logedIn", "warning")
        history('/')
    }

    const handleLogin = (e) => {
        let name = e.target.name
        let value = e.target.value
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSignup = (e) => {
        let name = e.target.name
        let value = e.target.value

        setSignupData({ ...signupData, [name]: value })
    }

    const signUp = async (e) => {
        e.preventDefault()

        if (signupData.cpass === signupData.pass && signupData.cpass.length > 0 && signupData.pass.length > 0) {

            setProgress(20)

            const res = await axios.post("/api/auth/signup", JSON.stringify(signupData), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.data.type === "success") {
                setIsCheckEmailMsg(true)
            }

            setProgress(100)
            showAlert(res.data.msg, res.data.type)

        } else {
            showAlert('password didn\'t match! ', 'warning')
        }
    }

    const login = async (e) => {
        e.preventDefault()

        setProgress(20)
        const res = await axios.post("/api/auth/login", JSON.stringify(loginData), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (res) {
            setProgress(100)
            showAlert(res.data.msg, res.data.type)
        }

        if (res.data.auth_token) {
            localStorage.setItem('auth_token', res.data.auth_token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }

        if (res.data.signal) {
            history('/dashboard');
        }
    }

    useEffect(() => {

        const toSignIn = document.getElementById("toSignIn")
        const toSignUp = document.getElementById("toSignUp")
        const scrollpane = document.querySelector('.scrollpane')
        const login_message = document.querySelector('.login_message')
        const signup_message = document.querySelector('.signup_message')
        const login = document.querySelector('.login')
        const signup = document.querySelector('.signup')

        toSignUp.addEventListener("click", () => {
            scrollpane.classList.remove('active')
            login.classList.remove('active');
            signup.classList.remove('active');
            login_message.classList.remove('active')
            signup_message.classList.remove('active')
        })

        toSignIn.addEventListener("click", () => {
            scrollpane.classList.add('active')
            login.classList.add('active');
            signup.classList.add('active');
            login_message.classList.add('active')
            signup_message.classList.add('active')
        })
    }, [])


    const googleSignup = async (e) => {
        console.log(e);
        const { email, name, imageUrl } = e.profileObj

        const payload = { name, email, imageUrl }

        await axios.post('/api/auth/googleSignup', payload, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        localStorage.setItem('auth_token', e.tokenId)
        // showAlert(res.data.msg, res.data.type)
        // document.getElementById("toSignIn").click()

        googleLogin()
    }

    const googleLogin = async () => {
        const token = await localStorage.getItem('auth_token');

        if (!token) {
            return showAlert("Please SignUp first!", 'error')
        }

        const res = await axios.get('/api/auth/googleSingin', {
            method: 'GET',
            headers: {
                auth_token: token
            }
        })

        console.log(res.data);
        const { name, email, picture } = res.data.payload
        localStorage.setItem('user', JSON.stringify({ name, email, picture }));
        showAlert(res.data.msg, res.data.type)
        history('/dashboard');
    }

    return (
        <>
            <div className="loginsignupcontainer w-full min-h-screen">
                <Header />
                <div className="loginsignupwrapper flex items-center justify-center">

                    {
                        isCheckEmailMsg ?
                            <div div className="flex justify-center items-center">
                                <h1 className="text-poppins text-white text-xs">Check Email</h1>
                            </div> :
                            <div className="loginsignup">
                                <div className="scrollpane">
                                    <div className="login_message">
                                        <img style={{ maxWidth: '50%' }} className="my-4" src="icons/login.svg" alt="icon" />
                                        <p className="message font-bold text-poppins">Are You Exiting User?</p>
                                        <button id="toSignIn">Click Here</button>
                                    </div>
                                    <div className="signup_message">
                                        <img style={{ maxWidth: '50%' }} className="my-4" src="icons/signup.svg" alt="icon" />
                                        <p className="message font-bold text-poppins">Are You New User?</p>
                                        <button id="toSignUp">Click Here</button>
                                    </div>
                                </div>
                                {/* -----------------------------------------*-Login Form-*------------------------------------------------- */}

                                <div className="login form my-2">
                                    <h1 style={{ fontWeight: '800' }} className="text-poppins text-center text-4xl text-white">Welcome Back</h1>
                                    <div className="social my-6">
                                        <div className="social_icon">
                                            <FacebookIcon />
                                        </div>
                                        <div className="social_icon" onClick={googleLogin}>
                                            <GoogleIcon />
                                        </div>
                                        <div className="social_icon">
                                            <LinkedInIcon />
                                        </div>
                                    </div>

                                    <p className="text-center text-sm text-white text-poppins">or using email</p>

                                    <form action="" method="POST" onSubmit={login}>
                                        <div className="input_wrapper text-poppins">
                                            <MailIcon />
                                            <input type="email" onChange={handleLogin} placeholder="Email" name="email" value={loginData.email} />
                                        </div>
                                        <div className="input_wrapper text-poppins">
                                            <PasswordIcon />
                                            <input type="password" onChange={handleLogin} placeholder="Password" name="pass" value={loginData.pass} />
                                        </div>
                                        <button type="submit">Login</button>
                                    </form>
                                </div>

                                {/* -----------------------------------------*-SignUp Form-*------------------------------------------------- */}

                                <div className="signup form my-2">
                                    <h1 style={{ fontWeight: '800' }} className="text-poppins text-center text-4xl text-white">Create Account</h1>
                                    <div className="social my-6">
                                        <div className="social_icon">
                                            <FacebookIcon />
                                        </div>
                                        <GoogleLogin
                                            clientId='155854220707-fb74mbc2sug54nrfjf8jru5jatq5255d.apps.googleusercontent.com'
                                            render={
                                                (props) => {
                                                    return (
                                                        <div className="social_icon" onClick={props.onClick}>
                                                            <GoogleIcon />
                                                        </div>
                                                    )
                                                }
                                            }
                                            onSuccess={googleSignup}
                                            onFailure={''}
                                        />
                                        <div className="social_icon">
                                            <LinkedInIcon />
                                        </div>
                                    </div>

                                    <p className="text-center text-sm text-white text-poppins">or using email</p>

                                    <form action="" encType="multipart/form-data" method="post" onSubmit={signUp}>
                                        <div className="input_wrapper text-poppins">
                                            <PersonIcon />
                                            <input type="text" id="name" onChange={handleSignup} value={signupData.name} placeholder="Name" name="name" />
                                        </div>
                                        <div className="input_wrapper text-poppins">
                                            <MailIcon />
                                            <input type="email" onChange={handleSignup} value={signupData.email} placeholder="Email" name="email" />
                                        </div>

                                        <div className="input_wrapper text-poppins">
                                            <PasswordIcon />
                                            <input type="password" onChange={handleSignup} value={signupData.pass} placeholder="Password" name="pass" />
                                        </div>
                                        <div className="input_wrapper text-poppins">
                                            <PasswordIcon />
                                            <input type="password" onChange={handleSignup} value={signupData.cpass} placeholder="Confirm Paaword" name="cpass" />
                                        </div>

                                        <button type="submit">Sign Up</button>
                                    </form>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </>
    )
}

export default LoginSignup