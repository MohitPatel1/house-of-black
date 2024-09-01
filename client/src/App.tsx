import { useState, useEffect } from 'react'
import axios from 'axios'

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

  useEffect(() => {
    // Fetch profiles from the backend
    axios.get('http://localhost:5000/profiles')
      .then(response => setProfiles(response.data))
      .catch(error => console.error('Error fetching profiles:', error))
  }, [])

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile)
  }

  const handleRatingSubmit = () => {
    if (selectedProfile) {
      axios.post('http://localhost:5000/rate', {
        profileId: selectedProfile.id,
        rating: rating
      } as Rating)
        .then(() => {
          // Reset selected profile and rating after submission
          setSelectedProfile(null)
          setRating(1)
        })
        .catch(error => console.error('Error submitting rating:', error))
    }
  }

  return (
    <div>
      <h1>Profile Rating App</h1>
      <div className="profile-list">
        {profiles.map(profile => (
          <div key={profile.id} onClick={() => handleProfileClick(profile)} className="profile-item">
            <img src={profile.imageUrl} alt={profile.name} />
            <p>{profile.name}</p>
          </div>
        ))}
      </div>
      {selectedProfile && (
        <div className="rating-popup">
          <h2>Rate {selectedProfile.name}</h2>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          <button onClick={handleRatingSubmit}>Submit Rating</button>
        </div>
      )}
    </div>
  )
}

export default App
