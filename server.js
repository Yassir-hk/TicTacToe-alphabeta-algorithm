const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "root" directory
app.use(express.static(path.join(__dirname, './')));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

// Console message
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});