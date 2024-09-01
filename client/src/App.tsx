import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Stack, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Container, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

// Define types for Profile and Rating
type Profile = {
  id: number;
  name: string;
  imageUrl: string;
};

type RatingSubmission = {
  profileId: number;
  rating: number;
};

// Styled components
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffb400',
  },
  '& .MuiRating-iconHover': {
    color: '#ffa000',
  },
});

const StyledCard = styled(Card)(() => ({
  width: 200,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
}));

interface RatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  profileName: any;
}


const RatingDialog: React.FC<RatingDialogProps> = ({ isOpen, onClose, onSubmit, profileName }) => {
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = () => {
    if (rating !== 0) {
      onSubmit(rating);
      onClose();  // Close the dialog after submission
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>How amazing is {profileName}?</DialogTitle>
      <DialogContent>
        <Typography component="legend">Select your rating</Typography>
        <StyledRating
          name="rating"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue ?? 0);
          }}
          size="large"
          max={10}  // Set maximum rating to 10
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary" 
          disabled={rating === 0}
        >
          Submit Rating
        </Button>
      </DialogActions>
    </Dialog>
  );
};



function App() {
  const profiles: Profile[] = [
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
  ];

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = (profile: Profile) => {
    setSelectedProfile(profile);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProfile(null);
  };

  const handleRatingSubmit = (rating: number) => {
    if (selectedProfile) {
      axios.post('http://localhost:5000/rate', {
        profileId: selectedProfile.id,
        rating: rating
      } as RatingSubmission)
        .then(() => {
          handleDialogClose();
          toast.success('Rating submitted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch(error => {
          console.error('Error submitting rating:', error);
          toast.error('Failed to submit rating. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Rate Your House
      </Typography>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        {profiles.map(profile => (
          <StyledCard key={profile.id} onClick={() => handleDialogOpen(profile)}>
            <CardMedia
              component="img"
              image={profile.imageUrl}
              alt={profile.name}
              sx={{ height: 200 }} // Square aspect ratio
            />
            <CardContent>
              <Typography variant="body1">{profile.name}</Typography>
            </CardContent>
          </StyledCard>
        ))}
      </Stack>
      <RatingDialog 
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleRatingSubmit}
        profileName={selectedProfile?.name}
      />
    </Container>
  );
}

export default App;