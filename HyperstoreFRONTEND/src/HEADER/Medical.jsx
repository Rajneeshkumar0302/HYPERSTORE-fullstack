import React, { useEffect, useState } from "react";
import API from "../API";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement } from "../redux/cartSlice";

const Medical = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchMedicalProducts = async () => {
      try {
        const res = await API.get("/products/category/medical");
        setProducts(res.data.products);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error("Error fetching medical products", err);
        }
      }
    };
    fetchMedicalProducts();
  }, []);

  // 🔹 helper: check if product exists in cart
    const getCartItem = (id) => {
      return cartItems.find((item) => item._id === id);
    };
  
    return (
      <div className="p-1">
        <h1
          className="text-[clamp(0.85rem,4vw,9rem)] font-bold text-center"
          style={{ marginBottom: "3%" }}
        >
          Women
        </h1>
  
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
          gap-[clamp(3px,3vw,24px)] w-80 sm:w-130 md:w-160 lg:w-330"
        >
          {products.map((item) => {
            const cartItem = getCartItem(item._id);
  
            return (
              <div
                key={item._id}
                className="border rounded-xl shadow-md p-4 overflow-hidden
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                w-full max-w-full flex flex-col"  style={{ paddingBottom: "10px" }}
              >
                <div className="h-40 md:h-45 lg:h-56 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-auto object-contain"
                  />
                </div>
  
                <h3 className="mt-2 font-semibold text-center text-[clamp(0.75rem,2.2vw,1.35rem)]">
                  {item.name}
                </h3>
  
                <p className="text-center">₹{item.price}</p>
  
                {/* 🔥 CART ACTIONS */}
                {!cartItem ? (
                  // ➕ ADD TO CART
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: item._id,
                          name: item.name,
                          price: item.price,
                          image: item.image,})
                      )}
  
                      className=" mt-3 self-center block
                      bg-orange-500 text-white rounded-2xl
                      hover:bg-orange-600
                      text-[clamp(0.7rem,1.6vw,1rem)]
                      w-[clamp(120px,40%,180px)]
                      h-[clamp(32px,4vw,44px)]
                      transition-all duration-300 ">
                    Add to Cart 
                  </button>
                ) : (
                  // ➖ ➕ QUANTITY CONTROLS
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => dispatch(decrement(item._id))}
                      className=" bg-gray-300 rounded text-lg" style={{padding:"2% 3%"}} >
                      −
                    </button>
  
                    <span className="font-semibold">
                      {cartItem.quantity}
                    </span>
  
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          })
                        )
                      }
                      className=" bg-gray-300 rounded text-lg" style={{padding:"2% 3%"}}  >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

export default Medical;
