import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Tabs, Tab } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'

export default function MySub() {

    const [value, setValue] = React.useState(0);
    const navigate = useNavigate()

    const [subGreddiitArr, setSubGreddiitArr] = React.useState(0)

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
    }, [])

    React.useEffect(() => {
        getSubGreddiits()
    }, [value])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function MyForm() {

        const [mySubDeets, setMySubDeets] = React.useState(
            {
                name: "",
                description: "",
                bannedKeywords: "",
                tags: "",
                owner: "",
                followers: "",
                blocked: "",
                posts: "",
                requests: "",
            }
        )

        function handleMySubChange(event) {
            setMySubDeets(prevMySubDeets => {
                return {
                    ...prevMySubDeets,
                    [event.target.name]: event.target.value
                }
            })
        }
        async function handleSubmit(event) {
            event.preventDefault()
            setMySubDeets(prevMySubDeets => {
                return {
                    ...prevMySubDeets,
                    blockedKeywords: mySubDeets.bannedKeywords.split(","),
                    tags: mySubDeets.tags.split(","),
                    owner: JSON.parse(localStorage.getItem('user')).username,
                    followers: (JSON.parse(localStorage.getItem('user')).username).split(","),
                    blocked: mySubDeets.blocked.split(","),
                    posts: mySubDeets.posts.split(","),
                    requests: mySubDeets.requests.split(",")
                }
            })

            await axios.post('http://localhost:5000/api/subGreddiit/', {
                ...mySubDeets,
                bannedKeywords: mySubDeets.bannedKeywords,
                tags: mySubDeets.tags,
                owner: JSON.parse(localStorage.getItem('user')).username,
            })

            setMySubDeets(prevMySubDeets => {
                return {
                    ...prevMySubDeets,
                    name: "",
                    description: "",
                    bannedKeywords: "",
                    tags: "",
                    owner: "",
                    followers: "",
                    blocked: "",
                    posts: "",
                    requests: "",
                }
            })
            setValue(0)
        }

        return (
            <form
                onSubmit={handleSubmit}>
                <Box>
                    <br />
                    <br />
                    <Typography variant='h3' align='center'>
                        New Sub Greddiit
                    </Typography>
                    <br />
                    <br />
                    <Typography variant='h6' align='center'>
                        Please enter the details of the Sub Greddiit
                    </Typography>
                    <br />
                    <br />
                </Box>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                    <TextField
                        label='Name'
                        variant='filled'
                        required
                        name="name"
                        value={mySubDeets.name}
                        onChange={handleMySubChange}
                        style={{ width: "30%" }}>
                    </TextField>
                    <TextField
                        label="Description"
                        multiline
                        maxRows={4}
                        variant="filled"
                        name="description"
                        value={mySubDeets.description}
                        onChange={handleMySubChange}
                        required
                        style={{ width: "30%" }}>
                    </TextField>
                    <TextField
                        label="Banned Keywords (comma spearated)"
                        multiline
                        maxRows={4}
                        variant="filled"
                        name="bannedKeywords"
                        value={mySubDeets.bannedKeywords}
                        onChange={handleMySubChange}
                        style={{ width: "30%" }}>
                    </TextField>
                    <TextField
                        label="Tags (comma spearated)"
                        multiline
                        maxRows={4}
                        variant="filled"
                        name="tags"
                        value={mySubDeets.tags}
                        onChange={handleMySubChange}
                        style={{ width: "30%" }}>
                    </TextField>
                    <Button
                        variant='contained'
                        type='submit'>
                        Create
                    </Button>
                </Box>
            </form>
        )
    }

    async function getSubGreddiits() {

        try {
            await axios.post('http://localhost:5000/api/subGreddiit/mySubGreddiits', { owner: JSON.parse(localStorage.getItem('user')).username })
                .then(response => {
                    setSubGreddiitArr(response.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteSubGred(gredName) {

        setSubGreddiitArr(subGreddiitArr.filter(el => el.name !== gredName))

        try {
            await axios.delete(`http://localhost:5000/api/subGreddiit/${gredName}`)
        } catch (error) {
            console.log(error)
        }

        try {
            await axios.delete(`http://localhost:5000/api/post/${gredName}`)
        } catch (error) {
            console.log(error)
        }
    }

    function goToSubGred(gredName) {
        navigate(`/subGreddiit/${gredName}`)
    }
    if (!subGreddiitArr) return null

    return (
        <Box>
            <ButtonAppBar />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="My Sub Greddiits" {...a11yProps(0)} />
                        <Tab label="Create New Sub Greddiit" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div>
                        <br></br>
                        <br></br>
                        <Typography variant='h2' align='center'>
                            My Sub Greddiits
                        </Typography>

                        <br></br>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>

                            {subGreddiitArr.map(gred => (
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
                                        <Button variant="outlined" color="error" onClick={() => deleteSubGred(gred.name)}>Delete</Button>
                                    </ Box>
                                </Box>
                            ))}
                        </Box>
                        <br></br>
                        <br></br>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyForm />
                </TabPanel>
            </Box>
        </ Box>
    )
}