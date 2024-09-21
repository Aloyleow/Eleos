import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import VolunteerActivismSharpIcon from '@mui/icons-material/VolunteerActivismSharp';
import { useNavigate } from "react-router-dom";

const pages = ["Login", "Signup", "Upcoming events", "Organisations"];

export default function Navbar() {
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = useState(null);
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleChange = (event, newValue) => {

        if (newValue === "Login") {
            navigate("/login")
        } else if (newValue === "Signup") {
            navigate("/signup")
        } else if (newValue === "Upcoming events") {
            navigate("/events")
        } else if (newValue === "Organisations") {
            navigate("/organisations")
        }
    }
     
    return (
        <AppBar
            position="static" 
            sx={{ 
                backgroundColor: "#FF6F61" 
                }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <VolunteerActivismSharpIcon 
                        sx={{ 
                            display: { xs: 'none', md: 'flex' }, 
                            mr: 1
                            }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LETS*HELP
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={()=> {handleChange(null, page), handleCloseNavMenu}}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <VolunteerActivismSharpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                       LETS*HELP 
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "end" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={()=> {handleChange(null, page), handleCloseNavMenu}}
                                sx={{ my: 2, color: 'white', display: 'block', mr: 4, fontSize: 15 }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
      )
    };