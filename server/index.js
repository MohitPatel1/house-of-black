const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock data for profiles
const profiles = [
    {
      id: 1,
      name: 'ajay',
      imageUrl: '/ajay.jpeg'
    },
    {
      id: 2,
      name: 'bhavya',
      imageUrl: '/bhavya.jpeg'
    },
    {
      id: 3,
      name: 'Charlie',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
    }
  ]

// API route for profiles
app.get('/profiles', (req, res) => {
  res.json(profiles);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
