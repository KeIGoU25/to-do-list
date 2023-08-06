const express = require('express');
const app = express();
const path = require('path');

const port = 8080;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(path.join(__dirname, '../public'));
});
