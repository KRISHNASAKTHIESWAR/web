const express = require('express');
const sql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = sql.createConnection({
    host:'localhost',
    user:'root',
    password:'Krishna@123',
    database:'temp',
});

db.connect((err)=>{
    if(err)throw err;
    console.log('MySQL connected');
});

app.get('/show',(req,res)=>{
    const q = 'SELECT * FROM patients';
    db.query(q,(err,result)=>{
        if(err)return res.status(500).json({error : err.message});
        return res.status(200).json(result);
    });
});

app.post('/book',(req,res)=>{
    const{name,issue,doctor}=req.body;
    const q = 'INSERT INTO patients(name,issue,doctor) VALUES (?,?,?)';
    db.query(q,[name,issue,doctor],(err,result)=>{
        if(err)return res.status(500).json({error:err.message});
        return res.status(200).json({message:"Added successfully"});
    });
});
app.listen(PORT,()=>{
    console.log(`Server running at port : ${PORT}`);
});






