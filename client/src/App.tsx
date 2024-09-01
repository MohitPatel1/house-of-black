import { useState, useEffect } from 'react'
import axios from 'axios'
import { Stack, Card, CardContent, CardMedia, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material'

// Define types for Profile and Rating
type Profile = {
  id: number;
  name: string;
  imageUrl: string;
};

type Rating = {
  profileId: number;
  rating: number;
};

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [rating, setRating] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch profiles from the backend
    axios.get('http://localhost:5000/profiles')
      .then(response => setProfiles(response.data))
      .catch(error => console.error('Error fetching profiles:', error))
  }, [])

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile)
  }

  const handleDialogOpen = (profile: Profile) => {
    setSelectedProfile(profile)
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedProfile(null)
    setRating(1)
  }

  const handleRatingSubmit = () => {
    if (selectedProfile) {
      axios.post('http://localhost:5000/rate', {
        profileId: selectedProfile.id,
        rating: rating
      } as Rating)
        .then(() => {
          handleDialogClose()
        })
        .catch(error => console.error('Error submitting rating:', error))
    }
  }

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Profile Rating App
      </Typography>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {profiles.map(profile => (
          <Card key={profile.id} onClick={() => handleDialogOpen(profile)} sx={{ width: 200 }}>
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${profile.imageUrl}`}
              alt={profile.name}
              sx={{ height: 200 }} // Square aspect ratio
            />
            <CardContent>
              <Typography variant="body1">{profile.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Rate {selectedProfile?.name}</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Rating"
            inputProps={{ min: 1, max: 10 }}
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleRatingSubmit} variant="contained" color="primary">
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default App
