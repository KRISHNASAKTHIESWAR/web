import React,{useState} from 'react'
import { useEffect } from 'react';

export default function App() {
  //state vars
  const [patients,setPatients]=useState([]);
  const [formData, setFormData]=useState({
    name:'',issue:'',doctor:''
  });

  // fetch
  const fetchData = async()=>{
    try{
      const resp = await fetch('http://localhost:5000/show');
      const data = await resp.json();
      setPatients(data);
    }
    catch(err){
      console.err("Failed to fetch",err);
    }
  };

  useEffect(()=>{
    fetchData();
  },[]);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const resp = await fetch('http://localhost:5000/book',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data = await resp.json();
      alert(data.message);
      setFormData({name:'',issue:'',doctor:''});
      fetchData();
    }
    catch(err){
      console.error("Failed to submit form",err);
    }
  }

  return (
    <div>
      <h1>Patient List</h1>
      <ul>
        {patients.map((patient)=>(
          <li key={patient.id}>{patient.name} - {patient.issue} - {patient.doctor}</li>
        ))}
      </ul>

      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="issue" placeholder="Issue" value={formData.issue} onChange={handleChange} required />
        <input type="text" name="doctor" placeholder="Doctor" value={formData.doctor} onChange={handleChange} required />
        <button type="submit">Book</button>
      </form>
    </div>
  )
}
