import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.item;

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

  const handleClick = () => {
    // Uncomment if login protection is needed
    if (!localStorage.getItem("token")) navigate("/login");
  }

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
  }

  const finalPrice = qty * parseInt(options[size]);

  return (
    <div className='col-md-8 col-lg-12 col-sm-9  mb-4' >
  <div className="card h-100 shadow bg-dark text-white" style={{ borderRadius: '1rem' }}>
    <img
      src={props.ImgSrc}
      className="card-img-top"
      alt="Food"
      style={{
        height: "160px",
        objectFit: "cover",
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem'
      }}
    />

    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{props.foodName}</h5>

      <p className="card-text text-info small" style={{ minHeight: '60px', overflow: 'hidden' }}>
        {props.des}
      </p>

      <div className="d-flex justify-content-between mb-2">
        <select className="form-select form-select-sm bg-success text-white w-50 me-2" onChange={handleQty}>
          {Array.from(Array(6), (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <select className="form-select form-select-sm bg-success text-white w-50" ref={priceRef} onChange={handleOptions}>
          {priceOptions.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      <div className="fw-bold fs-5 mb-2">₹{finalPrice}/-</div>

      <button className="btn btn-success mt-auto" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
}
