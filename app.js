const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(express.json())

// app.get('/',(req, res)=>{
//     res.status(200).json({message:'Hello From The server Side', app:'Natours'})
// })

// app.post('/',(req,res)=>{
//     res.send('you can post')
// })

const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours',(req,res)=>{
    // console.log(req.body);
    const newID=tours[tours.length-1].id+1;
    const newTour=Object.assign({id: newID}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
})


app.listen(PORT,()=>{
    console.log(`app runing on port${PORT}`)
})