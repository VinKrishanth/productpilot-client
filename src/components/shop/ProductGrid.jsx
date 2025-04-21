import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

// Categories list
const categories = [
  { name: "Fruit", value: "fruit" },
  { name: "Vegetables", value: "vegetables" },
  { name: "Bakery", value: "bakery" },
  { name: "Baking Need", value: "baking_need" },
  { name: "Meat & Fish", value: "meat_fish" },
  { name: "Cooking", value: "cooking" },
  { name: "Snacks", value: "snacks" },
  { name: "Diabetic", value: "diabetic" },
  { name: "Beverages", value: "beverages" },
  { name: "Dish Detergent", value: "dish_detergent" },
  { name: "Oil", value: "oil" },
  { name: "Beauty & Health", value: "beauty_health" },
];

export default function ProductGrid() {
  const [activeFilters, setActiveFilters] = useState(["inStock"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");

  const { products, searchQuery } = useAppContext();

  useEffect(() => {
    let filtered = products;

    if (searchQuery.length > 0) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        (product) => product.review >= parseInt(selectedRating)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedRating]);

  const totalResults = filteredProducts.length;
  const totalPages = Math.ceil(totalResults / perPage);

  const clearFilter = (filter) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    if (filter === selectedCategory) {
      setSelectedCategory("");
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setActiveFilters((prev) => {
      const withoutCategory = prev.filter(
        (f) => !categories.some((c) => c.value === f)
      );
      return value ? [...withoutCategory, value] : withoutCategory;
    });
    setCurrentPage(1);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product.name);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 overflow-y-hidden">
        <div className="flex gap-3 whitespace-nowrap md:flex-wrap sm:overflow-hidden overflow-x-scroll">
          {/* Category Filter */}
          <select
            className="border border-gray-300 px-3 py-2 rounded min-w-[160px] bg-white text-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Price Sort */}
          <select className="border border-gray-300 px-3 py-2 rounded min-w-[160px] bg-white text-sm">
            <option value="price">Select Price</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

          {/* Rating Filter */}
          <select
            className="border border-gray-300 px-3 py-2 rounded min-w-[160px] bg-white text-sm"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">Select Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-gray-500">Sort by: Latest</span>

          <select
            className="border border-gray-300 px-2 py-2 rounded w-[100px] bg-white"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value="15">Show 15</option>
            <option value="30">Show 30</option>
            <option value="45">Show 45</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <div className="text-sm text-gray-500">Active Filters:</div>
        {activeFilters.map((filter) => (
          <div
            key={filter}
            className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
          >
            <span>{filter}</span>
            <button
              onClick={() => clearFilter(filter)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6 text-gray-500 text-sm">
        <span>{totalResults} Results found</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {paginatedProducts.map((product) => (
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

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          className="w-8 h-8 p-0 border rounded hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {[...Array(Math.min(5, totalPages))].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={idx}
              className={`w-8 h-8 p-0 border rounded text-sm flex items-center justify-center ${
                pageNum === currentPage
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > 5 && (
          <>
            <span className="mx-1">...</span>
            <button
              className="w-8 h-8 p-0 border rounded hover:bg-gray-100 text-sm flex items-center justify-center"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="w-8 h-8 p-0 border rounded hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
