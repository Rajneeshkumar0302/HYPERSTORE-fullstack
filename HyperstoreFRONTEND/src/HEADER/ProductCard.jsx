// import { useDispatch } from "react-redux";
// import { addToCart } from "../redux/cartSlice";

// const ProductCard = ({ item }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(
//       addToCart({
//         _id: item._id,
//         name: item.name,
//         price: item.price,
//         image: item.image,
//       })
//     );
//   };

//   return (
//     <div
//       className="border rounded-xl shadow-md p-4 overflow-hidden
//       transition-all duration-300
//       hover:shadow-xl hover:-translate-y-1
//       w-full max-w-full flex flex-col"
//     >
//       <div className="h-40 md:h-45 lg:h-56 flex items-center justify-center">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="max-h-full object-contain"
//         />
//       </div>

//       <h3 className="mt-2 font-semibold text-center text-xl">
//         {item.name}
//       </h3>

//       <p className="text-center">₹{item.price}</p>

//       <button
//         onClick={handleAddToCart}
//         className="
//           mt-3 self-center
//           bg-orange-500 text-white rounded-2xl
//           hover:bg-orange-600
//           text-[clamp(0.7rem,1.6vw,1rem)]
//           w-[clamp(120px,40%,180px)]
//           h-[clamp(32px,4vw,44px)]
//           transition-all duration-300
//         "
//       >
//         Add to Cart 🛒
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
