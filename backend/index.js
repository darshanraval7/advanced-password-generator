const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

function generatePassword(length, hasUppercase, hasNumbers, hasSymbols) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = lowercase;
    if (hasUppercase) characters += uppercase;
    if (hasNumbers) characters += numbers;
    if (hasSymbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}

app.get('/generate', (req, res) => {
    const { length, uppercase, numbers, symbols } = req.query;
    const password = generatePassword(
        parseInt(length),
        uppercase === 'true',
        numbers === 'true',
        symbols === 'true'
    );
    res.json({ password });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
