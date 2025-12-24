import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrement,
  removeFromCart,
} from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10 text-xl">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className=" " style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "clamp(1rem, 3vw, 2rem)",
      }} >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-contain"
          />

          <div className="flex-1 ml-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>

          {/* QUANTITY CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(decrement(item._id))}
              className=" bg-gray-300 rounded" style={{padding:"6% 18%"}}
            >
              -
            </button>

            <span className="font-semibold">{item.quantity}</span>

            <button
              onClick={() => dispatch(addToCart(item))}
              className=" bg-gray-300 rounded" style={{padding:"6% 16%"}}>
              +
            </button>
          </div>

          <button
            onClick={() => dispatch(removeFromCart(item._id))}
            className=" text-red-600 hover:underline" style={{marginLeft:"5%"}}>
            Remove
          </button>
        </div>
      ))}

      <div className="text-right mt-6 text-xl font-bold">
        Total: ₹{totalPrice}
      </div>
    </div>
  );
};

export default Cart;
