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
      name: 'Alice',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
    },
    {
      id: 2,
      name: 'Bob',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
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
