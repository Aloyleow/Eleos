import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getOrganisations } from '../services/verifyServices';
import { Container, Box } from '@mui/material';

export default function OrganisationsPage() {
    const [org, setOrg] = useState([])

    useEffect(() => {
        const loadEvents = async() => {
            try{
                const data = await getOrganisations();
                setOrg(data.event);  
            } catch (error) {
                console.error(error.message);
            }
        }
        loadEvents()
    },[])
    console.log(org)


  return (
      <Container
          sx={{
              height: "80vh",
              display: "flex",
              flexWrap: "wrap",
              // backgroundColor: "burlywood",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 5
          }}
      >
          {org.map((organisation, index)=> (
          <Card sx={{ maxWidth: 300, maxHeight: 290 }} key = {index}>
              <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={organisation.image}
              />
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
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
      </Container>
  );
}