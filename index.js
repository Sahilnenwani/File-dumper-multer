const express=require('express');
const ejs=require('ejs');
const multer=require('multer');
const path=require('path');
const res = require('express/lib/response');
const app=express();
const port=5000|| process.env.PORT;


//ejs
// app.set('view engine','ejs');

//public folder
// app.use(express.static("./Public"))


// app.get('/',(req,res)=> res.render('index'));


const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./images")
    },
    filename:(req,file,cb)=>{
//null is for error
        cb(null,Date.now +"--"+file.originalname)
    }
})

const fileStorageEngineForFiles=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "./Files")
    },
    filename:(req,file,cb)=>{
//null is for error
        cb(null,Date.now +"--"+file.originalname)
    }
})

//middleware
const upload=multer({storage:fileStorageEngine})
const uploadFile=multer({storage:fileStorageEngineForFiles})

//only for one file
app.post('/',upload.single('image'),(req,res)=>{
    console.log(req.file)
    res.send('image is successfuly uploaded');
})

app.post('/multiple',upload.array('images',3),(req,res)=>{
   console.log(req.files)
    res.send('images is successfuly uploaded');
})


app.post('/file',uploadFile.single('file'),(req,res)=>{
    console.log(req.file)   
    res.send('file is successfuly uploaded');
})
app.post('/files',uploadFile.array('files',2),(req,res)=>{
    console.log(req.file)   
    res.send('files is successfuly uploaded');
})


app.listen(port,()=>{
    console.log(`server is started on port ${port}`)
})