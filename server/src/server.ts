import dotenv from 'dotenv';
import express from 'express';
//import path from 'path';
//import { dirname } from 'node:path';
//import { fileURLToPath } from 'node:url';
dotenv.config();

    
//const __dirname = dirname(fileURLToPath(import.meta.url));

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3002;

// TODO: Serve static files of entire client dist folder
//app.use(express.static(path.join(__dirname, 'public')));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
