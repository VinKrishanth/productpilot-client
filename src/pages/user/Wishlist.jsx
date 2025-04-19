import { Heart, Trash2, ChevronLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const Wishlist = () => {
  const { wishlistItems, deleteCartItem } = useAppContext();
  const handleAddToCart = (productId, name) => {
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      const alreadyInCart = cartItems.some((item) => item.id === productId);

      if (!alreadyInCart) {
        setCartItems((prev) => [...prev, productToAdd]);
        toast.success(`${name} has been added to your cart.`);
      } else {
        toast(`${name} is already in your cart.`);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">
              Add items that you like to your wishlist. Review them anytime and
              easily move them to the cart.
            </p>
            <Link to="/">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
                <ChevronLeft className="w-4 h-4" />
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-sm text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} in
                your wishlist
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="text-left p-4 font-medium">PRODUCT</th>
                    <th className="text-left p-4 font-medium">PRICE</th>
                    <th className="text-left p-4 font-medium">STOCK STATUS</th>
                    <th className="text-right p-4 font-medium"></th>
                    <th className="text-right p-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {wishlistItems.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border rounded-md overflow-hidden">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-normal text-sm">
                              {product.name}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            ${Number(product.offerPrice).toFixed(2)}
                          </span>
                          {product.offer  !== 0 && (
                            <span className="text-gray-400 line-through text-sm">
                              ${Number(product.price).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            product.outOfStock
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {product.outOfStock ? "Out of Stock" : "In Stock"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md disabled:bg-gray-300 transition"
                          disabled={product.outOfStock}
                          onClick={() =>
                            handleAddToCart(product.id, product.name)
                          }
                        >
                          <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          className="text-gray-500 hover:text-red-500 transition"
                          onClick={() => deleteCartItem(product._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
