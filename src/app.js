import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN || '*'
}));
app.use(express.json({limit:'20kb'}));
app.use(express.urlencoded());
app.use(express.static('public'));

// import Routes
import userRouter from '../routes/user.route.js';
import ticketRouter from '../routes/ticket.route.js';
// routes
app.use('/api/v1/user',userRouter);
app.use('/api/v1/ticket',ticketRouter);


export { app }