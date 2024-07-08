const express = require('express');
const morgan = require('morgan')
const path = require('path');
const tourRouter = require('./Routes/TourRoutes')
const userRouter = require('./Routes/UserRoutes')
const app = express();

//Middlewares
app.use(morgan('dev'));

app.use(express.json())

app.use((req, res, next) => {
    console.log("Hello From the middleware");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    next();
})


//Routes Handlers


//ROutes

// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)



app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Server
module.exports = app;