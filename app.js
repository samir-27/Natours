const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const path = require('path');

const PORT = 3000;
const app = express();

//Middlewares
app.use(morgan('dev'));

app.use(express.json())

app.use((req,res,next)=>{
    console.log("Hello From the middleware");
    next();
})

app.use((req,res,next)=>{
    req.requestTime = new Date().toDateString();
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Routes Handlers

const getAllTours = (req, res) => {
    console.log(req.requestTime)
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id)
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const createTour = (req, res) => {
    // console.log(req.body);
    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newID }, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<UPDATED tour here...>'
        }
    })
}

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

const getALlUsers=(req,res) =>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}
const getUser=(req,res) =>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}
const createUser=(req,res) =>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}
const updateUser=(req,res) =>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}
const deleteUser=(req,res) =>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

//ROutes

// app.get('/api/v1/tours',getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id',getTour);
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app
    .route('/api/v1/users')
    .get(getALlUsers)
    .post(createUser)

app 
    .route('/api/v1/users:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

//Server

app.listen(PORT, () => {
    console.log(`app runing on port${PORT}`)
})