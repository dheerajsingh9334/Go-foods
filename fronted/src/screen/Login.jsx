import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';

function Login() {
  

  const navigate = useNavigate();

        const [credentials, setCredentials] = useState({email:"vivek@gmail.com",password:"123456"})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch("http://localhost:5000/api/loginUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,
                                  password:credentials.password                                  
            })
        });
        const json = await response.json()
        const {name,password} = json;
        console.log(json)
     if(!json.success){
    alert("enter valid credential");
         }
         
         else{
          localStorage.setItem('userEmail',credentials.email)
          localStorage.setItem("authToken",json.authToken)
          navigate('/');
          
          // alert(`welcome ${name}  ${localStorage.getItem("authToken")}`);
         }
    }

    console.log("Email being stored:", credentials.email);
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <div className="container">
<form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label forName="exampleInputEmail1" className="form-label">Email address</label>
    <input typeName="email" className="form-control" idName="exampleInputEmail1" aria-describedbyName="emailHelp" name = 'email' value={credentials.email} onChange={onChange}/>
    <div idName="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label forName="exampleInputPassword1" className="form-label">Password</label>
    <input typeName="password" className="form-control" idName="exampleInputPassword1"name = 'password' value={credentials.password} onChange={onChange}/>
  </div>

  <button typeName="submit" className="btn btn-success">Login</button>
  <Link to ="/createuser" className = 'm-3 btn btn-danger'>new User</Link>
 
</form>
</div>
        </div>
    )
};
export default Login