import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Tabs, Tab } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'


export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = React.useState()
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const [formDeets, setFormDeets] = React.useState()
    const [buttonValue, SetButtonValue] = React.useState(0)
    const [butDis, setButDis] = React.useState()

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
    }, [])

    React.useEffect(() => {
        getUser()
        fillFormDeets()
    }, [])

    async function saveChanges(event) {
        event.preventDefault()
        await axios.put(`http://localhost:5000/api/users/updateUser`, formDeets)
        setUser(formDeets)
    }
    function edit() {
        SetButtonValue(0)
    }

    function followers() {
        SetButtonValue(1)
    }

    function following() {
        SetButtonValue(2)
    }
    async function getUser() {

        const config = {
            headers: { Authorization: `Bearer ${userLocal.token}` }
        }

        try {
            await axios.get('http://localhost:5000/api/users/me', config)
                .then(response => {
                    setUser(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function fillFormDeets() {

        const config = {
            headers: { Authorization: `Bearer ${userLocal.token}` }
        }

        try {
            await axios.get('http://localhost:5000/api/users/me', config)
                .then(response => {
                    setFormDeets(response.data)
                    setButDis(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    function handleUpdate(event) {
        setFormDeets(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    async function removeFromFollowers(username) {
        await axios.post('http://localhost:5000/api/users/unFollowUser/following', { username: username, delFollowing: JSON.parse(localStorage.getItem('user')).username })
        await axios.post('http://localhost:5000/api/users/unFollowUser', { username: JSON.parse(localStorage.getItem('user')).username, delFollower: username })
        getUser()
    }

    async function removeFromFollowing(username) {
        await axios.post('http://localhost:5000/api/users/unFollowUser', { username: username, delFollower: JSON.parse(localStorage.getItem('user')).username })
        await axios.post('http://localhost:5000/api/users/unFollowUser/following', { username: JSON.parse(localStorage.getItem('user')).username, delFollowing: username })
        getUser()
    }

    if (!user || !formDeets) return null

    return (
        <Box>
            <ButtonAppBar />
            <Box sx={{ '& button': { m: 1 } }}>
                <Box>
                    <Button variant="outlined" size="medium" onClick={edit}>
                        Edit Profile
                    </Button>
                    <Button variant="outlined" size="medium" onClick={followers}>
                        Followers
                    </Button>
                    <Button variant="outlined" size="medium" onClick={following}>
                        Following
                    </Button>
                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                {buttonValue === 0 &&

                    <form onSubmit={saveChanges}>
                        <Box>
                            <br></br>
                            <br></br>
                            <Typography variant='h2' align='center'>
                                Profile Page
                            </Typography>

                            <br></br>
                            <Typography variant='h5' align='center'>
                                Edit your details
                            </Typography>
                            <br></br>
                            <br></br>
                        </Box>

                        <Box>
                            <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                                <Box style={{ display: 'flex', flexDirection: 'row', gap: '25px', alignItems: 'center' }}>
                                    <TextField
                                        label='First Name'
                                        variant='filled'
                                        required
                                        name="fname"
                                        value={formDeets.fname}
                                        onChange={handleUpdate}>
                                    </TextField>

                                    <TextField
                                        label='Last Name'
                                        variant='filled'
                                        required
                                        name="lname"
                                        value={formDeets.lname}
                                        onChange={handleUpdate}>
                                    </TextField>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: 'row', gap: '25px', alignItems: 'center' }}>
                                    <TextField
                                        label='Age'
                                        variant='filled'
                                        required
                                        name="age"
                                        value={formDeets.age}
                                        onChange={handleUpdate}>
                                    </TextField>
                                    <TextField
                                        label='Phone Number'
                                        variant='filled'
                                        required
                                        name="phno"
                                        value={formDeets.phno}
                                        onChange={handleUpdate}>
                                    </TextField>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                                    <TextField
                                        label='Email'
                                        variant='filled'
                                        required
                                        name="email"
                                        type="email"
                                        value={formDeets.email}
                                        onChange={handleUpdate}>
                                    </TextField>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        disabled={butDis.fname === formDeets.fname && butDis.lname === formDeets.lname && butDis.age === formDeets.age && butDis.phno === formDeets.phno && butDis.email === formDeets.email}>
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </form>
                }

                {buttonValue === 1 &&

                    <Box>
                        <br></br>
                        <br></br>
                        <Typography variant='h2' align='center'>
                            Profile Page
                        </Typography>

                        <br></br>
                        <Typography variant='h5' align='center'>
                            Followers
                        </Typography>
                        <br></br>
                        <br></br>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            {JSON.parse(user.followers).map(person => (
                                <Box style={{
                                    margin: 'auto',
                                    width: '15%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}>
                                    <Typography variant='h6' align='center'>
                                        {person}
                                    </Typography>

                                    <Box style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }}>
                                        <Button variant="text" onClick={() => removeFromFollowers(person)}>Remove</Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                }

                {buttonValue === 2 &&

                    <Box>
                        <br></br>
                        <br></br>
                        <Typography variant='h2' align='center'>
                            Profile Page
                        </Typography>

                        <br></br>
                        <Typography variant='h5' align='center'>
                            Following
                        </Typography>
                        <br></br>
                        <br></br>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            {JSON.parse(user.following).map(person => (
                                <Box style={{
                                    margin: 'auto',
                                    width: '15%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}>
                                    <Typography variant='h6' align='center'>
                                        {person}
                                    </Typography>
                                    <Box style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }}>
                                        <Button variant="text" onClick={() => removeFromFollowing(person)}>Unfollow</Button>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                }



            </Box >
        </Box>
    )
}