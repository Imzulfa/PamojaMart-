const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/auth/pi', async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const response = await fetch('https://api.minepi.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userData = await response.json();
    res.json({ success: true, user: userData });

  } catch (error) {
    console.error('Error validating token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('MSALINA HUB Backend is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
