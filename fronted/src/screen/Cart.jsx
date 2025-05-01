import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

import { useCart, useDispatchCart } from '../Component/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

const handleCheckOut = async () => {
  let userEmail = localStorage.getItem("userEmail");
console.log(localStorage.getItem("userEmail"));
  // Check if userEmail is null or undefined
  if (!userEmail) {
    console.error("User email is missing in localStorage.");
    return alert("User email is not available. Please log in again.");
  }

  const payload = {
    email: userEmail,
    order_date: new Date().toDateString(),
    order_data: data

  };
  

  console.log("Request Payload:", payload); // Debugging log

  let response = await fetch("http://localhost:5000/api/OrderData", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  console.log("Order Response:", response);
  if (response.status === 200) {
    dispatch({ type: "DROP" });
  } else {
    console.error("Failed to place order:", response.statusText);
  }
};

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={food.id}>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button
  type="button"
  className="btn p-0"
  onClick={() => dispatch({ type: "REMOVE", index })}
>
  <DeleteIcon />
</button>
 </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}