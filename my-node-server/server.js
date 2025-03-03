const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // לאפשר גישה מ-React Native
app.use(express.json()); // לתמוך בבקשות JSON

// נתיב לבדיקה
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Node.js server!' });
});

// נתיב לדוגמה לקבלת מידע
app.get('/data', (req, res) => {
    res.json({ data: 'This is some sample data from the server.' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
