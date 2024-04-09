import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material/';
import { useNavigate } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import NaturePeopleOutlinedIcon from '@mui/icons-material/NaturePeopleOutlined';
// import MenuIcon from '@mui/icons-material/Menu'; 

export default function ButtonAppBar() {

    const navigate = useNavigate()

    function goToProfile(event) {
        navigate('/profile')
    }

    function goToMySub(event) {
        navigate('/mySub')
    }

    function goToSub(event) {
        navigate('/sub')
    }

    function goToSaved(event) {
        navigate('/savedPosts')
    }

    function logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('username')
        return navigate('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Greddiit
                    </Typography>
                    <Box style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            onClick={goToProfile}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <AccountCircleOutlinedIcon />
                            Profile Page
                        </Button>
                        <Button
                            color="inherit"
                            onClick={goToMySub}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <AppRegistrationOutlinedIcon />
                            My Sub Greddiits
                        </Button>
                        <Button
                            color="inherit"
                            onClick={goToSub}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <AppsOutlinedIcon />
                            Sub Greddiits
                        </Button>
                        <Button
                            color="inherit"
                            onClick={goToSaved}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <CheckCircleOutlinedIcon />
                            Saved Posts
                        </Button>
                        <Button
                            color="inherit"
                            onClick={logout}
                            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <NaturePeopleOutlinedIcon />
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}