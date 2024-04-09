import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';


export default function SavedPosts() {
    const navigate = useNavigate()
    const [postArr, setPostArr] = React.useState()
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = React.useState()

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
        getUser()
    }, [])

    async function getUser() {
        let res

        const config = {
            headers: { Authorization: `Bearer ${userLocal.token}` }
        }
        try {
            await axios.get('http://localhost:5000/api/users/me', config)
                .then(response => {
                    res = response.data
                    setUser(response.data)
                })
        } catch (error) {
            console.log(error)
        }

        const savedPostsId = JSON.parse(res.saved)
        await axios.post('http://localhost:5000/api/post/post', { savedPostsId })
            .then(response => {
                console.log("response:", response)
                setPostArr(response.data)
            })
    }


    async function addFollowerToUser(username) {
        await axios.post('http://localhost:5000/api/users/followUser', { username: username, newFollower: JSON.parse(localStorage.getItem('user')).username })
        await axios.post('http://localhost:5000/api/users/followUser/following', { username: JSON.parse(localStorage.getItem('user')).username, newFollowing: username })
        getUser()
    }

    async function upvote(post) {
        await axios.post(`http://localhost:5000/api/post/upvote/${post._id}`, { username: userLocal.username })
        getUser()
    }

    async function downvote(post) {
        await axios.post(`http://localhost:5000/api/post/downvote/${post._id}`, { username: userLocal.username })
        getUser()
    }

    async function comment(post) {
        console.log("commentted")
        console.log(post._id)
    }

    async function removePostFromSaved(postId) {
        await axios.post(`http://localhost:5000/api/users/unsave`, { username: userLocal.username, postId: postId })
        getUser()
    }

    if (!user || !postArr) {
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
                        Saved Posts
                    </Typography>

                    <br></br>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        margin: 'auto',
                        width: '75%',
                    }}>
                        {postArr.map(post => (
                            <Box style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                margin: 'auto',
                                padding: '2.5%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '70%',
                            }}>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box>
                                        <Typography variant='caption' style={{ fontSize: '120%' }}>
                                            {post.postedBy} posted in {post.postedIn}
                                        </Typography>
                                    </Box>
                                    <Box style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Button
                                            variant="outlined"
                                            disabled={(post.postedBy === JSON.parse(localStorage.getItem('user')).username) || JSON.parse(user.following).includes(post.postedBy)}
                                            onClick={() => addFollowerToUser(post.postedBy)}>
                                            Follow
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            disabled={!JSON.parse(user.saved).includes(post._id)}
                                            onClick={() => removePostFromSaved(post._id)}>
                                            Unsave
                                        </Button>

                                    </Box>
                                </Box>

                                <Box style={{
                                    boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
                                    padding: '5%'
                                }}>
                                    <Typography variant='body1' style={{ fontSize: '120%' }}>
                                        {post.text}
                                    </Typography>
                                </Box>
                                <Box style={{
                                    margin: 'auto',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                }}>
                                    <Button onClick={() => upvote(post)}>
                                        {!JSON.parse(post.upvotes).includes(userLocal.username) ?
                                            <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon />
                                        }
                                        {JSON.parse(post.upvotes).length}
                                    </Button>
                                    <Button onClick={() => downvote(post)}>
                                        {!JSON.parse(post.downvotes).includes(userLocal.username) ?
                                            <HeartBrokenOutlinedIcon /> : <HeartBrokenIcon />
                                        }
                                        {JSON.parse(post.downvotes).length}
                                    </Button>
                                    <Button onClick={() => comment(post)}>
                                        <MessageOutlinedIcon />
                                    </Button>
                                </Box>

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