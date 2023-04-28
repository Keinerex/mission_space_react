import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Boy} from "@mui/icons-material";

function Header(props) {

    const navigation = useNavigate()

    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        axios.get("/api/is_admin")
            .then(response => {
                setIsAdmin(response.data.status)
            })
            .catch(() => {setIsAdmin(null)})
    })

    return (
        <Box sx={{ flexGrow: 1, fontFamily: "Ubuntu", height: "10%" }}>
            <AppBar position="static">
                <Toolbar >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: "inherit", fontSize: 30, cursor: "pointer" }} onClick={(event) => {
                        navigation("/")
                    }}>
                        SpaceZ
                    </Typography>
                    {isAdmin ? <Button sx={{fontFamily: "inherit"}} color="inherit" onClick={(event) => {
                        navigation("/new_task" +
                            "")
                    }}>
                        Создать задание
                    </Button> : ""}
                    <Button sx={{fontFamily: "inherit"}} color="inherit" onClick={(event) => {
                        navigation("/login")
                    }}>Log In</Button>
                    <Button sx={{fontFamily: "inherit"}} color="inherit" onClick={(event) => {
                        navigation("/register")
                    }}>Sign up</Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

