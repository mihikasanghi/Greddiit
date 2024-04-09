import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, Tabs, Tab, Modal } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

export default function Posting() {
    const navigate = useNavigate()
    const { name } = useParams()
    const [subGreddiit, setSubGreddiit] = React.useState()
    const [postArr, setPostArr] = React.useState()
    const userLocal = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = React.useState()

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

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [newPost, setNewPost] = React.useState(
        {
            text: "",
            postedBy: JSON.parse(localStorage.getItem('user')).username,
            postedIn: name,
            upVotes: "",
            downVotes: "",
        }
    )

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
        getSubGred()
        getUser()
        displayPosts()

    }, [])

    async function getSubGred() {
        await axios.get(`http://localhost:5000/api/subGreddiit/${name}`)
            .then(response => {
                setSubGreddiit(response.data)
            })
    }

    async function makePost(event) {
        event.preventDefault()
        await axios.post('http://localhost:5000/api/post/', newPost)
        handleClose()
        displayPosts()
        setNewPost(prev => {
            return {
                ...prev,
                text: ""
            }
        })
    }

    async function displayPosts() {
        await axios.post('http://localhost:5000/api/post/allPosts', { name })
            .then(response => {
                setPostArr(response.data)
            })
    }

    function handlePostTextChange(event) {
        setNewPost(prevMySubDeets => {
            return {
                ...prevMySubDeets,
                [event.target.name]: event.target.value
            }
        })
    }

    async function addFollowerToUser(username) {
        await axios.post('http://localhost:5000/api/users/followUser', { username: username, newFollower: JSON.parse(localStorage.getItem('user')).username })
        await axios.post('http://localhost:5000/api/users/followUser/following', { username: JSON.parse(localStorage.getItem('user')).username, newFollowing: username })
        getSubGred()
        getUser()
        displayPosts()
    }

    async function upvote(post) {
        await axios.post(`http://localhost:5000/api/post/upvote/${post._id}`, { username: userLocal.username })
        displayPosts()
    }

    async function downvote(post) {
        await axios.post(`http://localhost:5000/api/post/downvote/${post._id}`, { username: userLocal.username })
        displayPosts()
    }

    async function comment(post) {
        console.log("commentted")
        console.log(post._id)
    }

    async function addPostToSaved(postId) {
        await axios.post(`http://localhost:5000/api/users/save`, { username: userLocal.username, postId: postId })
        displayPosts()
    }

    if (!subGreddiit || !postArr || !user) {
        return null
    }

    return (
        <Box>
            <ButtonAppBar />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                justifyContent: 'space-between'
            }}>
                <Box sx={{
                    width: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    gap: '10px',
                    marginTop: '40px',
                    marginLeft: '30px'
                }}>
                    <Typography variant='h4' align='center'>
                        Welcome to '<span style={{
                            textShadow: '2px 8px 6px rgba(0,0,0,0.2), 0px -5px 35px rgba(255,255,255,0.3)'
                        }}>{name}</span>' subGreddiit!!
                    </Typography>
                    <Typography variant='subtitle1' align='left'>
                        <span style={{
                            color: '#272727'
                        }}>Created by {subGreddiit.owner}, {subGreddiit.followers.split(',').length} followers, {subGreddiit.posts.split(',').length} posts</span>
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <img src='https://picsum.photos/300' />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <Typography variant='h6' align='left'>
                            Description:
                        </Typography>
                        <Typography variant='body1'>
                            {subGreddiit.description}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{
                    width: '65%',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px 0px inset',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '1vh'
                }}>
                    <br />
                    <br />
                    <Typography variant='h2'>Posts</Typography>
                    <br />
                    <br />
                    <Button variant="contained" style={{ width: '25%' }} onClick={handleOpen}>Make a new Post</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style1}>

                            <form onSubmit={makePost}>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        New Post
                                    </Typography>
                                    <TextField
                                        id="filled-multiline-flexible"
                                        label="Post Content"
                                        multiline
                                        maxRows={4}
                                        variant="filled"
                                        required
                                        name="text"
                                        value={newPost.text}
                                        onChange={handlePostTextChange}
                                    />
                                    <Button variant="outlined" type="submit">Post</Button>
                                </Box>
                            </form>
                        </Box>
                    </Modal>

                    <Box style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        marginTop: '6%',
                        width: '75%'
                    }}>
                        {postArr.map(post => (
                            <Box style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                margin: 'auto',
                                padding: '2.5%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                width: '70%'
                            }}>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'space-between',
                                }}>
                                    <Box>
                                        <Typography variant='caption' style={{ fontSize: '120%' }}>
                                            {post.postedBy}
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
                                            disabled={JSON.parse(user.saved).includes(post._id)}
                                            onClick={() => addPostToSaved(post._id)}>
                                            Save
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

                </Box>
            </Box>
        </Box >
    )

}
