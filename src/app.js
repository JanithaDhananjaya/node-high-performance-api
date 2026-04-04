import express from 'express';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import globalErrorHandler from './middlewares/errorMiddleware.js';
import AppError from './utils/AppError.js';
import postRoutes from "./routes/postRoutes.js";
import {serverAdapter} from "./config/bullBoard.js";

const app = express();

// 1. Global Middlewares
app.use(helmet()); // Set security HTTP headers 
app.use(express.json({limit: '10kb'})); // Body parser, reading data from body into req.body

// 2. Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.use('/admin/queues', serverAdapter.getRouter());

// 3. Handle Unhandled Routes
app.all('/*splat', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4. Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;