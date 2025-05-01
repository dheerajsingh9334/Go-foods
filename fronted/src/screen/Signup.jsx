import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup(){

    const [credentials, setCredentials] = useState({name:"",email:"@gmail.com",password:"",geolocation:""})

const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({name:credentials.name,
                              email:credentials.email,
                              password:credentials.password,
                              location:credentials.geolocation
        })
    });
    const json = await response.json()
    console.log(json)
 if(!json.success){
alert("enter valid credential");
 }

}

const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

    return(
      <>
<div className="container">
<form onSubmit={handleSubmit}>
<div className="mb-3">
    <label forName="name" className="form-label">Name</label>
    <input typeName="text" className="form-control" idName="name" name = 'name' value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label forName="exampleInputEmail1" className="form-label">Email address</label>
    <input typeName="email" className="form-control" idName="exampleInputEmail1" aria-describedbyName="emailHelp" name = 'email' value={credentials.email} onChange={onChange}/>
    <div idName="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label forName="exampleInputPassword1" className="form-label">Password</label>
    <input typeName="password" className="form-control" idName="exampleInputPassword1"name = 'password' value={credentials.password} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label forName="Address" className="form-label">Address</label>
    <input typeName="text" className="form-control" idName="Address"  name = 'geolocation' value={credentials.geolocation} onChange={onChange}/>
  </div>

  <button typeName="submit" className="btn btn-success">Submit</button>
  <Link to ="/Login" className = 'm-3 btn btn-danger'>Already a uSER</Link>
</form>
</div>
      </>
    )
}

export default Signup;