import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";

export default function HomePage({ handleHomePage }) {
  const navigate = useNavigate()
  const [imageIndex, setImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const images = [
    "/images/rotaryclubsg.jpg",
    "/images/Stjohnshomefortheelderly.jpg",
    "/images/theSmartLocal.jpg",
    "/images/theSmartLocal2.jpg",
    "/images/Tzuchifoundation.JPG",
    "/images/whatAreyoudoingSG.jpg",
    "/images/YmcaSingapore.jpg",
    "/images/one.jpg",
    "/images/two.jpg",
    "/images/three.jpg"
  ];

  const handleOnClick = (event) => {
    event.preventDefault()
    navigate("/signup")
  }

  useEffect(() => {
    handleHomePage();

    const interval = setInterval(() => {
      setScale(0.98);
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
       
      setTimeout(() => setScale(1), 1400); 
    }, 5000); 

    return () => clearInterval(interval);
  }, [handleHomePage, images.length]);

  return (
    <Container   
      sx={{
        mt: 20,
      }}
    >
      <Box
       sx={{
        height: "50vh",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        border: "1px solid"
       }}
      >
      <Box
        sx={{
          flex: 2,
          overflow: "hidden",
          position: "relative",
          padding: 0   
        }}
      >
        <ImageList
          sx={{ height: "100%", width: "100%", position: "absolute", padding: 0 }}
          cols={1}
        >
          <ImageListItem>
            <img
              src={images[imageIndex]}
              alt={`Image ${imageIndex}`}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                transition: "transform 1s ease-in-out", 
                transform: `scale(${scale})`, 
              }}
              
            />
          </ImageListItem>
        </ImageList>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            backgroundColor: "#FDF2E9",
            textAlign: "center",
            width: '90%', 
            maxWidth: '600px', 
          }}
        >
          <Typography variant="h4" component="h1">
            Welcome to 
          </Typography>
          <Typography variant="h4" color="#FF6F61">Lets * Help</Typography>
          <Typography variant="body1" sx={{ marginTop: 2, mb: 2 }}>
            A small project that allows you to join volunteer services like @Meetup and @Volunteer.Sg
            Stay tuned for updates and upcoming events!
          </Typography>
          <Button variant="contained" sx={{backgroundColor: "#FF6F61"}} onClick={handleOnClick}>Get Started !</Button>
        </Paper>
      </Box>
      </Box>
    </Container>
  );
}