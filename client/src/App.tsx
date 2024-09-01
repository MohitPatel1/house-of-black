import { useState } from 'react'
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
  const profiles = [
    {
      "id": 1,
      "name": "ajay",
      "imageUrl": "/profiles/ajay.jpeg"
    },
    {
      "id": 2,
      "name": "bhavya",
      "imageUrl": "/profiles/bhavya.jpeg"
    },
    {
      "id": 3,
      "name": "dev",
      "imageUrl": "/profiles/dev.jpeg"
    },
    {
      "id": 4,
      "name": "dhanashree",
      "imageUrl": "/profiles/dhanashree.jpeg"
    },
    {
      "id": 5,
      "name": "dharmik",
      "imageUrl": "/profiles/dharmik.jpeg"
    },
    {
      "id": 6,
      "name": "fenil",
      "imageUrl": "/profiles/fenil.jpeg"
    },
    {
      "id": 7,
      "name": "henil",
      "imageUrl": "/profiles/henil.jpeg"
    },
    {
      "id": 8,
      "name": "jainil",
      "imageUrl": "/profiles/jainil.jpeg"
    },
    {
      "id": 9,
      "name": "jinesh",
      "imageUrl": "/profiles/jinesh.jpeg"
    },
    {
      "id": 10,
      "name": "karan",
      "imageUrl": "/profiles/karan.jpeg"
    },
    {
      "id": 11,
      "name": "keyur",
      "imageUrl": "/profiles/keyur.jpeg"
    },
    {
      "id": 12,
      "name": "krishna",
      "imageUrl": "/profiles/krishna.jpeg"
    },
    {
      "id": 13,
      "name": "krupal",
      "imageUrl": "/profiles/krupal.jpeg"
    },
    {
      "id": 14,
      "name": "mihir",
      "imageUrl": "/profiles/mihir.jpeg"
    },
    {
      "id": 15,
      "name": "mohit",
      "imageUrl": "/profiles/mohit.jpeg"
    },
    {
      "id": 16,
      "name": "namit",
      "imageUrl": "/profiles/namit.jpeg"
    },
    {
      "id": 17,
      "name": "sahil",
      "imageUrl": "/profiles/sahil.jpeg"
    },
    {
      "id": 18,
      "name": "vikas",
      "imageUrl": "/profiles/vikas.jpeg"
    },
    {
      "id": 19,
      "name": "vruxak",
      "imageUrl": "/profiles/vruxak.jpeg"
    },
    {
      "id": 20,
      "name": "yagnesh",
      "imageUrl": "/profiles/yagnesh.jpeg"
    },
    {
      "id": 21,
      "name": "yash",
      "imageUrl": "/profiles/yash.jpeg"
    }
  ]

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
  const [rating, setRating] = useState<number>(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
              image={profile.imageUrl}
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
        <DialogTitle>Rate {selectedProfile?.name} From 1 to 10 </DialogTitle>
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
