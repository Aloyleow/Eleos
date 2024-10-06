import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getOrganisations } from '../services/verifyServices';
import { Container, Box, TextField } from '@mui/material';

export default function OrganisationsPage() {
    const [org, setOrg] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const loadEvents = async() => {
            try{
                const data = await getOrganisations();
                setOrg(data);  
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[])

    const handleOnSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredOrg = org.filter((event) =>
        (event.orgname.toLowerCase().includes(search.toLowerCase()))
    )

  return (
      <Container
          sx={{
              height: "80vh",
              mt: 5
          }}
      >
        <Box
         sx={{display: "flex", justifyContent: "center"}}
        >
          <TextField placeholder='Search...' onChange={handleOnSearch} value={search}></TextField>
        </Box>
          <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // backgroundColor: "burlywood",
            justifyContent: "space-around",
            alignItems: "center"
        }}
          >
          {filteredOrg.map((organisation, index)=> (
          <Card sx={{ width: 300, height: 290, mt: 3, border: "1px solid", backgroundColor: "#FDF2E9" }} key = {index}>
              <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={organisation.image}
              />
              <CardContent>
                  <Typography gutterBottom sx={{fontSize: 16}} component="div">
                      {organisation.orgname}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      UEN: {organisation.uen}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Reg. date: {organisation.regdate}
                  </Typography>
              </CardContent>
          </Card>
          ))}
          </Box>
      </Container>
  );
}