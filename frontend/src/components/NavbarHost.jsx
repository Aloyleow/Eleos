import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Tooltip, IconButton, Menu, MenuItem, Box, Typography, Container, Avatar, Button,  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VolunteerActivismSharp from '@mui/icons-material/VolunteerActivismSharp';
import { useNavigate } from 'react-router-dom';
import { hostOrgName } from '../services/verifyServices';

const pages = ["My Events", "Events", "Organisations"];
const profileSettings = ["Profile" , "Create events", "Events history", "Log out"]

export default function NavBarUser({handleSignOut}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleChange = (event, newValue) => {
    if (newValue === "Events") {
      navigate("/events")
    } else if (newValue === "Organisations") {
      navigate("/organisations")
    } else if (newValue === "My Events") {
      navigate("/host")
    }
  }

  const handleChangeProfile = (event, newValue) => {
    if (newValue === "Profile") {
      navigate("/host")
    } else if (newValue === "Create events") {
      navigate("/host/create")
    } else if (newValue === "Events history") {
      navigate("/host/history")
    } else if (newValue === "Log out") {
      handleSignOut()
    }
  }

  useEffect(()=>{
    const loadEvents = async() => {
        try{        
            const name = await hostOrgName();
            setName(name[0].orgname)
            
            
        } catch (error) {
            console.error(error.message);
        }
    }
        
    loadEvents()
},[])

  return (
    <AppBar position="static"
    sx={{ 
        backgroundColor: "#FF6F61" 
        }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <VolunteerActivismSharp sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/host"
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
                <MenuItem key={page} onClick={() => {handleChange(null, page), handleCloseNavMenu}}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <VolunteerActivismSharp sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/user"
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {handleChange(null, page), handleCloseNavMenu}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1, fontSize: 20}}>Welcome! {name}</Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {profileSettings.map((setting) => (
                <MenuItem key={setting} onClick={() => {handleChangeProfile(null, setting), handleCloseUserMenu}}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
