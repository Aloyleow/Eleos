import { Box, Container, Typography } from "@mui/material";

export default function AboutPage() {

    const handleOnClick = () => {
        window.open("https://github.com/Aloyleow", "_blank")
    } 
    
 
    return (
        <>
        <Container
            sx={{
                mt: 15,
                height: "24vh",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                //   border: "1px solid",
                // backgroundColor: "burlywood"
            }}
        >
            <Box
                sx={{
                    flex: 3,
                    paddingLeft: 2,
                }}
            >
                <Typography variant="h2">Developed and designed by</Typography>
                <Typography variant="h5" sx={{ mt: 4 }}>Aloysious Leow</Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <img
                    src="/images/aloy.jpg"
                    alt="aloy"
                    style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                        objectFit: "cover",
                    }}
                    onClick={handleOnClick}
                />
            </Box>
        </Container>
        <Container
        sx={{
            mt: 20,
            height: "24vh",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            //   border: "1px solid",
            // backgroundColor: "burlywood"
        }}
    >
        <Box
            sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-end"
            }}
        >
            <img
                src="/images/ga.jpg"
                alt="ga"
                style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    objectFit: "cover",
                }}
            />
        </Box>
        <Box
            sx={{
                flex: 3,
                paddingLeft: 2,
            }}
        >
            <Typography variant="h2">A Capstone Project presented to</Typography>
            <Typography variant="h5" sx={{ mt: 4 }}>GENERAL ASSEMBLY</Typography>
        </Box>
    </Container>
    <Container
        sx={{
            mt: 20,
            height: "24vh",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            //   border: "1px solid",
            // backgroundColor: "burlywood"
        }}
    >
        {/* <Box
            sx={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                justifyContent: "flex-end"
            }}
        >
            <img
                src="/images/ga.jpg"
                alt="ga"
                style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "100%",
                    objectFit: "cover",
                }}
            />
        </Box> */}
        <Box
            sx={{
                flex: 3,
                paddingLeft: 2,
            }}
        >
            <Typography variant="h2">Image Credits</Typography>
            <Typography variant="h6" sx={{ mt: 4, fontStyle: "italic" }} >@The Smart Local @Tzuchi foundation @what are you doing SG @YMCA Singapore</Typography>
            <Typography variant="h6" sx={{ mt: 4, fontStyle: "italic" }}>@St Johns Home for the needy</Typography>
        </Box>
    </Container>
    </>
)}