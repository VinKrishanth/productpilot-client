import ProductCard from "./ProductCard";
import { ChevronRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function FeaturedProducts({ addToCart }) {
  const { products } = useAppContext();

  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 relative">
          Popular Products
          <span className="absolute bottom-0 left-0 w-12 h-1 bg-green-500 -mb-2"></span>
        </h2>
        <a
          href="/shop"
          className="flex items-center text-green-600 hover:underline"
        >
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products
          .filter((product) => product.type === "Popular") 
          .slice(0, 10) // 
          .map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.offerPrice || product.price}
              oldPrice={product.offer ? product.price : null}
              image={product.images[0]}
              category={product.category}
              rating={product.review}
              inStock={product.inStock}
              discount={product.offer}
              addToCart={() => handleAddToCart(product)}
            />
          ))}
      </div>
    </div>
  );
}
