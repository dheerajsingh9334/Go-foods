import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

export default function Myorder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/MyOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail")
        })
      });
      const response = await res.json();
      setOrderData(response);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData?.OrderData?.order_data?.length > 0 ? (
            orderData.OrderData.order_data
              .slice(0)
              .reverse()
              .map((orderGroup, groupIndex) => {
                let orderDate = "";

                return (
                  <React.Fragment key={`group-${groupIndex}`}>
                    {orderGroup.map((item, itemIndex) => {
                      if (item.order_date) {
                        orderDate = item.order_date;
                        return (
                          <div className="m-auto mt-5 w-100 text-center" key={`date-${groupIndex}-${itemIndex}`}>
                            <strong>Order Date: {orderDate}</strong>
                            <hr />
                          </div>
                        );
                      }

                      return (
                        <div
                          className="col-12 col-md-6 col-lg-3"
                          key={`item-${groupIndex}-${itemIndex}`}
                        >
                          <div
                            className="card mt-3 bg-dark text-light"
                          >
                           
                            <div className="card-body">
                              <h5 className="card-title">{item.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">Qty: {item.qty}</span>
                                <span className="m-1">Size: {item.size}</span>
                                <span className="m-1">Date: {orderDate}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{item.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                );
              })
          ) : (
            <div className="text-center mt-5">
              😥😥😥 Order something to see it here!
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
