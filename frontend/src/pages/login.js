import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography } from '@mui/material'
import axios from 'axios'

export default function MainFunc() {
    const [loginYes, setLoginYes] = React.useState(true)
    const navigate = useNavigate()

    function Login() {

        const [loginData, setLoginData] = React.useState(
            {
                username: "",
                password: ""
            }
        )

        function handleChange(event) {
            setLoginData(prevLoginData => {
                return {
                    ...prevLoginData,
                    [event.target.name]: event.target.value
                }
            })
        }

        async function handleSubmit(event) {
            event.preventDefault()

            await axios.post('http://localhost:5000/api/users/login', loginData)
                .then(response => {
                    console.log(response.data.token)
                    localStorage.setItem('user', JSON.stringify({ username: response.data.username, token: response.data.token }))
                })

            navigate('/profile')
        }

        function loginValid(loginData) {
            let yesOrNo = false
            if (loginData.username === "") {
                yesOrNo = true
            }
            else if (loginData.password === "") {
                yesOrNo = true
            }
            return yesOrNo
        }

        return (
            <>
                <form
                    onSubmit={handleSubmit}>
                    <div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Typography variant='h1' align='center'>
                            Greddiit
                        </Typography>
                        <br></br>
                        <br></br>
                        <Typography variant='h3' align='center'>
                            Login
                        </Typography>
                        <br></br>
                        <br></br>
                        <Typography variant='h6' align='center'>
                            Please enter your username and password
                        </Typography>
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>

                    <div>
                        <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                            <TextField label='Username' variant='filled' required
                                name="username"
                                value={loginData.username}
                                onChange={handleChange}>
                            </TextField>
                            <TextField label='Password' variant='filled' required
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}>
                            </TextField>
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={loginValid(loginData)}>
                                Login
                            </Button>
                            <br></br>
                            <br></br>
                            <Button
                                variant='contained'
                                onClick={() => setLoginYes(false)}>
                                Sign Up Instead!
                            </Button>
                        </Box>
                    </div>
                </form >
            </>
        );
    }


    function Registration() {
        const [regData, setRegData] = React.useState(
            {
                fname: "",
                lname: "",
                email: "",
                age: "",
                phno: "",
                username: "",
                password: "",
            }
        )

        function handleRegChange(event) {
            setRegData(prevRegData => {
                return {
                    ...prevRegData,
                    [event.target.name]: event.target.value
                }
            })
        }

        async function handleRegSubmit(event) {
            event.preventDefault()
            await axios.post('http://localhost:5000/api/users/', regData)
                .then(response => {
                    console.log(response.status)
                    localStorage.setItem('user', JSON.stringify({ username: response.data.username, token: response.data.token }))
                })
            navigate('/profile')
        }

        function regValid(prop) {
            let yesOrNo = false
            if (prop.username === "") {
                yesOrNo = true
            }
            else if (prop.password === "") {
                yesOrNo = true
            }
            else if (prop.phno === "") {
                yesOrNo = true
            }
            else if (prop.fname === "") {
                yesOrNo = true
            }
            else if (prop.lname === "") {
                yesOrNo = true
            }
            else if (prop.email === "") {
                yesOrNo = true
            }
            else if (prop.age === "") {
                yesOrNo = true
            }

            return yesOrNo
        }

        return (
            <form
                onSubmit={handleRegSubmit}>
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Typography variant='h1' align='center'>
                        Greddiit
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant='h3' align='center'>
                        Register
                    </Typography>
                    <br></br>
                    <br></br>
                    <Typography variant='h6' align='center'>
                        Please enter your details
                    </Typography>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>

                <div>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                            <TextField
                                label='First Name'
                                variant='filled'
                                required
                                name="fname"
                                value={regData.fname}
                                onChange={handleRegChange}>
                            </TextField>

                            <TextField
                                label='Last Name'
                                variant='filled'
                                required
                                name="lname"
                                value={regData.lname}
                                onChange={handleRegChange}>
                            </TextField>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                            <TextField
                                label='Age'
                                variant='filled'
                                required
                                name="age"
                                value={regData.age}
                                onChange={handleRegChange}>
                            </TextField>
                            <TextField
                                label='Phone Number'
                                variant='filled'
                                required
                                name="phno"
                                value={regData.phno}
                                onChange={handleRegChange}>
                            </TextField>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                            <TextField
                                label='Email'
                                variant='filled'
                                required
                                name="email"
                                type="email"
                                value={regData.email}
                                onChange={handleRegChange}>
                            </TextField>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                            <TextField
                                label='Username'
                                variant='filled'
                                required
                                name="username"
                                value={regData.username}
                                onChange={handleRegChange}>
                            </TextField>
                            <TextField
                                label='Password'
                                variant='filled'
                                required
                                type="password"
                                name="password"
                                value={regData.password}
                                onChange={handleRegChange}>
                            </TextField>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={regValid(regData)}>
                                Register
                            </Button>
                            <br></br>
                            <br></br>
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setLoginYes(true)
                                }}>
                                Back To Login
                            </Button>
                        </div>
                    </Box>
                </div>
            </form>
        )
    }


    return (
        <div>
            {loginYes ? Login() : Registration()}
        </div>
    )
}