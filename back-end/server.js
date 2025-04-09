const app = require('./app'); // Import the app instance
const dotenv = require('dotenv');

dotenv.config();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
