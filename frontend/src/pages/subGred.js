import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Tabs, Tab } from '@mui/material'
import axios from 'axios'
import ButtonAppBar from './navbar'

export default function SubGred() {
    const { name } = useParams()
    const navigate = useNavigate()
    const [subGreddiit, setSubGreddiit] = React.useState()
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    React.useEffect(() => {
        document.addEventListener("keydown", detectKeyDown, true)

        function detectKeyDown(e) {

            console.log(e.key)
            if (e.key === "J" || e.key === "j") {
                setValue('2')
            } else if (e.key === "U" || e.key === "u") {
                setValue('1')
            } else if (e.key === "S" || e.key === "s") {
                setValue('3')
            } else if (e.key === "R" || e.key === "r") {
                setValue('4')
            }
        }
    }, [])

    React.useEffect(() => {
        if (!localStorage.getItem('user')) navigate('/login')
        getSubGred()
    }, [])

    async function getSubGred() {
        await axios.get(`http://localhost:5000/api/subGreddiit/${name}`)
            .then(response => {
                setSubGreddiit(response.data)
            })
    }

    // function TabPanel(props) {
    //     const { children, value, index, ...other } = props;

    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && (
    //                 <Box sx={{ p: 3 }}>
    //                     <Typography>{children}</Typography>
    //                 </Box>
    //             )}
    //         </div>
    //     );
    // }

    // TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.number.isRequired,
    //     value: PropTypes.number.isRequired,
    // };

    // function a11yProps(index) {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`,
    //     };
    // }

    async function acceptRequest(username) {
        console.log(subGreddiit.name)
        await axios.post('http://localhost:5000/api/subGreddiit/addFollower/subGreddiit', { name: subGreddiit.name, newFollower: username })
        await axios.post('http://localhost:5000/api/subGreddiit/reject', { name: subGreddiit.name, remove: username })
        getSubGred()
    }

    async function rejectRequest(username) {
        console.log("WORK PLS")
        await axios.post('http://localhost:5000/api/subGreddiit/reject', { name: subGreddiit.name, remove: username })
        getSubGred()
    }

    if (!subGreddiit) {
        return null
    }

    return (
        <Box>
            <ButtonAppBar />
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tablist onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Users" value="1" />
                            <Tab label="Join Requests" value="2" />
                            <Tab label="Stats" value="3" />
                            <Tab label="Reported Posts" value="4" />
                        </Tablist>
                    </Box>
                    <TabPanel value='1'>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                            justifyContent: 'space-around'
                        }}>
                            <Box>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}>
                                    <Typography variant='h3'>
                                        Accepted Users
                                    </Typography>
                                    {JSON.parse(subGreddiit.followers).map(person => (
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
                                            {/* <Box style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }}>
                                        <Button variant="text" onClick={() => removeFromFollowing(person)}>Unfollow</Button>
                                    </Box> */}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Box style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                }}>
                                    <Typography variant='h3'>
                                        Blocked Users
                                    </Typography>
                                    {JSON.parse(subGreddiit.blocked).map(person => (
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
                                            {/* <Box style={{
                                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                    }}>
                                        <Button variant="text" onClick={() => removeFromFollowing(person)}>Unfollow</Button>
                                    </Box> */}
                                        </Box>
                                    ))}
                                </Box>

                            </Box>
                        </Box>

                    </TabPanel>
                    <TabPanel value='2'>
                        <Box>
                            <Box style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '30px',
                            }}>
                                <Typography variant='h3' style={{ margin: 'auto', marginTop: '40px' }}>
                                    Pending Requests
                                </Typography>
                                {JSON.parse(subGreddiit.requests).map(person => (
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
                                        <Box>
                                            <Button variant="outlined" onClick={() => acceptRequest(person)}>Accept</Button>
                                        </Box>
                                        <Box>
                                            <Button variant="outlined" color="error" onClick={() => rejectRequest(person)}>Reject</Button>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                    </TabPanel>
                    <TabPanel value='3'>

                    </TabPanel>
                    <TabPanel value='4'>

                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )

}