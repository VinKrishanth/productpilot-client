import { useState } from "react";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from 'react-hot-toast'
export default function ProductCard({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  rating,
  inStock = true,
  isNew = false,
  discount
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { openQuickView, addToCart, navigate, cartItems , role} = useAppContext();

  const handleQuickView = (id) => {
    openQuickView(id);
  };


  const addToProductCart = async (id) => {
    if (role === 'user') {
      await addToCart(id);
      navigate("/shopping-cart");
    } else {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
    }
  };

  return (
    <div className="relative group bg-white rounded-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
      {discount > 0 ? (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-sm z-10">
          -{discount}%
        </div>
      ) : isNew ? (
        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-sm z-10">
          New
        </div>
      ) : null}

      {!inStock && (
        <div className="absolute top-3 right-3 bg-gray-600 text-white text-xs px-2 py-1 rounded-sm z-10">
          Out of Stock
        </div>
      )}

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain p-4"
        />

        <div className="absolute top-0 right-0 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 p-2 flex flex-col gap-2">
          {/* Wishlist Button */}
          <button
            className={`w-8 h-8 cursor-pointer rounded-full bg-white text-gray-600 hover:bg-green-600 hover:text-white shadow-md transition-colors  flex items-center justify-center`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className="h-4 w-4"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>

          {/* Quick View Button */}
          <button
            className="w-8 h-8 cursor-pointer rounded-full bg-white text-gray-600  hover:bg-green-600 hover:text-white  shadow-md transition-colors  flex items-center justify-center"
            onClick={() => handleQuickView(id)}
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1 capitalize">{category}</div>
        <h3 className="font-medium text-gray-800 mb-1 hover:text-green-600 transition-colors cursor-pointer capitalize">
          {name}
        </h3>

        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold text-gray-900">
              ${price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-gray-400 line-through ml-2 text-sm">
                ${oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => inStock && addToProductCart(id)}
              disabled={!inStock}
              className={`${
                inStock
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white p-1.5 rounded-full transition-colors cursor-pointer`}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <div
              className={`text-white absolute -top-1 right-1 w-3 h-3 rounded-full bg-primary-dull flex justify-center items-center border border-gray-400 ${
                cartItems[id] ? "" : "hidden"
              }`}
            >
              <span className="text-[8px] font-medium">{cartItems[id]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
