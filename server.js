const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

let scores = [];

app.post('/api/score', (req, res) => {
    const { playerName, score } = req.body;

    if (!playerName || !score) {
        return res.status(400).json({ message: 'Player name and score are required.' });
    }

    scores.push({ playerName, score });
    return res.status(201).json({ message: 'Score saved successfully.' });
});

app.get('/api/leaderboard', (req, res) => {
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    return res.json(sortedScores.slice(0, 10));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
