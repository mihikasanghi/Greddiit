import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'


export default function Sub() {
    const navigate = useNavigate()
    const [subGreddiitArr, setSubGreddiitArr] = React.useState(0)
    const [joinedArr, setJoinedArr] = React.useState(0)
    const [unjoinedArr, setUnjoinedArr] = React.useState(0)
    const [reRen, setReRen] = React.useState(0)

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
    }, [])

    React.useEffect(() => {
        getSubGreddiits()
    }, [reRen])


    async function getSubGreddiits() {
        const userLocal = JSON.parse(localStorage.getItem('user'))
        const config = {
            headers: { Authorization: `Bearer ${userLocal.token}` }
        }
        try {
            let tempSG
            await axios.get('http://localhost:5000/api/subGreddiit/')
                .then(response => {
                    setSubGreddiitArr(response.data)
                    tempSG = response.data
                    setJoinedArr(tempSG.filter(el => el.followers.includes(JSON.parse(localStorage.getItem('user')).username)))
                    setUnjoinedArr(tempSG.filter(el => !el.followers.includes(JSON.parse(localStorage.getItem('user')).username)))
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function sendRequest(joinGredName) {
        await axios.post('http://localhost:5000/api/subGreddiit/request', { name: joinGredName, requestedBy: JSON.parse(localStorage.getItem('user')).username })

        setReRen(!reRen)
    }
    async function leaveSubGred(gredName) {
        //remove from subGred followers
        //add to subGred blocked
        await axios.post('http://localhost:5000/api/subGreddiit/remove', { name: gredName, remove: JSON.parse(localStorage.getItem('user')).username })
        await axios.post('http://localhost:5000/api/subGreddiit/block', { name: gredName, blockFollower: JSON.parse(localStorage.getItem('user')).username })
        getSubGreddiits()
    }

    function goToSubGred(gredName) {
        navigate(`/subGreddiitPost/${gredName}`)
    }

    if (!joinedArr || !unjoinedArr) {
        return null
    }

    return (
        <div>
            <ButtonAppBar />
            <form>
                <div>
                    <br></br>
                    <br></br>
                    <Typography variant='h2' align='center'>
                        Sub Greddiits
                    </Typography>

                    <br></br>
                    <Typography variant='h5' align='center'>
                        Followed Sub Greddiits
                    </Typography>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '2%'
                    }}>
                        {joinedArr.map(gred => (
                            <Box style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                width: '40%',
                                margin: 'auto',
                                padding: '1.5%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <Typography variant='caption' align='left'>
                                    <span style={{
                                        color: 'GrayText'
                                    }}>Created by {gred.owner}, {gred.followers.split(',').length} followers, {gred.posts.split(',').length} posts</span>
                                </Typography>
                                <Typography variant='h5' align='left'>
                                    {gred.name}
                                </Typography>
                                <Typography variant='subtitle1' align='left'>
                                    {gred.description}
                                </Typography>
                                <Typography variant="body2">
                                    <span style={{ textDecoration: 'line-through', color: 'darkgray' }}>{gred.bannedKeywords}</span>
                                </Typography>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                    marginTop: '20px'
                                }}>
                                    <Button variant="outlined" onClick={() => goToSubGred(gred.name)}>Open SubGreddiit</Button>
                                    <Button variant="outlined"
                                        color="error"
                                        disabled={(gred.owner === JSON.parse(localStorage.getItem('user')).username)}
                                        onClick={() => leaveSubGred(gred.name)}>Leave</Button>
                                </ Box>
                            </Box>
                        ))}
                    </Box>
                    <br />
                    <br />
                    <br></br>
                    <Typography variant='h5' align='center'>
                        Other Sub Greddiits
                    </Typography>
                    <br />
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '2%'
                    }}>
                        {unjoinedArr.map(gred => (
                            <Box style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                width: '40%',
                                margin: 'auto',
                                padding: '1.5%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <Typography variant='caption' align='left'>
                                    <span style={{
                                        color: 'GrayText'
                                    }}>Created by {gred.owner}, {gred.followers.split(',').length} followers, {gred.posts.split(',').length} posts</span>
                                </Typography>
                                <Typography variant='h5' align='left'>
                                    {gred.name}
                                </Typography>
                                <Typography variant='subtitle1' align='left'>
                                    {gred.description}
                                </Typography>
                                <Typography variant="body2">
                                    <span style={{ textDecoration: 'line-through', color: 'darkgray' }}>{gred.bannedKeywords}</span>
                                </Typography>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                    marginTop: '20px'
                                }}>
                                    <Button variant="outlined"
                                        onClick={() => sendRequest(gred.name)}
                                        disabled={JSON.parse(gred.requests).includes(JSON.parse(localStorage.getItem('user')).username) || gred.blocked.includes(JSON.parse(localStorage.getItem('user')).username)}>Join</Button>
                                    {/* <Button variant="outlined" color="error" >Delete</Button> */}
                                </ Box>
                            </Box>
                        ))}
                    </Box>
                    <br></br>
                    <br></br>
                </div>
            </form>

        </div>
    )
}