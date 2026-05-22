require('dotenv').config();
const express = require('express');
const sql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = sql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false // CRITICAL: This allows cloud database connections
    }
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






