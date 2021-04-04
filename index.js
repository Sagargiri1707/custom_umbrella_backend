const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formidable = require('formidable');
const Photo=require('./modelSchema')
const fs=require('fs')
mongoose
    .connect("mongodb://localhost/project", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true
    })
    .then(() => console.log('DB Connected'));


const app=express()
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(cors())
app.post('/post/image',(req,res)=>{
    console.log('here');
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        console.log(fields,files)
        if(!files.file.path)
           return res.json({error:"No image uploaded"})
        let photo=new Photo()
        photo.data=fs.readFileSync(files.file.path)
        photo.contentType=files.file.type
        photo.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.json({
                    error: errorHandler(err)
                });
            }
            console.log(result)
            res.json(result);
        });
    
    })
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
