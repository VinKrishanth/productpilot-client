import React, { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function QuickViewModal() {
  const { isOpen, product, closeQuickView } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !product) return null;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
    closeQuickView();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <button
          className="absolute right-4 top-4 rounded-full bg-white w-8 h-8 flex items-center justify-center z-10 hover:bg-gray-100"
          onClick={closeQuickView}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images Carousel or Primary Image */}
          <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-8">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="max-h-full max-w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-2">
            <div className="mb-4">
              {product.inStock ? (
                <span className="inline-block bg-green-100 text-eco-green text-xs px-2 py-1 rounded-md">In Stock</span>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md">Out of Stock</span>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < product.review ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-500">{product.review} Review</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-eco-green">
                ${product.offerPrice?.toFixed(2) || product.price.toFixed(2)}
              </span>
              {product.offerPrice && product.offerPrice < product.price && (
                <>
                  <span className="text-gray-400 line-through text-lg">${product.price.toFixed(2)}</span>
                  <span className="text-eco-orange text-sm font-medium">
                    {Math.round(100 - (product.offerPrice / product.price) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-600">{product.description?.[0]}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 border-r hover:bg-gray-100"
                  onClick={handleDecrease}
                  disabled={!product.inStock}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-3 py-2 border-l hover:bg-gray-100"
                  onClick={handleIncrease}
                  disabled={!product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                className="flex-1 flex items-center justify-center bg-eco-green text-white px-4 py-2 rounded-md hover:bg-eco-green-dark transition disabled:opacity-50 gap-2"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              <button
                className={`rounded-full p-2 border hover:bg-gray-100 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                onClick={toggleFavorite}
              >
                <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="border-t pt-4">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-500">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">Tags:</span>
                  <div className="flex gap-1 flex-wrap text-gray-700">
                    <span>Vegetables</span>
                    <span>Hearty</span>
                    <span>Starchy</span>
                    <span>Root</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
