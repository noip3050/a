const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// قراءة الأسئلة من ملف JSON
app.get('/questions', (req, res) => {
    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('فشل في قراءة ملف الأسئلة');
        }
        res.send(JSON.parse(data));
    });
});

// بدء السيرفر
app.listen(PORT, () => {
    console.log(`السيرفر يعمل على http://localhost:${PORT}`);
});
