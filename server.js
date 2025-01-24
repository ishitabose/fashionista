const express = require('express');
const bodyParser = require('body-parser');
const { getFashionAdvice, run } = require('./index');
const path = require('path'); // Add this line
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Serve index.html on the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/advice', async (req, res) => {
    const question = req.body.question;

    const advice = await run(question);
    res.json({ advice });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
