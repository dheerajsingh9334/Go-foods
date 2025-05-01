import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import Signup from "../screen/Signup";
import Badge from "react-bootstrap/Badge"; 
import Modal from "../Modal";
import Cart from "../screen/Cart"
import { useCart } from "./ContextReducer";
function Navbar({search,setSearch}){
    let data = useCart();
const navigate = useNavigate();
const [Cartview,setCartView] = useState(false)
  const handleLogout = () =>{
     localStorage.removeItem("authToken");
     navigate("/")
  }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success " >
<div className="container-fluid">
  <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mt-2 mx-2 ">
      <li className="nav-item ">
        <Link className="nav-link active fs-4" to ="/">Home <span className="sr-only"></span></Link>
      </li>
      {(localStorage.getItem("authToken")) ?
      <li>
                <Link className="nav-link active fs-4" to ="/myorder"> MyOrder<span className="sr-only"></span></Link>
      </li> : ""

    }
    </ul>
    
    <form className="d-flex w-50 align-items-center mt-2 mx-2 me-auto">
  <input
    className="form-control"
    type="search"
    placeholder="Search"
    aria-label="Search"
    value={search} onChange={(e)=>{
      setSearch(e.target.value)
    }
  }
  />
</form>

{(!localStorage.getItem("authToken")) ?<div>
          <Link className="btn text-success bg-light mt-2 mx-2 " to ="/Login">LOgin</Link>
          <Link className="btn text-success bg-light mt-2 mx-2" to ="/createuser">SignUp</Link>
        </div> : 
        <div>
        <div className="btn text-success bg-light mt-2 mx-2" onClick={() => {setCartView(true)}}>
           MyCart {" "}
           <Badge pill bg = "danger">{data.length}</Badge>
           </div>
           {Cartview? <Modal onClose={() => setCartView(false)}><Cart/></Modal>:null}
        <div className="btn text-danger bg-light mt-2 mx-2" onClick={handleLogout}>
           Logout
           </div>
           </div>
}
        </div>
  </div>
</nav>

        </div>
       
    )
};
export default Navbar