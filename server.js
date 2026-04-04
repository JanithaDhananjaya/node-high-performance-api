import 'dotenv/config';
import app from './src/app.js';
import './src/workers/emailWorker.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});